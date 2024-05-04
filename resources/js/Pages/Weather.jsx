import React, {useState} from "react";

import axios from "axios";
import Header from '../Template/Header'
import Footer from '../Template/Footer'


const Weather = () => {
    return (
        <div>
            <Header/>
        
            <div className="flex justify-center items-center h-screen">
                <div className="text-center">
                    <h1 className="text-4xl font-bold mb-4">Welcome To Travel Weather APP</h1>
                    <form>
                        <input type="text" placeholder="Search City" className="border border-gray-300 px-4 py-2 rounded-md shadow-sm focus:outline-none focus:border-blue-400" />        
                    </form>
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default Weather