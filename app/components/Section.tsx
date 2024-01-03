type SectionProps = {
  children: React.ReactNode;
};

const Section = ({ children }: SectionProps) => {
  return <section className="grid gap-4 py-4">{children}</section>;
};

export default Section;
