import {render, screen} from "@testing-library/react";
import Post, {getServerSideProps} from "../../pages/posts/[slug]";
import {mocked} from "ts-jest/utils";
import {getPrismicClient} from "../../services/prismic";
import {getSession} from "next-auth/client";

const post = {
  slug: "my-new-post",
  title: "My new post",
  content: "<p>Post excerpt</p>",
  updatedAt: "November, 04",
}

jest.mock("next-auth/client")
jest.mock("../../services/prismic")

describe("Post page", () => {
  it('should renders correctly', () => {
    render(<Post post={post}/>)

    expect(screen.getByText("My new post")).toBeInTheDocument()
    expect(screen.getByText("Post excerpt")).toBeInTheDocument()
  })

  it('should redirects user if no subscription is found', async () => {
    const getSessionMocked = mocked(getSession)
    getSessionMocked.mockResolvedValueOnce(null)

    const response = await getServerSideProps({params: {slug: "my-new-post"}} as any)

    expect(response).toEqual(expect.objectContaining({
      redirect: expect.objectContaining({
        destination: `/posts/preview/my-new-post`,
        permanent: false
      })
    }))
  })

  it('should loads initial data', async () => {
    const getSessionMocked = mocked(getSession)
    const getPrismicClientMocked = mocked(getPrismicClient)

    getPrismicClientMocked.mockReturnValueOnce({
      getByUID: jest.fn().mockResolvedValueOnce({
        data: {
          title: [
            {type: "heading", text: "My new post"}
          ],
          content: [
            {type: "paragraph", text: "Post excerpt"}
          ],
        },
        last_publication_date: "11-04-2021"
      })
    } as any)

    getSessionMocked.mockResolvedValueOnce({
      activeSubscription: "fake-active-subscription"
    })

    const response = await getServerSideProps({params: {slug: "my-new-post"}} as any)

    expect(response).toEqual(expect.objectContaining({
      props: {
        post: {
          title: "My new post",
          content: "<p>Post excerpt</p>",
          slug: "my-new-post",
          updatedAt: "04 de novembro de 2021"
        }
      }
    }))
  })
})
