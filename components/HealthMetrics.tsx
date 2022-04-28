import { City } from "@prisma/client";
import { useState } from "react";

interface Props {
    cityData: City[];
    cardio: City[];
}

const unitMapping = {
    "Air pollution - particulate matter": "per cubic meter",
    "Air pollution - ozone": "parts ber billion (yearly avg)",
    Diabetes: "percent of adults",
    "Frequent mental distress": "percent of adults",
    Obesity: "percent of adults",
    "Physical inactivity": "percent of adults",
};

const HealthMetrics: React.FC<Props> = ({ cityData, cardio }) => {
    const [cardioPop, setCardioPop] = useState("total population");

    return (
        <div className="min-h-screen bg-gradient-to-b from-cyan-800 to-purple-400 snap-start">
            <div className="container mx-auto mt-14 text-center">
                <h3 className="font-mono text-xl font-medium">
                    How healthy are people in {cityData[0].city} when it comes
                    to indicators related to transportation?
                </h3>
                <div className="grid grid-rows-2 grid-cols-2 md:grid-cols-4 gap-8 mt-8">
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
                                    <span className="text-slate-600 font-medium">
                                        {unitMapping[metric.metric_name]}
                                    </span>
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
                                onChange={(e) => setCardioPop(e.target.value)}
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
                                    (metric) => metric.group_name === cardioPop
                                ).est
                            }
                            <br />
                            <span className="text-slate-600">per 100,000</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default HealthMetrics;
