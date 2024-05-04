import React, { useState, useEffect } from "react";
import Map from '../Location/Map'
import Nearby from '../Location/Nearby'
import alertify from 'alertifyjs';
import 'alertifyjs/build/css/alertify.min.css';
import sunrise from '../../../assets/sunrise.png'
import sunset from '../../../assets/sunset.png'
import LoadingIcon from "@/Components/LoadingIcon";

function Tile (props) {
    
    const [loading, setLoading] = useState(false);
    const [nearbyResult, getResult] = useState([])
    const [detailsType, setType] = useState('');
    const [showNearby, setNearby] = useState(false);

    useEffect(() => {
        setNearby(false);
        setLoading(false);
    }, [props.weather]);

    const checkDetails = (location, type) => {
        
        setType(type)
        setLoading(true)
        setNearby(false)
        //search for the near by restaurants & atms. we can add hotel, cafe etc
        fetch(`location/searchNearby/${location.coord.lat}/${location.coord.lon}/${type}`)
            .then(response => {
                if (!response.ok) {
                    alertify.error('Failed to fetch data');
                    throw new Error('Failed to fetch data');
                }
                return response.json();
            })
            .then(data => {
                setLoading(false)
                if( typeof data.features != 'object'  ){
                    alertify.error('Invalid Data Received');
                } else {
                    getResult(data.features)
                    setNearby(true)
                }
            })
            .catch(error => {
                setLoading(false)
                if (error.name === 'AbortError') {
                    console.log('Previous search action aborted');
                } else {
                    console.error('Error fetching data:', error);
                }
                setLoading(false);
            });
    }
    function timeConverter(UNIX_timestamp){
        var a = new Date(UNIX_timestamp * 1000);
        return a;
      }

    function getTime(unix){
        var a = timeConverter(unix);
        var hour = a.getHours();
        var ampm = hour >= 12 ? 'pm' : 'am';
        hour = hour % 12;
        hour = hour ? hour : 12; // the hour '0' should be '12'
        var min = a.getMinutes();
        return `${hour}:${min} ${ampm}`;
    }

      function getDate(unix){
        dateTime = timeConverter(unix);
        var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        var year = a.getFullYear();
        var month = months[a.getMonth()];
        var date = a.getDate();

        return `${month} ${date}, ${year}`
      }

    return (
        <div className="mt-5">
            <div className="container mx-auto">
                <div className="md:flex md:flex-wrap">
                
                    <div className="md:w-1/2 lg:w-1/3 xl:w-1/2 p-4">
                        <div className="w-full max-w-sm mx-auto">
                            <div className="bg-white shadow rounded-lg p-5 dark:bg-gray-200 w-full">
                                <div className="flex mt-4 mb-2">
                                    <div className="flex-1">
                                        <div className="city text-gray-600 dark:text-gray-600">{props.weather.name}</div>
                                        <div className="temp text-3xl font-bold text-gray-800 dark:text-gray-800">{props.weather.main.temp}  &deg;C</div>
                                        <div className="weather text-sm text-gray-400 dark:text-gray-600">{props.weather.weather[0].description}</div>
                                    </div>
                                    <div className="w-24">
                                        <img src={`https://openweathermap.org/img/wn/${props.weather.weather[0].icon}@2x.png`}  loading="lazy" />
                                    </div>
                                </div>
                                <div className="flex space-x-2 justify-between border-t dark:border-gray-500">
                                    <div className="feels">
                                        <strong>{props.weather.main.feels_like}  &deg;C</strong>
                                        <p>Feels Like</p>
                                    </div>
                                    <div className="windspeed">
                                        <strong>{props.weather.wind.speed}</strong>
                                        <p> Wind Speed</p>
                                    </div>
                                    <div className="humid">
                                        <strong>{props.weather.main.humidity}</strong>
                                        <p> humidity</p>
                                    </div>
                                </div>
                                <div className="flex space-x-2 justify-between border-t dark:border-gray-500">
                                    <div className="feels">
                                        <strong>{getTime(props.weather.sys.sunrise)}</strong>
                                        <img src={sunrise} className="sunicon"/>
                                    </div>
                                    <div className="feels">
                                        <strong>{getTime(props.weather.sys.sunset)}</strong>
                                        <img src={sunset} className="sunicon"/>
                                        
                                    </div>
                                
                                </div>
                            </div>

                            <div className="my-5">
                                <button className="mx-2 bg-green-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => checkDetails(props.weather, 'atm')}>Nearby ATMS</button> 
                                <button className="bg-yellow-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => checkDetails(props.weather, 'restaurant')}>Nearby Restaurants</button>
                            </div>
                            <div className="text-center">
                                { loading ? (
                                    <LoadingIcon />
                                ) : '' }
                            </div>
                            { showNearby ?  (
                                    <div>
                                        <Nearby details={nearbyResult} type={detailsType} />
                                    </div>
                                    ) : (
                                        <p className="text-center"></p>
                                    )
                                }
                            
                            
                        </div>
                    </div>
                
                    <div className="md:w-1/2 lg:w-1/2 xl:w-1/2 p-4 overflow-hidden">
                        <Map location={props.weather}/>
                    </div>
                </div>
            </div>
           
        </div>
    )
}

export default Tile