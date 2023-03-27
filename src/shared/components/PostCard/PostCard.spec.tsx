import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { singlePostData } from '@/__test__'

import { PostCard } from './PostCard'

jest.mock('@/shared/components', () => {
  const Comments = () => <div data-testid="comments">Comments</div>

  return { Comments }
})

describe('PostCard', () => {
  it('should render PostCard', () => {
    render(<PostCard post={singlePostData} />)

    const title = screen.getByRole('heading', {
      level: 2
    })
    const avatar = screen.getByRole('img')

    expect(title).toHaveTextContent(singlePostData.title)
    expect(avatar).toBeInTheDocument()
  })

  it('should open comments section', async () => {
    render(<PostCard post={singlePostData} />)

    expect(screen.queryByTestId('comments')).not.toBeInTheDocument()

    const button = screen.getByRole('button')
    await userEvent.click(button)

    expect(screen.getByTestId('comments')).toBeInTheDocument()
  })
})
