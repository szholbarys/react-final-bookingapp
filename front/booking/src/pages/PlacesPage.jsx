import { Link  } from "react-router-dom";
import AccountNav from "../AccountNav";
import { useState, useEffect } from "react";
import axios from "axios";
import PlaceImg from "../PlaceImg";

export default function PlacesPage(){
    const [places, setPlaces] = useState([]); 
    useEffect(() => {
        axios.get('/user-places').then(({data}) => {
            setPlaces(data);
        });
    }, []);
    return(
        <div>
            <AccountNav/>
            <div className="text-center">
                <Link className='inline-flex bg-primary gap-1 text-white py-2 px-4 rounded-full' to={'new'}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
                    Add new places
                </Link>
            </div>
            <div className="mt-4">
                {places.length > 0 && places.map(place => (
                    <Link to={'/account/places' + place._id} className="flex mt-6 gap-4 bg-gray-100 p-4 rounded-2xl">
                        <div className="flex w-32 h-32 bg-gray-300 grow shrink-0">
                            <PlaceImg place={place}/>
                        </div>
                        <div className="grow-0 shrink">
                            <h2 className="text-xl">{place.title}</h2>
                            <p className="text-sm text-gray-500 mt-2">{place.description}</p>
                            <div className="mt-2">
                                <span className="font-bold">{place.price}</span>-tg per night
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    ); 
}