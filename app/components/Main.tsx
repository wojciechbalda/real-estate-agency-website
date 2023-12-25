type MainProps = {
    children: React.ReactNode
}

const Main = ({children}: MainProps) => {
    return <main className="max-w-6xl mx-auto px-3 grid gap-4">
        {children}
    </main>
}

export default Main