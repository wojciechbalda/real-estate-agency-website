import { Card, CardBody, CardHeader, Image } from "@nextui-org/react";
import NextImage from 'next/image'
import Link from "next/link";

type BlogPostCardProps = {
  coverImageSrc: string;
  imageAltText?: string;
  title: string;
  excerpt: string;
  slug: string;
};

const BlogPostCard = ({
  coverImageSrc,
  imageAltText,
  title,
  excerpt,
  slug
}: BlogPostCardProps) => {
  return (
    <Link href={`/blog/${slug}`}>
      <Card className="flex flex-col-reverse h-full justify-end">
        <CardHeader className="text-center flex-col gap-1">
          <h3 className="font-bold text-lg">{title}</h3>
          <p className="line-clamp-4">{excerpt}</p>
        </CardHeader>
        <CardBody className="flex-grow-0 h-60">
          <Image as={NextImage} src={coverImageSrc} alt={imageAltText} width={400} height={400} removeWrapper className="w-full h-full object-cover"  />
        </CardBody>
      </Card>
    </Link>
  );
};

export default BlogPostCard;
