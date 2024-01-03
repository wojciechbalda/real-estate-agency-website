import { Card, CardBody, CardHeader, Image } from "@nextui-org/react"
import { Mail, Phone } from "./svg"
import NextImage from 'next/image'
import Link from "next/link"

type AgentCardProps = {
    firstName: string,
    lastName: string,
    phoneNumber: string,
    email: string,
    image: string,
    slug: string,
}

const AgentCard = ({firstName, lastName, phoneNumber, email, image, slug}: AgentCardProps) => {
    return <Link href={`/team/${slug}`}>
        <Card className="flex flex-col justify-between">
            <CardHeader className="grid grid-cols-1 gap-2">
                <h2 className="font-bold text-lg">{firstName} {lastName}</h2>
                <p className="uppercase">Real estate agent</p>
                <div className="flex items-center gap-2"><Phone /><p>{phoneNumber}</p></div>
                <div className="flex items-center gap-2"><Mail /><p>{email}</p></div>
            </CardHeader>
            <CardBody className="w-full h-80 flex-grow-0">
                <Image as={NextImage} removeWrapper className="w-full h-full object-cover" alt={`${firstName} ${lastName}`} src={image} width={450} height={450} />
            </CardBody>
        </Card>
    </Link>
}

export default AgentCard