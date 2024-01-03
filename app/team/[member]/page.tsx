import Main from "@/app/components/Main";
import PageTitle from "@/app/components/PageTitle";
import Section from "@/app/components/Section";
import SectionTitle from "@/app/components/SectionTitle";
import { getRealEstateAgent } from "@/app/lib/fetch";
import { Divider, Image } from "@nextui-org/react";
import { notFound } from "next/navigation";
import NextImage from "next/image";
import AdvertisementCard from "@/app/components/AdvertisementCard";

const Page = async ({ params }: { params: { member: string } }) => {
  const agentData = await getRealEstateAgent(params.member);

  if (!agentData.agent) notFound();

  const {
    agent: {
      agentImage: { url },
      description: { html },
      email,
      firstName,
      lastName,
      phoneNumber,
      realEstate,
    },
  } = agentData;

  return (
    <Main>
      <PageTitle>
        {firstName} {lastName}
      </PageTitle>
      <div className="grid text-center md:text-left md:grid-cols-[400px_1fr] gap-3">
        <div className="md:col-span-1">
          <Image
            as={NextImage}
            width={500}
            height={500}
            removeWrapper
            className="w-full h-full object-cover"
            src={url}
            alt={`${firstName} ${lastName}`}
          />
        </div>
        <div className="md:col-start-1 md:col-end-1 md:row-start-2 md:row-end-3 flex flex-col gap-3">
          <p className="uppercase">Real estate agent</p>
          <Divider />
          <p>Phone number: {phoneNumber}</p>
          <Divider />
          <p>E-mail: {email}</p>
        </div>
        <div
          dangerouslySetInnerHTML={{ __html: html }}
          className="md:col-start-2 md:row-start-1 md:row-span-2 flex flex-col gap-3"
        ></div>
      </div>
      <Section>
        <SectionTitle>Related offers</SectionTitle>
        {realEstate.length === 0 && <p className="text-center">No offers</p>}
        {realEstate.length !== 0 && <div className="grid md:grid-cols-3 gap-3">
          {realEstate.map((element) => (
            <AdvertisementCard
              altText={element.realEstateImage.url}
              districtName={element.districtName}
              image={element.realEstateImage.url}
              price={element.price}
              slug={element.slug}
              squareFootage={element.squareFootage}
              key={element.slug}
            />
          ))}
        </div>}
      </Section>
    </Main>
  );
};

export default Page;
