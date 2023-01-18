import { useRef, useState } from 'react'
import { LetterClass } from './Classes/LetterClass'
import type { PostsProps, UsersProps } from './Classes/LetterClass'

import './style.scss'
import ResponseComponent from './components/ResponseComponent'

interface GetProps extends Omit<UsersProps, 'address'> {
	address: string
	posts: PostsProps[]
}

export interface GetProps2 extends Omit<GetProps, 'company'> {
	company: string
}

function App() {
	const inputRef = useRef<HTMLInputElement | null>(null)
	const [results, setResults] = useState<GetProps2[]>([])
	const [error, setError] = useState('')

	const handleSearchPosts = async () => {
		const inputValue = inputRef.current?.value.trim()

		if (!inputValue) {
			setResults([])
			setError('')

			return
		}

		const Letter = new LetterClass(inputValue)

		const getResults: GetProps2[] = await Letter.get()

		setResults(getResults)
		setError(Letter.errorMessage)
	}

	return (
		<section className='main-section'>
			<div className='input-section'>
				<div className='input-section__search'>
					<input ref={inputRef} type='text' />
				</div>
				<div className='input-section__button'>
					<button onClick={handleSearchPosts}>Search</button>
				</div>
			</div>
			<div className='response-section'>
				{results[0] ? (
					<ResponseComponent results={results} />
				) : (
					<p className='font-bold text-red'>{error}</p>
				)}
			</div>
		</section>
	)
}

export default App
