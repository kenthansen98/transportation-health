import { City } from "@prisma/client";
import { GetServerSideProps, GetStaticPaths, GetStaticProps } from "next";
import { useState } from "react";
import Layout from "../components/Layout";
import prisma from "../lib/prisma";

interface Props {
    cityData: City[];
    cardio: City[];
}

const unitMapping = {
    "Air pollution - particulate matter": "per cubic meter",
    "Diabetes": "percent of adults",
    "Frequent mental distress": "percent of adults",
    "Obesity": "percent of adults",
    "Physical inactivity": "percent of adults",
    "Walkability": "Walk Score®",
};

const City: React.FC<Props> = ({ cityData, cardio }) => {
    const [cardioPop, setCardioPop] = useState("total population");

    return (
        <Layout>
            <div className="min-h-full flex flex-col justify-center text-center -my-14 pointer-events-none">
                <h1 className="text-5xl font-bold">{cityData[0].city_name}</h1>
                <h3 className="font-semibold text-lg">{cityData[0].state}</h3>
                <h3 className="mt-4 text-lg font-mono">
                    <span className="font-semibold">Population:</span>{" "}
                    {cityData[0].population.toLocaleString()}
                </h3>
            </div>
            <div className="min-h-screen bg-gradient-to-b from-cyan-800 to-purple-400">
                <div className="container mx-auto mt-14 text-center">
                    <h3 className="font-mono text-lg">
                        How healthy are people in {cityData[0].city_name} when
                        it comes to indicators related to transportation?
                    </h3>
                    <div className="grid grid-rows-2 grid-cols-1 md:grid-cols-4 gap-8 mt-8">
                        {cityData.map(
                            (metric, i) =>
                                metric.metric_name !==
                                    "Cardiovascular disease deaths" && (
                                    <div
                                        key={i}
                                        className="bg-slate-100 shadow-md p-3 md:p-6 rounded-md"
                                    >
                                        <span className="font-semibold">
                                            {metric.metric_name}
                                        </span>
                                        <br />
                                        {metric.est}
                                        <br />
                                        <span className="text-slate-600">{unitMapping[metric.metric_name]}</span>
                                    </div>
                                )
                        )}
                        {cardio.length > 0 && (
                            <div className="bg-slate-100 shadow-md p-3 md:p-6 rounded-md">
                                <span className="font-semibold">
                                    {cardio[0].metric_name}
                                </span>
                                <br />
                                <select
                                    value={cardioPop}
                                    onChange={(e) =>
                                        setCardioPop(e.target.value)
                                    }
                                >
                                    {cardio.map((pop, i) => (
                                        <option key={i} value={pop.group_name}>
                                            {pop.group_name}
                                        </option>
                                    ))}
                                </select>
                                <br />
                                {
                                    cardio.find(
                                        (metric) =>
                                            metric.group_name === cardioPop
                                    ).est
                                }
                                <br />
                                <span className="text-slate-600">per 100,000</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export const getStaticPaths: GetStaticPaths = async () => {
    const cityNames = await prisma.city.findMany({
        select: {
            city_name: true,
        },
    });

    const paths = cityNames.map((name) => ({
        params: { city: name.city_name },
    }));

    return {
        paths,
        fallback: false,
    };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const { city } = params;

    const cityData = await prisma.city.findMany({
        where: { city_name: city as string },
    });

    const cardio = cityData.filter(
        (metric) => metric.metric_name === "Cardiovascular disease deaths"
    );

    return {
        props: { cityData, cardio },
    };
};

export default City;
