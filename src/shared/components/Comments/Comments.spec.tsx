import { render, screen } from '@testing-library/react'
import { setupServer } from 'msw/node'
import { rest } from 'msw'

import { multiplesCommentsData } from '@/__test__'

import { Comments } from './Comments'

const handlers = [
  rest.get(
    'https://jsonplaceholder.typicode.com/posts/1/comments',
    (req, res, ctx) => {
      return res(ctx.status(200), ctx.json(multiplesCommentsData))
    }
  )
]

const server = setupServer(...handlers)

beforeAll(() => server.listen())

afterEach(() => server.resetHandlers())

afterAll(() => server.close())

describe('Comments', () => {
  it('should render 5 comments', async () => {
    render(<Comments postId={1} />)

    const name = await screen.findAllByRole('heading', {
      level: 2
    })
    const email = await screen.findAllByRole('heading', {
      level: 2
    })
    const avatar = await screen.findAllByRole('img')

    expect(name).toHaveLength(5)
    expect(email).toHaveLength(5)
    expect(avatar).toHaveLength(5)
  })
})
