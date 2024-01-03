import AdvertisementCard from "@/app/components/AdvertisementCard"
import AgentCard from "@/app/components/AgentCard"
import Main from "@/app/components/Main"
import PageTitle from '@/app/components/PageTitle'
import Section from "@/app/components/Section"
import SectionTitle from "@/app/components/SectionTitle"
import { BrandCashApp, CalendarStats, Certificate, Door, Location, RulerMeasure } from "@/app/components/svg"
import { getRealEstate } from "@/app/lib/fetch"
import { Card, CardBody, Image } from "@nextui-org/react"
import NextImage from 'next/image'
import { notFound } from "next/navigation"

const Page = async ({params}: {params: {slug: string}}) => {
    const {realEstate} = await getRealEstate(params.slug);
    if (!realEstate)
        notFound()

    const {description: {html}, districtName, numberOfRooms, price, squareFootage, transaction, yearOfConstruction, realEstateImage} = realEstate
    const {agentImage, email, firstName, lastName, phoneNumber, slug} = realEstate.agent!
    return <Main>
        <PageTitle>Real estate | Warsaw, {districtName}</PageTitle>
        <Image as={NextImage} src={realEstateImage.url} alt={realEstateImage.alt || ''} width={1050} height={600} removeWrapper className="w-full h-full object-cover" />
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3 py-4">
            <Card>
                <CardBody className="flex gap-2 flex-row items-center"><BrandCashApp /><p>Price: {price}PLN</p></CardBody>
            </Card>
            <Card>
                <CardBody className="flex gap-2 flex-row items-center"><Location /><p>Location: {districtName}</p></CardBody>
            </Card>
            <Card>
                <CardBody className="flex gap-2 flex-row items-center"><Door /><p>Number of rooms: {numberOfRooms}</p></CardBody>
            </Card>
            <Card>
                <CardBody className="flex gap-2 flex-row items-center"><RulerMeasure /><p>Square footage: {squareFootage}</p></CardBody>
            </Card>
            <Card>
                <CardBody className="flex gap-2 flex-row items-center"><CalendarStats /><p>Year of construction: {yearOfConstruction}</p></CardBody>
            </Card>
            <Card>
                <CardBody className="flex gap-2 flex-row items-center"><Certificate /><p>Transaction: {transaction}</p></CardBody>
            </Card>
        </div>
        <div className="grid md:grid-cols-3 gap-3 pb-4">
            <div dangerouslySetInnerHTML={{__html: html}} className="grid gap-2 md:col-span-2"></div>
            <div>
                <div className="md:sticky md:top-16">
                    <AgentCard email={email} firstName={firstName} lastName={lastName} image={agentImage.url} phoneNumber={phoneNumber} slug={slug} />
                </div>
            </div>
        </div>
    </Main>
}

export default Page