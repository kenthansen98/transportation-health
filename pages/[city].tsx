import { City } from "@prisma/client";
import { GetStaticPaths, GetStaticProps } from "next";
import CityHeader from "../components/CityHeader";
import HealthMetrics from "../components/HealthMetrics";
import Layout from "../components/Layout";
import TransportationMetrics from "../components/TransportationMetrics";
import prisma from "../lib/prisma";

interface Props {
    cityData: City[];
    cardio: City[];
}

const City: React.FC<Props> = ({ cityData, cardio }) => {
    return (
        <Layout>
            <CityHeader
                city={cityData[0].city}
                state={cityData[0].state}
                population={cityData[0].population}
            />
            <HealthMetrics cityData={cityData} cardio={cardio} />
            <TransportationMetrics
                city={cityData[0].city}
                walkScore={cityData[0].walk_score}
                transitScore={cityData[0].transit_score}
                bikeScore={cityData[0].bike_score}
            />
        </Layout>
    );
};

export const getStaticPaths: GetStaticPaths = async () => {
    const cityNames = await prisma.city.findMany({
        select: {
            city: true,
            state: true,
        },
    });

    const paths = cityNames.map((name) => ({
        params: { city: name.city + ", " + name.state },
    }));

    return {
        paths,
        fallback: false,
    };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const { city } = params;

    const rawCityData = await prisma.city.findMany({
        where: {
            city: (city as string).split(", ")[0],
            state: (city as string).split(", ")[1],
        },
    });

    const cardio = rawCityData.filter(
        (metric) => metric.metric_name === "Cardiovascular disease deaths"
    );

    const ozone = rawCityData.filter(
        (metric) => metric.metric_name === "Air pollution - ozone"
    );
    const ozoneAvg = ozone.reduce(
        (acc, val) => acc + val.est / ozone.length,
        0
    );
    const ozoneObj: City = {
        ...ozone[0],
        est: parseFloat(ozoneAvg.toFixed(1)),
    };

    const cityData = rawCityData
        .filter((metric) => metric.metric_name !== "Air pollution - ozone")
        .concat(ozoneObj);

    return {
        props: { cityData, cardio },
    };
};

export default City;
