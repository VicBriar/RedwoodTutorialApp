import type { ArticlesQuery } from 'types/graphql'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import {Link, routes } from '@redwoodjs/router'

export const QUERY = gql`
  query ArticlesQuery {
    articles: posts {
      id
      title
      body
      createdAt
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({ articles }: CellSuccessProps<ArticlesQuery>) => {
  return (
    <ul>
      {articles.map((article) => {
        return(
        <article key={article.id}>
          <header>
            <h2>
              {/* this id is the parameter requested in src/Routes.tsx*/}
              <Link to={routes.article({ id: article.id})}>{article.title}</Link>
            </h2>
          </header>
            <p>{article.body}</p>
            <div>Posted at: {article.createdAt}</div>
        </article>);
      })}
    </ul>
  )
}
