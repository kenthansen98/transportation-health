import { City } from "@prisma/client";
import { GetServerSideProps } from "next";
import Layout from "../components/Layout";
import prisma from "../lib/prisma";

interface Props {
    cityData: City[];
}

const City: React.FC<Props> = ({ cityData }) => {
    return (
        <Layout>
            <h1>{cityData[0].city_name}</h1>
            {cityData.map((metric, i) => (
                <div key={i}>
                    {metric.metric_name}: {metric.est}
                </div>
            ))}
        </Layout>
    );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { city } = context.query;

    const cityData = await prisma.city.findMany({
        where: { city_name: city as string },
    });

    return {
        props: { cityData },
    };
};

export default City;
