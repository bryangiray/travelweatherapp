<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class WeatherController extends Controller
{

    public function search()
    {
        $openWeatherKey = config('apikey.open_weather');
        

        $city = !empty(request('city')) ? request('city') : 'Tokyo';
        $cities = explode(' ',$city);
        $city = $cities[0];

        $countryCode = !empty(request('ccode'))  ? request('ccode') : 'JP';

        // API endpoint URL
        $url = "http://api.openweathermap.org/data/2.5/weather?q={$city},{$countryCode}&appid={$openWeatherKey}&units=metric";


        // Initialize cURL session
        $curl = curl_init($url);

        // Set cURL options
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);

        // Execute cURL request
        $response = curl_exec($curl);

        // Check for errors
        if ($response === false) {
            die(curl_error($curl));
        }

        // Close cURL session
        curl_close($curl);
        $dataset = json_decode($response);
        //pass the apikey to render map
        $dataset->geopify = config('apikey.geopify');
        $dataset = json_encode($dataset); 

        return $dataset;

    }
}
