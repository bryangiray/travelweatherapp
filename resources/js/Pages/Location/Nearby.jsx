
function Nearby({onSelect, details, type}) {
    
    return  (
        
    <div className="my-5">
        <ul className="max-w-md divide-y divide-gray-200 dark:divide-gray-700">
         {details.map((detail, index) => (
               <li class="pb-3 sm:pb-4" key={index}>

                    <div class="flex items-center space-x-4 rtl:space-x-reverse">
                        <div class="flex-shrink-0">
                        {(() => {
                            switch (type) {
                            case 'restaurant':
                                return <div><svg width="30px" height="30px" viewBox="0 0 1024 1024" class="icon"  version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M682.666667 554.666667a42.666667 42.666667 0 0 0-42.666667-42.666667h-21.333333c-23.552 0-21.333333 19.114667-21.333334 42.666667l-21.333333 362.666666a42.666667 42.666667 0 0 0 42.666667 42.666667h42.666666a42.666667 42.666667 0 0 0 42.666667-42.666667l-21.333333-362.666666zM426.666667 448h-85.333334l-21.333333 469.333333a42.666667 42.666667 0 0 0 42.666667 42.666667h42.666666a42.666667 42.666667 0 0 0 42.666667-42.666667l-21.333333-469.333333z" fill="#3F51B5" /><path d="M682.666667 554.666667h-85.333334V64c42.666667 0 192 85.333333 85.333334 490.666667zM448 64v277.333333h-42.666667V64h-42.666666v277.333333h-42.666667V64h-42.666667l-21.333333 298.666667 85.333333 85.333333h85.333334l85.333333-85.333333-21.333333-298.666667z" fill="#2196F3" /></svg></div>;
                            case 'atm': //no break
                            default:
                                return <div><svg width="30px" height="30px" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--twemoji" preserveAspectRatio="xMidYMid meet"><path fill="#3B88C3" d="M36 32a4 4 0 0 1-4 4H4a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4h28a4 4 0 0 1 4 4v28z"></path><path fill="#BBDDF5" d="M0 10h36v17H0z"></path><path d="M5.297 13.74c.272-.736.896-1.329 1.713-1.329c.848 0 1.44.561 1.712 1.329l3.137 8.708c.096.256.128.48.128.593c0 .624-.512 1.056-1.105 1.056c-.672 0-1.008-.352-1.168-.832l-.48-1.505h-4.45l-.48 1.489c-.16.496-.497.848-1.153.848c-.64 0-1.184-.479-1.184-1.12c0-.256.08-.448.112-.528l3.218-8.709zm.177 5.81h3.041l-1.489-4.642h-.032l-1.52 4.642zm8.991-4.738H12.72c-.768 0-1.088-.561-1.088-1.104c0-.561.4-1.104 1.088-1.104h5.89c.688 0 1.089.544 1.089 1.104c0 .544-.32 1.104-1.089 1.104h-1.745v8.035c0 .8-.512 1.248-1.2 1.248s-1.201-.448-1.201-1.248v-8.035zm7.568-1.072c.096-.576.72-1.232 1.568-1.232c.801 0 1.424.576 1.601 1.152l1.89 6.338h.031l1.889-6.338c.176-.576.801-1.152 1.6-1.152c.85 0 1.473.656 1.57 1.232l1.488 8.932c.016.096.016.191.016.271c0 .704-.512 1.152-1.152 1.152c-.816 0-1.137-.368-1.248-1.12l-.945-6.515h-.031l-1.922 6.707c-.111.384-.416.928-1.279.928c-.865 0-1.169-.544-1.281-.928l-1.92-6.707h-.033l-.943 6.515c-.113.752-.433 1.12-1.249 1.12c-.64 0-1.152-.448-1.152-1.152c0-.08 0-.176.017-.271l1.485-8.932z" fill="#269"></path></svg></div>;
                            
                            }
                        })()}
                        </div>
                        <div class="flex-1 min-w-0">
                            <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                            {detail.properties.name}
                            </p>
                            <p class="text-sm text-gray-500 dark:text-gray-400">
                                {detail.properties.address_line1}
                            </p>
                            <p class="text-sm text-gray-500 dark:text-gray-400">
                                {detail.properties.address_line2}
                            </p>
                        </div>
                        
                    </div>
               </li>
               
       
       ))}  
        </ul>    
    </div>
        
    )
}

export default Nearby