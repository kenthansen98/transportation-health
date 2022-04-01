import { GetServerSideProps } from "next";
import Layout from "../components/Layout";
import prisma from "../lib/prisma";

const City = () => {
    return (
        <Layout>

        </Layout>
    );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { city } = context.query;

    const cityData = await prisma.city.findMany({
        where: { city_name: city }
    })
};

export default City;