import React, { useEffect, useState } from 'react';
import Axios from "axios";
import { IoSearchSharp } from "react-icons/io5";
import { Link } from 'react-router-dom';

const HomeScreen = () => {
  const [loading, setLoading] = useState(false)
  const [pokemon, setPokemon] = useState('')
  const [data, setData] = useState([])
  const [image, setImage] = useState('')
  const [error, setError] = useState(false)
 
  const getPokemons = async () => {

if(pokemon) {


    try {
      setData([])
      setError(false)
      setLoading(true);
      const response = await Axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
      const res = response.data;
  
      // console.log(data);
      // Handle the data as needed
      setData(res)
      
    } catch (error) {
      console.log(error.message);
      // Handle the error
      setError(true)
    } finally {
      
      setLoading(false);
     
    }
  }
  };
  
  useEffect(() => {
    setError(false)
   
    
  }, [pokemon])
      
      
  return (
    <div 
 className='bg-orange-500  salsa w-[100%] h-[100vh] overflow-y-hidden flex items-center p-[1rem] md:pl-[4%]'
    >
      <img src='/pokemon.png' className='absolute md:-right-16 max-w-[50rem]  max-h-[100vh]'/>
    

    <div className='overlay'></div>
      
      <div className='relative z-10 px-[1rem] lg:px-[5%]'>
        <h1 className=' text-white text-4xl lg:text-6xl xl:text-7xl'>Legendary Pokemon Go <br /> Raiding on a Party Bus</h1>

        <div className='flex flex-col md:flex-row items-start md:items-center gap-4 mt-12'>

          <div className='min-w-[10rem] w-[100%] max-w-[24rem] relative'>
          <input value={pokemon} onChange={(e) => setPokemon(e.target.value)} className="h-[3rem] text-orange-500 outline-none rounded-md w-[100%] pl-3" placeholder='Search your favorite pokemon...'/>
      
{
  !loading && data?.name ? (
    <div className='absolute px-4 flex items-center text-orange-500 -bottom-[4.25rem] rounded-md h-[4rem] bg-white w-[100%] left-0'>
      <Link to={`/pokemon-detail/${data.id}`}>
      <div className='flex flex-row items-center'>
        <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${data?.id}.png`} className='w-16' />
        <h1>{data.name}</h1>
      </div>
      </Link>
    </div>
  ) : !loading && error  ? (
    <div className='absolute px-4 flex items-center text-orange-500 -bottom-[4rem] h-[4rem] bg-white w-[100%] left-0'>
      <h1>Can't find any pokemon named {pokemon}</h1>
    </div>
  ) : ''
}

          </div>
     
          <button className='border h-[3rem] flex flex-row gap-6 px-5 bg-white text-slate-500 rounded-md items-center ' onClick={getPokemons}>{!loading ? 'Search' : 'loading...'} {!loading &&  <IoSearchSharp />}</button>

          
        </div>
        <p className='mt-7 text-white text-xl'>Join the next adventure</p>
      </div>

   </div>

  );
}

export default HomeScreen;
