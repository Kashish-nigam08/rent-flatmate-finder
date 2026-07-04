import { useState } from "react";
import api from "../services/api";

function Compatibility() {

    const [listingId, setListingId] = useState("");
    const [result, setResult] = useState(null);

    const calculate = async () => {

        try {

            const res = await api.post(`/compatibility/${listingId}`);

            setResult(res.data);

        }

        catch (error) {

            alert(error.response?.data?.detail);

        }

    };

    return (

        <div className="min-h-screen bg-slate-900 text-white p-10">

            <h1 className="text-4xl mb-6">

                AI Compatibility

            </h1>

            <input

                placeholder="Listing ID"

                value={listingId}

                onChange={(e)=>setListingId(e.target.value)}

                className="bg-slate-700 p-3 rounded mr-4"

            />

            <button

                onClick={calculate}

                className="bg-purple-600 px-6 py-3 rounded"

            >

                Calculate

            </button>

            {result && (

                <div className="mt-8 bg-slate-800 p-6 rounded">

                    <h2>

                        Score : {result.score}

                    </h2>

                    <p>

                        {result.explanation}

                    </p>

                </div>

            )}

        </div>

    );

}

export default Compatibility;