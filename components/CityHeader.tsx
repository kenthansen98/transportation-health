interface Props {
    city: string;
    state: string;
    population: number;
}

const CityHeader: React.FC<Props> = ({ city, state, population }) => {
    return (
        <div className="min-h-full flex flex-col justify-center text-center -mt-24 pointer-events-none snap-start">
            <h1 className="text-5xl font-bold">{city}</h1>
            <h3 className="font-semibold text-lg">{state}</h3>
            <h3 className="mt-4 text-lg font-mono">
                <span className="font-semibold">Population:</span>{" "}
                {population.toLocaleString()}
            </h3>
        </div>
    );
};

export default CityHeader;
