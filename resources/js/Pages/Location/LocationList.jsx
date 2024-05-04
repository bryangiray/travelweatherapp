import React, { useState } from "react";
import '../../../css/location_list.css';

function LocationList ({onSelect, locations}) {
    const liSelect = (selectedLocation) => {
        //pass the object to onSelect
        onSelect(selectedLocation);
    };
    console.log(locations)
    return (
        <ul>
            {locations.map((result, index) => (
            <li className="text-left" key={index} onClick={() => liSelect(result)} data-key={index} data-code={result.country_code}>{result.city}, {result.country}</li>
            ))}
        </ul>
        
    )
}


export default LocationList