type MainProps = {
    children: React.ReactNode
}

const PageTitle = ({children}: MainProps) => {
    return <h1 className="text-3xl text-center font-bold">
        {children}
    </h1>
}

export default PageTitle