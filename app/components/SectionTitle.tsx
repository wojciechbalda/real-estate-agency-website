type SectionTitleProps = {
    children: React.ReactNode
}

const SectionTitle = ({children}: SectionTitleProps) => {
    return <h2 className="text-2xl font-bold text-center">{children}</h2>
}

export default SectionTitle