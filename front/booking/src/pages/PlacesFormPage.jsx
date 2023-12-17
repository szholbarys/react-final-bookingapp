import PhotosUploader from "../PhotosUploader";
import Perks from "../Perks";
import { useState, useEffect } from "react";
import axios from "axios";
import { Navigate, useParams } from "react-router-dom";
import AccountNav from "../AccountNav";

export default function PlacesFormPage(){
    const {id} = useParams();
    const [title, setTitle] = useState('');
    const [address, setAddress] = useState('');
    const [addedPhotos, setAddedPhotos] = useState([]);
    const [description, setDescription] = useState('');
    const [perks, setPerks] = useState([]);
    const [extraInfo, setExtraInfo] = useState('');
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [maxGuests, setMaxGuests] = useState(1);
    const [redirect, setRedirect] = useState(false);
    const [price, setPrice] = useState(10000);


    useEffect(() => {
        if(!id){
            return;
        }
        axios.get('/places/' + id).then(response => {
            const {data} = response;
            setTitle(data.title);
            setAddress(data.address);
            setAddedPhotos(data.photos);
            setDescription(data.description);
            setPerks(data.perks);
            setExtraInfo(data.extraInfo);
            setCheckIn(data.checkIn);
            setCheckOut(data.checkOut);
            setMaxGuests(data.maxGuests);
            setPrice(data.price);
        });
    }, [id]);

    function inputHeader(text){
        return(
            <h2 className="text-2xml mt-4">{text}</h2>
        )
    }
    function inputDesc(text){
        return(
            <p className="text-gray-500 text-sm">{text}</p>
        )
    }
    function preInput(header, description){
        return(
            <>
              {inputHeader(header)}
              {inputDesc(description)}
            </>
        )
    }
    async function savePlace(ev){
        ev.preventDefault();
        const placeData = {
            title, address, addedPhotos,
            description, perks, extraInfo, 
            checkIn, checkOut, maxGuests, price,
        };
        if(id){
            // update
            await axios.put('/places', {
                id, ...placeData
            });
            setRedirect(true); 
        }else{
            // new place
            await axios.post('/places', placeData);
            setRedirect(true); 
        }
    }

    if(redirect){
        return <Navigate to={'/account/places'}/>
    }

    return(
        <div>
            <AccountNav/>
        <form onSubmit={savePlace}> 
            {preInput('Title', 'title for your page, should be short and catchy as advertisement')}
            <input type="text" value={title} onChange={ev => setTitle(ev.target.value)} placeholder="title, for example: My lovely apt."/>
            {preInput('Address', 'address to this place')}
            <input type="text" value={address} onChange={ev => setAddress(ev.target.value)} placeholder="address"/>
            {preInput('Photo', 'more = better')}
            <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos}/>
            {preInput('Description', 'description of this place')}
            <textarea value={description} onChange={ev => setDescription(ev.target.value)}/>
            {preInput('Perks', 'select all perks of your place')}
            <Perks selected={perks} onChange={setPerks}/>
            {preInput('Extra Info', 'house rules, etc')}
            <textarea value={extraInfo} onChange={ev => setExtraInfo(ev.target.value)}/>
            {preInput('Check In & Out times', 'add check in and out times, remember to have some time window for cleaning the room between the guests')}
            <p className="text-gray-500 text-sm"></p>
            <div className="grid gap-2 mt-2 grid-cols-2 md:grid-cols-4">
                <div>
                    <h3 className="nt-2 -mb-1">Check in time</h3>
                    <input type="text" value={checkIn} onChange={ev => setCheckIn(ev.target.value)} placeholder="12:00"/>
                </div>
                <div>
                    <h3 className="nt-2 -mb-1">Check out time</h3>
                    <input type="text" value={checkOut} onChange={ev => setCheckOut(ev.target.value)} placeholder="10:00"/>
                </div>
                <div>
                    <h3 className="nt-2 -mb-1">Max number of guests</h3>
                    <input type="number" value={maxGuests} onChange={ev => setMaxGuests  (ev.target.value)}/>
                </div>
                <div>
                    <h3 className="nt-2 -mb-1">Price per night</h3>
                    <input type="number" value={price} onChange={ev => setPrice  (ev.target.value)}/>
                </div>
            </div>
            <button className="primary my-4">Save</button>
        </form>
    </div>
    );
}