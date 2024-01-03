import Main from "@/app/components/Main"
import PageTitle from "../components/PageTitle"
import BlogPostCard from "../components/BlogPostCard"
import { getBlogPostCount, getBlogPosts } from "../lib/fetch"
import Pagination from "../components/Pagination"

const Page = async ({searchParams}: {searchParams: {page: string | undefined}}) => {
    const {blogPostsConnection: {aggregate: {count}}} = await getBlogPostCount()
    const pages = Math.ceil(count / 12) || 1
    const currentPage = Number(searchParams.page) || 1
    const blogPosts = await getBlogPosts(currentPage)
    return <Main>
            <PageTitle>Blog</PageTitle>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 py-4">
                {blogPosts.blogPosts.map(post => <BlogPostCard key={post.title} title={post.title} coverImageSrc={post.coverImage.url} excerpt={post.slug} slug={post.slug} imageAltText={post.coverImage.alt!} />)}
            </div>
            <Pagination pages={pages} currentPage={currentPage} />
    </Main>
}

export default Page