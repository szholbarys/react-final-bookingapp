import { useState } from "react"

export default function PlaceGallery({place}){
    const [showAllPhotos, setShowAllPhotos] = useState(false);

    // if(setShowAllPhotos){
    //     return (
    //         <div className="absolute inset-0 min-h-screen bg-white">
    //             <div>
    //                 <h2 className="p-8 text-3xl"> Photos of {place.title}</h2>
    //                 <button onClick={() => setShowAllPhotos(false)} className="fixed flex gap-1 py-2 px-4 right-12 top-8 rounded-2xl bg-primary text-white">
    //                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    //                     <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    //                     </svg>
    //                     close photos
    //                 </button>
    //             </div>
    //             <div className="p-8 gap-4 grid grid-cols-2">
    //                 {place?.photos?.length > 0 && place.photos.map(photo => (
    //                     <div>
    //                         <img src={'http://localhost:4000/uploads/' + photo} alt="more photos" />
    //                     </div>
    //                 ))}
    //             </div>
    //         </div>
    //     ); 
    // }

    return(
        <div className="relative">
        <div className="my-4 grid gap-2 grid-cols-[2fr_1fr] rounded-2xl overflow-hidden">
            <div>
                {place.photos?.[0] && (
                    <img onClick={() => setShowAllPhotos(true)}  className="aspect-square cursor-pointer object-cover" src={'http://localhost:4000/uploads/' + place.photos[0]} alt="photo" />                            
                )}
            </div>
            <div className="grid">
                {place.photos?.[1] && (
                    <img onClick={() => setShowAllPhotos(true)} className="aspect-square cursor-pointer object-cover" src={'http://localhost:4000/uploads/' + place.photos[1]} alt="photo" />
                )}
                <div className="overflow-hidden">
                    {place.photos?.[2] && (
                        <img onClick={() => setShowAllPhotos(true)} className="relative top-2 aspect-square cursor-pointer object-cover" src={'http://localhost:4000/uploads/' + place.photos[2]} alt="photo" />
                    )}
                </div>            
            </div>
        </div>
        <button onClick={() => 2(true)} className="flex gap-1 absolute bottom-2 right-2 rounded-2xl px-4 py-2 bg-primary text-white shadow shadow-md shadow-gray-500 ">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
            </svg>
            more photos
        </button>
    </div>
    )
}