import { GetStaticProps } from "next";
import Layout from "../components/Layout";
import Search from "../components/Search";
import prisma from "../lib/prisma";

interface Props {
    cityNames: {
        city: string;
        state: string;
    }[];
}

const Home: React.FC<Props> = ({ cityNames }) => {
    return (
        <Layout>
            <Search cityNames={cityNames} />
        </Layout>
    );
};

export const getStaticProps: GetStaticProps = async () => {
    const cityNames = await prisma.city.findMany({
        select: {
            city: true,
            state: true,
        },
    });
    const cityExists = new Set();
    const uniqueCities = cityNames.filter((city) => {
        const multiple = !cityExists.has(city.city);
        cityExists.add(city.city);
        return multiple;
    })

    return {
        props: { cityNames: uniqueCities },
    };
};

export default Home;
