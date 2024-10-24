import Link from 'next/link'

import { FaStar } from 'react-icons/fa'
import { username } from '../constants'

export default async function ReposPage() {
  // 1. SSG : Static site generation(정적페이지)
  //const response = await fetch(`https://api.github.com/users/${username}/repos`)

  // 2. SSR : Server-side rendering(동적페이지 생성)
  //const response = await fetch(`https://api.github.com/users/${username}/repos`, {cache: 'no-store'})

  // 3. ISR : Incremental static generation(일정 시간 간격으로 페이지 갱신)
  const response = await fetch(
    `https://api.github.com/users/${username}/repos`,
    { next: { revalidate: 60 } }
  )

  await new Promise((resolve) => setTimeout(resolve, 1000))
  const repos = await response.json()

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">
        {' '}
        Github repositories of {username}{' '}
      </h2>
      <ul>
        {
          /* eslint-disable @typescript-eslint/no-explicit-any*/
          repos.map((repo: any) => (
            <li key={repo.id} className="bg-gray-500 m-4 p-4 rounded-md">
              <Link href={`/repos/$(repo.name)`}>
                <h3 className="text-xl font-bold"> {repo.name} </h3>
                <p> {repo.description} </p>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1">
                    <FaStar /> {repo.stargazers_count}
                  </span>
                  <span className="flex items-center gap-1">
                    <FaStar /> {repo.forks_count}
                  </span>
                  <span className="flex items-center gap-1">
                    <FaStar /> {repo.watchers_count}
                  </span>
                </div>
              </Link>
            </li>
          ))
        }
      </ul>
    </div>
  )
}
