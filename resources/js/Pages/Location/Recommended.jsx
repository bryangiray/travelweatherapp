
function Recommended({onSelect, locations}) {
    const imageselect = (selectedLocation) => {
        //pass the object to onSelect
        onSelect(selectedLocation);
    };
    const asset = (path) => {
        return `/storage/images/${path}`;
    }
    console.log(locations)
    return  (
        
    <div id="recommendations" className="mt-10">
        <h2 className="text-center text-4xl font-extrabold">Recommendations</h2>
        <div className="flex flex-col md:grid md:grid-cols-3 gap-3">
                {locations.map((result, index) => (
                
                        <div className="relative rounded overflow-hidden"
                            onClick={() => 
                                onSelect(result) 
                            } 
                            key={index}>
                            <img src={asset('locations/'+result.image)} alt="Planter Stand with Pots" className="w-full"/>
                            <p
                            className="cursor-pointer absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center text-2xl text-center text-white font-roboto font-medium group-hover:bg-opacity-60 transition">
                            {result.city}
                            </p>
                        </div>
                
                ))}
        </div>
    </div>
        
    )
}

export default Recommended