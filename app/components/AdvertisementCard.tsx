import { Button, Card, CardBody, CardHeader, Link , Image} from "@nextui-org/react"
import NextImage from 'next/image'

type AdvertismentCardProps = {
        image: string,
        altText: string,
        price: number,
        districtName: string, 
        squareFootage: number,
        slug: string
}

const AdvertisementCard = ({image, altText, price, districtName, squareFootage, slug}: AdvertismentCardProps) => {
    return <Card className="flex flex-col-reverse">
            <CardHeader className="flex flex-col gap-1 text-center">
                <p>Location: Warsaw, {districtName}</p>
                <p>Price: {price} PLN</p>
                <p>Square footage: {squareFootage} m<sup>2</sup></p>
                <Button size="md" variant="shadow" href={`/offers/${slug}`} as={Link} showAnchorIcon color="primary">See details</Button>
            </CardHeader>
            <CardBody className="h-60">
                <Image as={NextImage} removeWrapper src={image} alt={altText} width={500} height={500} className="w-full h-full object-cover" />
            </CardBody>
        </Card>
}

export default AdvertisementCard