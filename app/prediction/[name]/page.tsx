import { memo } from "react";

const getPredictedDetails = async (name: string, constraint: string) => {
    const response = await fetch(`https://api.${constraint}.io/?name=${name}`);
    return response.json();
}

const getPredictedAge = async (name: string) => await getPredictedDetails(name, 'agify',)
const getPredictedGender = async (name: string) => await getPredictedDetails(name, 'genderize',)
const getPredictedCountry = async (name: string) => await getPredictedDetails(name, 'nationalize',)

interface IPredictionData {
    name: string;
}
interface IPredictionParams {
    params: IPredictionData;
}

const Page = async ({ params: { name } }: IPredictionParams) => {
    const [{ age }, { gender }, nationality] = await Promise.all([
        getPredictedAge(name),
        getPredictedGender(name),
        getPredictedCountry(name),
    ])

    if (!(age || gender || nationality.length)) {
        return <div>Failed to fetch data</div>
    }

    return (
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl m-3 p-4">
            <div className="p-8">
                <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
                    Personal Info
                </div>
                <div className="block mt-1 text-lg leading-tight font-medium text-black">
                    Age: {age}
                </div>
                <div className="block mt-1 text-lg leading-tight font-medium text-black">
                    Gender: {gender}
                </div>
                <div className="block mt-1 text-lg leading-tight font-medium text-black">
                    Nationality: {nationality[0]?.country_id}
                </div>
            </div>
        </div>
    );
}

export default memo(Page)
