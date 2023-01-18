import type { GetProps2 } from '../App'

type ResponseProps = {
	results: GetProps2[]
}

const ResponseComponent = ({ results }: ResponseProps) => {
	return (
		<>
			{results.map((profile, idx) => {
				return (
					<div
						key={`prof-${profile.username}-${idx}`}
						className='response-section__card'
					>
						<table>
							<tbody>
								<tr>
									<td>id:</td>
									<td>{profile.id}</td>
								</tr>
								<tr>
									<td>name:</td>
									<td>{profile.name}</td>
								</tr>
								<tr>
									<td>username:</td>
									<td>{profile.username}</td>
								</tr>
								<tr>
									<td>email:</td>
									<td>{profile.email}</td>
								</tr>
								<tr>
									<td>address:</td>
									<td>{profile.address}</td>
								</tr>
								<tr>
									<td>phone:</td>
									<td>{profile.phone}</td>
								</tr>
								<tr>
									<td>website:</td>
									<td>{profile.website}</td>
								</tr>
								<tr>
									<td>company:</td>
									<td>{profile.company}</td>
								</tr>
							</tbody>
						</table>
						<p>Posts:</p>
						<div className='response-section__card__posts'>
							{profile.posts.map((post, idx) => {
								return (
									<div
										key={`post-${post.title}-${idx}`}
										className='response-section__card__posts--post'
									>
										<p>
											<span className='font-bold'>id: </span>
											{post.id}
										</p>
										<p>
											<span className='font-bold'>title: </span>
											{post.title}
										</p>
										<p>
											<span className='font-bold'>body: </span>
											{post.body}
										</p>
									</div>
								)
							})}
						</div>
					</div>
				)
			})}
		</>
	)
}

export default ResponseComponent
