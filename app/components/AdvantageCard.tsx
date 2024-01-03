import { Card, CardBody, CardHeader } from "@nextui-org/react";

type AdvantageCardProps = {
    Icon: any,
    text: string,
    heading: string
}

const AdvantageCard = ({Icon, text, heading}: AdvantageCardProps) => {
  return (
    <Card className="py-4 flex">
      <CardHeader className="pb-0 pt-2 gap-3 flex">
        <Icon className="text-2xl block" />
        <h3>{heading}</h3>
      </CardHeader>
      <CardBody className="overflow-visible py-2">
        {text}
      </CardBody>
    </Card>
  );
};

export default AdvantageCard;
