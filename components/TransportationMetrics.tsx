import dynamic from "next/dynamic";
import Link from "next/link";
import { useState } from "react";

interface Props {
    city: string;
    walkScore: number;
    transitScore: number;
    bikeScore: number;
    lat: number;
    lon: number;
}

const TransportationMetrics: React.FC<Props> = ({
    city,
    walkScore,
    transitScore,
    bikeScore,
    lat,
    lon,
}) => {
    const [mapType, setMapType] = useState("cycling");

    const getScoreMeaning = (name: string, score: number) => {
        const scoreMapping = {
            "Walk Score": {
                90: "Daily errands do not require a car.",
                70: "Most errands can be accomplished on foot.",
                50: "Some errands can be accomplished on foot.",
                25: "Most errands require a car.",
                0: "Almost all errands require a car.",
            },
            "Transit Score": {
                90: "World-class public transportation.",
                70: "Transit is convenient for most trips.",
                50: "Many nearby public transportation options.",
                25: "A few nearby public transportation options.",
                0: "It is possible to get on a bus.",
            },
            "Bike Score": {
                90: "Daily errands can be accomplished on a bike.",
                70: "Biking is convenient for most trips.",
                50: "Some bike infrastructure.",
                25: "Minimal bike infrastructure.",
                0: "Minimal bike infrastructure.",
            },
        };

        const scoreMeaning =
            score >= 90
                ? 90
                : score >= 70
                ? 70
                : score >= 50
                ? 50
                : score >= 25
                ? 25
                : 0;
        return scoreMapping[name][scoreMeaning];
    };

    const Map = dynamic(() => import("../components/Map"), {
        ssr: false,
        loading: () => <div>loading...</div>,
    });

    return (
        <div className="min-h-screen bg-gradient-to-b from-purple-400 to-cyan-800 snap-start">
            <div className="container mx-auto mt-14 text-center flex flex-col">
                <h3 className="font-mono text-xl font-medium">
                    How much do people in {city} get around using active
                    transportation modes?
                </h3>
                <div className={`flex flex-row ${walkScore ? "justify-between" : "justify-center"} items-center`}>
                    {walkScore && (
                        <div className="grid grid-cols-1 gap-8 mt-24 w-1/5">
                            {[
                                { name: "Walk Score", score: walkScore },
                                { name: "Transit Score", score: transitScore },
                                { name: "Bike Score", score: bikeScore },
                            ].map((score, i) => (
                                <div
                                    key={i}
                                    className="bg-slate-100 shadow-md p-3 md:p-6 rounded-md"
                                >
                                    <span className="font-semibold">
                                        {score.name}
                                    </span>
                                    <br />
                                    {score.score}
                                    <br />
                                    {getScoreMeaning(score.name, score.score)}
                                </div>
                            ))}
                        </div>
                    )}
                    <div className="mt-12 flex flex-col">
                        <div className="flex flex-row justify-between">
                            <div className={mapType === "transit" ? "mb-7" : undefined}>
                                <input
                                    type="radio"
                                    value="cycling"
                                    id="cycling"
                                    checked={mapType === "cycling"}
                                    onChange={() => setMapType("cycling")}
                                />
                                <label htmlFor="cycling" className="mr-3 ml-1">
                                    Cycling
                                </label>
                                <input
                                    type="radio"
                                    value="transit"
                                    id="transit"
                                    checked={mapType === "transit"}
                                    onChange={() => setMapType("transit")}
                                />
                                <label htmlFor="transit" className="ml-1">
                                    Transit
                                </label>
                            </div>
                            {mapType === "cycling" && (
                                <a href="https://www.cyclosm.org/legend.html">
                                    <button className="bg-gradient-to-r from-blue-600 to-blue-500 p-2 rounded-lg shadow-md text-white hover:bg-gradient-to-r hover:from-blue-700 hover:to-blue-600 mb-3">
                                        Legend
                                    </button>
                                </a>
                            )}
                        </div>
                        <Map lat={lat} lon={lon} mapType={mapType} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TransportationMetrics;
