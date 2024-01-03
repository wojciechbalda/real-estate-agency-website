import { Button, Image, Link } from "@nextui-org/react";
import Main from "./components/Main";
import AdvantageCard from "./components/AdvantageCard";
import {
  HomeDolarIcon,
  ReceiptTaxIcon,
  ShieldPlusIcon,
} from "./components/svg";
import SectionTitle from "./components/SectionTitle";
import AdvertisementCard from "./components/AdvertisementCard";
import BlogPostCard from "./components/BlogPostCard";
import FaqContent from "./components/FaqContent";
import Section from "./components/Section";
import { getHomepageData } from "./lib/fetch";
import NextImage from "next/image"

const advantages = [
  {
    icon: HomeDolarIcon,
    heading: "Lowest commission",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit nulla omnis sapiente est quia eum distinctio, ipsa et libero perspiciatis quisquam deleniti nam tenetur odio culpa quos architecto quasi quibusdam.",
  },
  {
    icon: ReceiptTaxIcon,
    heading: "Tax Advancement",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit nulla omnis sapiente est quia eum distinctio, ipsa et libero perspiciatis quisquam deleniti nam tenetur odio culpa quos architecto quasi quibusdam.",
  },
  {
    icon: ShieldPlusIcon,
    heading: "Most trusted company",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit nulla omnis sapiente est quia eum distinctio, ipsa et libero perspiciatis quisquam deleniti nam tenetur odio culpa quos architecto quasi quibusdam.",
  },
];

export default async function Home() {
  const data = await getHomepageData();

  return (
    <Main>
      <section className="min-h-[80vh] relative md:grid grid-cols-2 gap-7">
        <div className="flex flex-col justify-center gap-4 z-30 relative h-full text-center md:text-left">
          <h1 className="font-bold text-4xl">Real estate agency in Warsaw</h1>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quasi,
            quia amet? Eaque odit exercitationem iure aspernatur reprehenderit!
            Fuga voluptatum ut asperiores distinctio quidem eligendi omnis
            ratione cumque. Itaque, cumque hic!
          </p>
          <div>
            <Button
              as={Link}
              href="/offers"
              size="lg"
              color="primary"
              variant="shadow"
            >
              See our offers
            </Button>
          </div>
        </div>
        <div className="absolute md:static top-0 left-0 w-full h-full after:block after:absolute after:bg-black/70 after:left-0 after:w-full after:top-0 after:h-full after:z-10 md:after:bg-transparent">
          <Image
            as={NextImage}
            src="/landingpage.jpg"
            alt=""
            height={500}
            width={500}
            removeWrapper
            className="w-full h-full object-cover"
          />
        </div>
      </section>
      <Section>
        <SectionTitle>Why choose us</SectionTitle>
        <div className="grid md:grid-cols-2 gap-3">
          <div className="relative">
            <Image
              as={NextImage}
              alt=""
              className="object-cover absolute rounded-xl w-full h-full"
              src="/landingPage2.jpg"
              width={500}
              height={500}
              removeWrapper={true}
            />
          </div>
          <div className="grid gap-4">
            {advantages.map((advantage) => (
              <AdvantageCard
                heading={advantage.heading}
                key={advantage.text}
                Icon={advantage.icon}
                text={advantage.text}
              />
            ))}
          </div>
        </div>
      </Section>
      <Section>
        <SectionTitle>Our offers</SectionTitle>
        <div className="grid md:grid-cols-3 gap-3">
          {data.realEstates.map((realEstate) => (
            <AdvertisementCard
              key={realEstate.slug}
              altText={realEstate.realEstateImage.alt as string}
              districtName={realEstate.districtName}
              image={realEstate.realEstateImage.url}
              price={realEstate.price}
              squareFootage={realEstate.squareFootage}
              slug={realEstate.slug}
            />
          ))}
        </div>
      </Section>
      <Section>
        <SectionTitle>Blog</SectionTitle>
        <div className="grid md:grid-cols-3 gap-3">
          {data.blogPosts.map((post) => (
            <BlogPostCard
              title={post.title}
              key={post.title}
              coverImageSrc={post.coverImage.url}
              slug={post.slug}
              excerpt={post.excerpt}
              imageAltText={post.coverImage.alt!}
            />
          ))}
        </div>
      </Section>
      <Section>
        <SectionTitle>FAQ</SectionTitle>
        <FaqContent />
      </Section>
    </Main>
  );
}
