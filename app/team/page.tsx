import Main from "@/app/components/Main";
import PageTitle from "../components/PageTitle";
import AgentCard from "../components/AgentCard";
import { getRealEstateAgents } from "../lib/fetch";

const Page = async () => {
  const agents = await getRealEstateAgents();
  return (
    <Main>
      <PageTitle>Team</PageTitle>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 py-4">
          {agents.agents.map((agent) => (
            <AgentCard
              key={agent.slug}
              email={agent.email}
              firstName={agent.firstName}
              image={agent.agentImage.url}
              lastName={agent.lastName}
              phoneNumber={agent.phoneNumber}
              slug={agent.slug}
            />
          ))}
      </div>
    </Main>
  );
};

export default Page;
