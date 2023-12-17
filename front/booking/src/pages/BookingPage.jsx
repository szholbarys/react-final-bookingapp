import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react';
import axios from "axios";
import AddressLink from '../AddressLink';
import PlaceGallery from '../PlaceGallery';
import BookingDates from '../BookingDates';

export default function BookingPage(){
    const {id} = useParams();
    const [booking, setBooking] = useState(null);

    useEffect(() => {
        if(id){
            axios.get('/bookings').then(response => {
                const foundBooking = response.data.find(({_id}) => _id === _id)
                if(foundBooking){
                    setBooking(foundBooking);
                }
            })
        }
    }, [id]);

    if(!booking){
        return '';
    }
    return(
        <div className="my-8">
            <h1 className="text-3xl">{booking.place.title}</h1>
            <AddressLink className="mt-4 block">{booking.place.address}</AddressLink>
            <div className="flex justify-between items-center bg-gray-200 p-6 mt-6 mb-6 rounded-2xl">
                <div>
                    <h2 className='text-2xl mb-2'>Your booking information : </h2>
                    <BookingDates booking={booking}/>
                </div>
                <div className='bg-primary text-white rounded-2xl p-4 '>
                    <div>Total price :</div>
                    <div className='text-3xl'>TG{booking.price}</div>
                </div>
            </div>
            <PlaceGallery place={booking.place}/>
        </div>
    )
}