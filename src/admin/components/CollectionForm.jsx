import React, { useState } from 'react'
import { IoMdClose } from 'react-icons/io';

function CollectionForm({fetchCategoriesAndCollections}) {
    const [name, setName] = useState("");
    const [appear, setAppear] = useState(false);
    const handleCollectionSave =async()=>{
        try {
            const response= await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/collection`,{
                method:'POST',
                headers:{
                    'Content-Type':'application/json',
                    'authorization':`Bearer ${localStorage.getItem('userToken')}`
                },
                body:JSON.stringify({name})
            } 
            )
            console.log(response)
            fetchCategoriesAndCollections()
        } catch (error) {
            console.log(error)
        }
    }
  return (

        <>
        <button onClick={()=>setAppear(true)} className='block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800' type='button'>
            +
        </button>
        {
            appear && (
                <div className="fixed top-0 w-full bg-gray-200/70 z-55  min-h-screen left-0 flex flex-col items-center justify-center p-3">
                <div className="w-full lg:w-1/3 bg-gray-700 rounded-lg p-5 min-h-1/2">
                    <div className="flex justify-between mb-5">
                        <h3 className='text-xl font-medium text-white text-center'>Create Collection</h3>
                        <div>
                            <IoMdClose onClick={()=>setAppear(false)} className='h-6 w-6 text-white hover:bg-gray-400 rounded-full'/>
                        </div>
                    </div>
                    <div>
                        <div class="col-span-2">
                                <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Collection Name</label>
                                <input value={name} onChange={(e)=>setName(e.target.value)} type="text" name="name" id="name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Type collection name" required=""/>
                        </div>
                        <button type="button" onClick={handleCollectionSave} class="text-white inline-flex items-center mt-5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        <svg class="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path></svg>
                        Add Collection          
                        </button>
                    </div>
                </div>
                </div>
            )
        }
        </>
  )
}

export default CollectionForm