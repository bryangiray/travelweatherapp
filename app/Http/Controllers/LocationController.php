<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class LocationController extends Controller
{
    public $geopifyKey = '';

    public function __construct()
    {
        $this->geopifyKey = config('apikey.geopify');
    }

    public function getIpInfo()
    {
        $link = "https://api.geoapify.com/v1/ipinfo&apiKey={$this->geopifyKey}";

        $curl = curl_init();
        die($link);

        curl_setopt_array($curl, array(
        CURLOPT_URL => $link,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_ENCODING => '',
        CURLOPT_MAXREDIRS => 10,
        CURLOPT_TIMEOUT => 0,
        CURLOPT_FOLLOWLOCATION => true,
        CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
        CURLOPT_CUSTOMREQUEST => 'GET',
        ));

        $response = curl_exec($curl);

        curl_close($curl);
        return $response;
    }

    public function search()
    {
        $searchKey = request('searchKey');
        $curl = curl_init();

        $link = "https://api.geoapify.com/v1/geocode/autocomplete?text={$searchKey}&format=json&apiKey={$this->geopifyKey}";
        curl_setopt_array($curl, array(
        CURLOPT_URL => $link,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_ENCODING => '',
        CURLOPT_MAXREDIRS => 10,
        CURLOPT_TIMEOUT => 0,
        CURLOPT_FOLLOWLOCATION => true,
        CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
        CURLOPT_CUSTOMREQUEST => 'GET',
        ));

        $response = curl_exec($curl);

        curl_close($curl);
        echo $response;
    }

    public function searchNearby()
    {
        $lat = request('lat');
        $lon = request('lon');
        $type = request('type');

        //we will set standard radius of 500m within the coordinates
        $prefix = 'radius_500';
        $type = $prefix.'.'.$type;

        $url = "https://api.geoapify.com/v2/place-details?lat=${lat}&lon=${lon}&features=${prefix},{$type}&apiKey={$this->geopifyKey}";
        
        $curl = curl_init();

        curl_setopt_array($curl, array(
        CURLOPT_URL => $url,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_ENCODING => '',
        CURLOPT_MAXREDIRS => 10,
        CURLOPT_TIMEOUT => 0,
        CURLOPT_FOLLOWLOCATION => true,
        CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
        CURLOPT_CUSTOMREQUEST => 'GET',
        ));

        $response = curl_exec($curl);




        curl_close($curl);
        echo $response;
    }
}
