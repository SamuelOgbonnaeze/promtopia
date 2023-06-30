import Feed from "@/components/Feed"

const Home = () => {
    return (
        <section className="w-full flex-center flex-col">
            <h1 className="head_text text-center p-2">
                Discover & Share {' '}
                <br className="max-md:hidden" />
                <span className="orange_gradient text-center p-2">AI-Powered Prompts </span>
            </h1>
            <p className="desc text-center">
                Promptopia is an open-source AI prompting tool for modern world to discover,create, and share comparative prompts 
            </p>

            <Feed />
        </section>
    )
}

export default Home