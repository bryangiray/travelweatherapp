import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import {} from 'mapbox-gl-leaflet';
import 'leaflet/dist/leaflet.css'; // Import Leaflet CSS
import 'leaflet/dist/images/marker-icon.png'; // Import Leaflet default icon
import 'leaflet/dist/images/marker-shadow.png'; // Import Leaflet default icon shadow
import '../../../css/map.css';


function Map({location}) {
    
    const mapContainerRef = useRef(null);

    useEffect(() => {
        console.log('loaded')
        console.log(location)
        
        if (!location) return; // Ensure location is available before creating the map

        const initialState = {
            lng: location.coord.lon,
            lat: location.coord.lat,
            zoom: 15
        };

        const map = L.map(mapContainerRef.current).setView([initialState.lat, initialState.lng], initialState.zoom);

        // Set language to English
        map.language = 'en';

        const myAPIKey = location.geopify;
        const mapStyle = 'https://maps.geoapify.com/v1/styles/osm-carto/style.json';


        // the attribution is required for the Geoapify Free tariff plan
        map.attributionControl.setPrefix('').addAttribution('Powered by <a href="https://www.geoapify.com/" target="_blank">Geoapify</a> | © OpenStreetMap <a href="https://www.openstreetmap.org/copyright" target="_blank">contributors</a>');


        const gl = L.mapboxGL({
            style: `${mapStyle}?apiKey=${myAPIKey}`,
            accessToken: 'no-token'
        }).addTo(map);

        // Cleanup function to remove the map when component unmounts
        return () => {
            map.remove();
        };


    }, [location]);
  
    return (
        <div className="map-container" ref={mapContainerRef}>
        </div>
    )
  }
  
  export default Map;