type MainProps = {
    children: React.ReactNode
}

const Main = ({children}: MainProps) => {
    return <main className="max-w-7xl mx-auto px-6 grid gap-4">
        {children}
    </main>
}

export default Main