import { useRouter } from "next/router";
import { useState } from "react";

const Search = () => {
    const [searchText, setSearchText] = useState("");
    const router = useRouter();

    return (
        <div className="self-center my-48 w-3/4 text-center">
            <h3 className="text-lg text-slate-900 font-mono">
                Find transportation and health data for your city:{" "}
            </h3>
            <form
                className="flex flex-row place-content-center pt-8"
                onSubmit={(e) => {
                    e.preventDefault();
                    if (searchText.length > 0) {
                        router.push(`/${searchText}`);
                    }
                }}
            >
                <input
                    className="shadow-md p-2 rounded-lg mx-6 focus:outline-none focus:ring focus:ring-blue-600 w-1/2 transition focus:scale-105"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    placeholder="Enter search"
                />
                <button
                    className="bg-gradient-to-r from-blue-600 to-blue-500 p-2 rounded-lg shadow-md text-white hover:bg-gradient-to-r hover:from-blue-700 hover:to-blue-600"
                    type="submit"
                >
                    Search
                </button>
            </form>
        </div>
    );
};

export default Search;
