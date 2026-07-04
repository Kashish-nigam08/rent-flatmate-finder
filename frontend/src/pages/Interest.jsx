import { useState } from "react";
import api from "../services/api";

function Interest(){

const[id,setId]=useState("");

const send=async()=>{

try{

await api.post(`/interest/${id}`);

alert("Interest Sent Successfully!");

}

catch(error){

alert(error.response?.data?.detail);

}

};

return(

<div className="min-h-screen bg-slate-900 text-white p-10">

<h1 className="text-4xl mb-6">

Interest Request

</h1>

<input

placeholder="Listing ID"

value={id}

onChange={(e)=>setId(e.target.value)}

className="bg-slate-700 p-3 rounded mr-3"

/>

<button

onClick={send}

className="bg-purple-600 px-6 py-3 rounded"

>

Send Interest

</button>

</div>

);

}

export default Interest;