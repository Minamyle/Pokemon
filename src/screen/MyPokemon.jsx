import React, { useEffect, useState } from 'react';
import { deleteItemFromLocalstorage, getItemsFromLocalstorage } from '../functions';

const MyPokemon = () => {
// State variable to store an array of pokemons
const [pokemons, setPokemons] = useState([]);

// useEffect hook to initialize the 'pokemons' state with data from local storage when the component mounts
useEffect(() => {
    setPokemons(getItemsFromLocalstorage());
}, []);

// Function to handle deletion of an item by ID from local storage and update the state
const handleDeleteItem = (id) => {
    // Delete item from local storage
    deleteItemFromLocalstorage(id);

    // Update 'pokemons' state with the latest data from local storage after deletion
    setPokemons(getItemsFromLocalstorage());
};
  return (
    <div className='p-[1rem] salsa md:p-[2rem] bg-orange-100 min-h-[100vh] h-[100vh] pb-[4rem]'>
      <h1 className="text-3xl text-orange-600">My Team</h1>

      
      <div className={`container bg-white mx-auto mt-16 ${pokemons.length < 1  && 'h-[100%]'} rounded-md shadow-md px-[1rem] md:px-[2rem] py-[2rem] w-[100%] `}>
        {
          pokemons.length > 0 ? <div className='overflow-x-scroll md:overflow-hidden'>
            <table class="table-auto ">
  <thead>
    <tr className='text-orange-600 text-[17px]'>
      <th className='px-[1rem] md:px-[2rem] lg:px-[5vw] '>ID</th>
      <th className='px-[1rem] md:px-[2rem] lg:px-[5vw] text-start'>Pokemon name</th>
      <th className='px-[1rem] md:px-[2rem] lg:px-[5vw] '>Weight</th>
      <th className='px-[1rem] md:px-[2rem] lg:px-[5vw] '>Height</th>
      <th className='px-[1rem] md:px-[2rem] lg:px-[5vw] '></th>
    </tr>
  </thead>
  <tbody className='mt-4'>
    {
      pokemons.map((item) => (
        <tr className='text-[17px] text-orange-500' key={item.id}>
      <td className='px-[1rem] md:px-[2rem] lg:px-[5vw]'>#{item.id}</td>
      <td className='px-[1rem] md:px-[2rem] lg:px-[5vw]  min-w-[15rem] py-3 flex flex-row gap-5  items-center'> <img src={item.img} className='w-8 h-8'/> {item.name}</td>
      <td className='px-[1rem] md:px-[2rem] lg:px-[5vw] '>{item.weight}</td>
      <td className='px-[1rem] md:px-[2rem] lg:px-[5vw] py-3 '>{item.height}</td>
      <td className='px-[1rem] md:px-[2rem] lg:px-[5vw] py-3 '>
      <button className='border border-red-500  px-6 text-[15px] py-1 bg-red-500 rounded-md text-white' onClick={() => handleDeleteItem(item.id)}>
        Delete
      </button>
      </td>

      
    </tr>
      ))
    }
  </tbody>
</table>
          </div> : <div className='flex text-center items-center flex-col justify-center h-[100%] mt-auto'>
            <img src='/empty.png' className='max-w-[30rem]'/>
            <p className='text-orange-600 text-xl'>You have no Pokemon in your team. <br /> Search for pokemon to add</p>
          </div>
        }
      </div>
    </div>
  );
}

export default MyPokemon;
