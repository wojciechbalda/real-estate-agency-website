import { Button } from "@nextui-org/react";
import { Providers } from "./components/Providers";
import Main from "./components/Main";
import PageTitle from "./components/PageTitle";

export default function Home() {

  return (
    <Main>
      <section className="text-center flex flex-col justify-center gap-4 min-h-[80vh]">
        <PageTitle>Real estate agency in Warsaw</PageTitle>
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quasi, quia
          amet? Eaque odit exercitationem iure aspernatur reprehenderit! Fuga
          voluptatum ut asperiores distinctio quidem eligendi omnis ratione
          cumque. Itaque, cumque hic!
        </p>
        <div>
          <Button size="lg" color="primary" variant="shadow">
            See our offers
          </Button>
        </div>
      </section>
    </Main>
  )
}
