import React, { useState, useEffect } from "react";
import { Link, Head } from '@inertiajs/react';
import Tile from './Tile'
import Footer from "../../Layouts/Footer";
import LoadingIcon from "@/Components/LoadingIcon";
import Recommended from "../Location/Recommended";
import LocationList from '../Location/LocationList'
import alertify from 'alertifyjs';
import 'alertifyjs/build/css/alertify.min.css';
import '../../../css/main.css';


const Home = () => {
    const weatherInfo = {
        name : '',
        wind: {},
        weather: [],
        main: { humidity : ''},
        visibility : "",
        cloud: ""
    }

    const topLocations = [
        { 
            id : 1,
            city: "tokyo",
            country_code: "jp",
            image: "tokyo.jpeg",
        },
        { 
            id : 2,
            city: "kyoto",
            country_code: "jp",
            image: "kyoto.avif",
        },
        { 
            id : 3,
            city: "Osaka",
            country_code: "jp",
            image: "osaka.jpeg",
        },
        { 
            id : 4,
            city: "Sapporo",
            country_code: "jp",
            image: "sapporo.jpeg",
        },
        { 
            id : 5,
            city: "Nagoya",
            country_code: "jp",
            image: "nagoya.jpeg",
        },
        { 
            id : 6,
            city: "yokohama",
            country_code: "jp",
            image: "yokohama.jpeg",
        }
         
    ] ;

    const locationList = [];
    const [selectedLocation, pickLocation] = useState(weatherInfo)
    const [location, setLoction] = useState('');
    const [loading, setLoading] = useState(false);

    const [locationResults, getLocations] = useState([])
    const [activeSearch, setSearch] = useState(false);

    const [countryCode, setCountry] = useState('');
    const apiKey = '23797a061eb95004acc2216e6acea008';
    const [displayTile, setDisplay] = useState(false);
  
    const searchLocation = (event) => {
  
        //search location via gopify
        if (location.length > 2) {
            setLoading(true);
            setSearch(false)  
            fetch(`location/search/${location}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                return response.json();
            })
            .then(data => {
                getLocations(data.results)
                setLoading(false);
                setSearch(true)  
            })
            .catch(error => {
                if (error.name === 'AbortError') {
                    console.log('Previous search action aborted');
                } else {
                    console.error('Error fetching data:', error);
                }
                setLoading(false);
            });
            
        }
       
    }

    const scrollTo = (target) => {
        
        const searchFormElement = document.getElementById(target);
        if (searchFormElement) {
            searchFormElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };


    const resultSelect = (selectedLocation) => {
        // GET weather forecast on selected location
        axios.get(`weather/search/${selectedLocation.city}/${selectedLocation.country_code}`).then((response) => {
            
            //apply selected location
            setSearch(false)
            console.log(typeof response.data.message)
            if (typeof response.data.message !== 'undefined') {
                alertify.error(response.data.message);

                return false;
            }
            
            pickLocation(response.data);
            setLoction('')

            scrollTo('travelInfo')

            if (Object.keys(response.data).length > 0) { 
                //show weather tile on selected location
                setDisplay(true);
            } else {
                setDisplay(false);
            }
        });
    }

    return (
        <div>
            <Head title="Weather Forecast"/> 
            
            <div className="flex justify-center items-center h-screen">
                <div className="container">
                    <div className="text-center">
                        <h1 className="welcome-msg text-4xl font-bold mb-4">Search your Destination</h1>
                        <form id="searchform" className="searchForm max-w-md mx-auto">   
                            <div>
                                <label htmlFor="hs-trailing-button-add-on-with-leading-and-trailing" className="sr-only">Label</label>
                                <div className="flex rounded-lg shadow-sm">
                                <button type="button" onClick={() => scrollTo('recommendations')} className="px-5 flex-shrink-0 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-none border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none">
                                    Recommendation
                                </button>
                                <input type="text" 
                                    value={location}
                                    onChange={event => setLoction(event.target.value)}
                                    onKeyPress={async (event) => {
                                        if (event.charCode === 13) {
                                            event.preventDefault();
                                            await searchLocation(event);
                                        }      
                                    }}
                                    placeholder="Search City"
                                 id="hs-trailing-button-add-on-with-leading-and-trailing" name="hs-trailing-button-add-on-with-leading-and-trailing" className="py-3 px-4 block w-full border-gray-200 shadow-sm rounded-0 text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-700 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"/>
                                <button 
                                    type="button" 
                                    onClick={event =>{ 
                                        event.preventDefault();
                                        searchLocation(event)
                                        }} 
                                    className="w-[2.875rem] h-[2.875rem] flex-shrink-0 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-e-md border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none">
                                        <svg className="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <circle cx="11" cy="11" r="8"></circle>
                                            <path d="m21 21-4.3-4.3"></path>
                                        </svg>
                                </button>
                                </div>
                            </div>
                            <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                        </form>
                        
                    </div>
                    <div className="max-w-96 mx-auto text-center">
                        { loading ? (
                            <LoadingIcon />
                        ) : '' }
                        { activeSearch ? (
                            <div>
                                <LocationList onSelect={resultSelect}  locations={locationResults} />
                            </div>
                            ) : ''
                        }
                    </div>
                </div>
                
            </div>
                    
                    <div id="travelInfo">
                    { displayTile ?  (
                        <div>
                            <Tile weather={selectedLocation} />
                        </div>
                        ) : (
                            <p className="text-center"></p>
                        )
                    }
                    </div>
            

            <Recommended onSelect={resultSelect} locations={topLocations}/>
            <Footer />
            
        </div>
    
    )
}

export default Home