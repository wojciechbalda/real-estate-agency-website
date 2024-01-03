import BlogPostCard from "@/app/components/BlogPostCard"
import Main from "@/app/components/Main"
import PageTitle from "@/app/components/PageTitle"
import Section from "@/app/components/Section"
import SectionTitle from "@/app/components/SectionTitle"
import { getBlogPost } from "@/app/lib/fetch"
import { Image } from "@nextui-org/react"
import { notFound } from "next/navigation"
import NextImage from 'next/image'

const Page = async ({params}: {params: {slug: string}}) => {
    const blogPost = await getBlogPost(params.slug)
    if (blogPost.blogPosts.length !== 1)
        notFound()

    const {content: {html}, coverImage: {url, alt}, relatedBlogPosts, title} = blogPost.blogPosts[0]
    return <Main>
        <PageTitle>{title}</PageTitle>
        <Image as={NextImage} src={url} alt={alt || ""} width={1000} height={900} removeWrapper className="w-full h-full object-cover" />
        <div className="grid gap-3" dangerouslySetInnerHTML={{__html: html}}></div>
        <Section>
            <SectionTitle>Related posts</SectionTitle>
            <div className="grid md:grid-cols-3 gap-3">
                {relatedBlogPosts.map(post => <BlogPostCard coverImageSrc={post.coverImage.url} excerpt={post.excerpt} title={post.title} slug={post.slug} key={post.title} imageAltText={post.coverImage.url} />)}
            </div>
        </Section>
    </Main>
}

export default Page