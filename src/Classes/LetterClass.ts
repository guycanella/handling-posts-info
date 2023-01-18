import axios from 'axios'

export type UsersProps = {
	id: number
	name: string
	username: string
	email: string
	phone: string
	website: string
	address: {
		city: string
		street: string
		suite: string
		zipcode: string
		geo: {
			lat: string
			lng: string
		}
	}
	company: {
		name: string
		bs: string
		catchPhrase: string
	}
}

export type PostsProps = {
	id: number
	userId: number
	title: string
	body: string
}

export class LetterClass {
	private usersData: UsersProps[] = []
	private postsData: PostsProps[] = []
	public errorMessage = ''
	public searchTerm = ''

	constructor(searchTerm: string) {
		this.searchTerm = searchTerm.trim()
	}

	public async get() {
		await this.fetchData('users')

		if (!this.usersData.length) {
			this.errorMessage = 'Bad error: fetching is not possible.'

			return []
		}

		const usersResult = this.usersData.filter(profile => 
			profile.name.toLowerCase().includes(this.searchTerm.toLowerCase())
			|| profile.username.toLowerCase().includes(this.searchTerm.toLowerCase())
			|| profile.email.toLowerCase().includes(this.searchTerm.toLowerCase())
		)

		if (!usersResult.length) {
			this.errorMessage = 'No profile was found.'

			return []
		}

		await this.fetchData('posts')

		return usersResult.map(user => {
			return {
				...user,
				address: `${user.address.street}, ${user.address.suite} - ${user.address.zipcode} ${user.address.city}`,
				company: `${user.company.name}`,
				posts: this.postsData.filter(post => post.userId === user.id)
			}
		})
	}

	private async fetchData(info: 'users' | 'posts') {
		const url = `https://jsonplaceholder.typicode.com/${info}`

		try {
			const { data }: { data: UsersProps[] | PostsProps[] } = await axios.get(
				url
			)

			if (info === 'users') {
				this.usersData = data as UsersProps[]

				return
			}

			this.postsData = data as PostsProps[]
		} catch (error: any) {
			this.errorMessage = error.message
		}
	}
}