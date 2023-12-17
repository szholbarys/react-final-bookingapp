import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function IndexPage(){
    const [places, setPlaces] = useState([]);

    useEffect(() => {
        axios.get('/places').then(response => {
            setPlaces([...response.data]);
        });
    }, []);

    return(
        <div className="mt-10 gap-x-6 gap-y-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {places.length > 0 && places.map(place => (
        <Link to={'/place/' + place._id}>
            <div className="rounded-2xl mb-2 flex">
                {place.photos?.[0] && (
                    <img className="rounded-2xl object-cover aspect-square" src={'http://localhost:4000/uploads/' + place.photos?.[0]} alt="photo" />
                )}
                </div>
                <h3 className="font-bold text-sm">{place.address}</h3>
                <h2 className="text-sm truncate text-gray-500">{place.title}</h2>
                <div className="mt-2">
                    <span className="font-bold">{place.price}</span>-tg per night
                </div>
            </Link>
        ))} 
        </div>
    );
}