import { useEffect, useState } from "react";
import api from "../services/api";

function BrowseListings(){

const[listings,setListings]=useState([]);

useEffect(()=>{

fetch();

},[]);

const fetch=async()=>{

const res=await api.get("/listings");

setListings(res.data);

};

return(

<div className="min-h-screen bg-slate-900 p-10 text-white">

<h1 className="text-4xl mb-8">

Browse Listings

</h1>

<div className="grid md:grid-cols-3 gap-6">

{listings.map(l=>(

<div
key={l.id}
className="bg-slate-800 p-5 rounded-xl"
>

<h2>{l.title}</h2>

<p>{l.location}</p>

<p>₹ {l.rent}</p>

</div>

))}

</div>

</div>

);

}

export default BrowseListings;