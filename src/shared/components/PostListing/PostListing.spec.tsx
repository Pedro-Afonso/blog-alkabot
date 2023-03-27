import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { setupServer } from 'msw/node'
import { rest } from 'msw'

import { arrayPostData } from '@/__test__'

import { PostListing } from './PostListing'

jest.mock('@/shared/components', () => {
  const PostCard = () => <div data-testid="post-card"></div>

  return { PostCard }
})

const handlers = [
  rest.get('https://jsonplaceholder.typicode.com/posts', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(arrayPostData))
  })
]

const server = setupServer(...handlers)

beforeAll(() => server.listen())

afterEach(() => server.resetHandlers())

afterAll(() => server.close())

describe('PostListing', () => {
  it('should render 4 posts', () => {
    render(<PostListing posts={arrayPostData} limit={4} />)

    const postsLength = arrayPostData.length

    const posts = screen.getAllByTestId('post-card')

    expect(posts).toHaveLength(postsLength)
  })

  it('should load more posts', async () => {
    render(<PostListing posts={[]} limit={4} />)
    const button = screen.getByRole('button')

    await userEvent.click(button)

    expect(await screen.findAllByTestId('post-card')).toHaveLength(4)
  })
})
