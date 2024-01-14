import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Axios from "axios";
import { addItemToLocalstorage } from "../functions";

const PokemonDetail = () => {
  const [loading, setLoading] = useState(false);
  const [res, setRes] = useState([]);
  const [error, setError] = useState(false);
  const [allImages, setAllImages] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { id } = useParams();

  const getPokemons = async () => {
    // console.log("called");
    if (id) {
      // console.log("in");
      try {
        setRes([]);
        setError(false);
        setLoading(true);
        const response = await Axios.get(
          `https://pokeapi.co/api/v2/pokemon/${id}`
        );
        const data = response.data;

        // console.log(data);
        // Handle the data as needed
        setRes(data);
      } catch (error) {
        console.log(error.message);
        // Handle the error
        setError(true);
      } finally {
        // getPokemonImage()
        setLoading(false);
        // setPokemon('')
      }
    }
  };

  useEffect(() => {
    if (res.name) {
      const newImageURLs = Object.values(res.sprites.other).reduce(
        (acc, val) => {
          return acc.concat(Object.values(val).filter((url) => url));
        },
        []
      );

      setAllImages(newImageURLs);
    }
  }, [res]);

  // console.log(allImages);
  //  to get pokemon detail when we open the page
  useEffect(() => {
    getPokemons();
  }, []);

  const handleAddToTeam = () => {
    addItemToLocalstorage(
      res.name,
      res.id,
      allImages[0],
      res.height,
      res.weight
    );
  };
  return (
    <>
      {loading ? (
        <div className="w-[100%] border h-[100vh] flex items-center justify-center">
          <img src="/loader.gif" className="w-20 h-20" />
        </div>
      ) : !loading && res.name ? (
        <div className="bg-orange-100 salsa p-[2rem]">
          <div className="flex justify-end">
            <button
              className="border border-orange-500 text-orange-500 px-4 py-2"
              onClick={handleAddToTeam}
            >
              Add to team
            </button>
          </div>

          <div className="shadow-md container bg-white mt-12 rounded-md px-[1rem] md:px-[2rem]">
            <div className="flex flex-col p-[2rem] lg:items-center px-[1rem] md:px-[2%] lg:px-[7.5%] lg:flex-row justify-between">
              <div className="">
                <div>
                  <p className="text-orange-300">#{res.id}</p>
                  <h1 className="text-6xl text-orange-600">{res.name}</h1>
                </div>

                <div className="mt-8 flex flex-row gap-6">
                  <p className="border bg-green-500 px-5 rounded-md py-1 text-white">
                    Grass
                  </p>
                  <p className="border bg-orange-500 px-5 rounded-md py-1 text-white">
                    Poison
                  </p>
                </div>

                <div className="mt-12">
                  <h1 className="text-xl text-orange-500">Breeding</h1>

                  <div className="mt-3 flex flex-row gap-5">
                    <div>
                      <h1 className="text-orange-200 text-[13px]">Height</h1>
                      <h1 className="text-[18px] text-orange-600">
                        {res.height}cm
                      </h1>
                    </div>

                    <div>
                      <h1 className="text-orange-200 text-[13px]">Weight</h1>
                      <h1 className="text-[18px] text-orange-600">
                        {res.weight}cm
                      </h1>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col ">
                <img
                  src={allImages[currentImageIndex]}
                  className="max-w-[30rem] w-[20rem]"
                />
              </div>
            </div>

            <div className="py-[2rem] flex flex-row flex-wrap gap-6 justify-center">
              {allImages.map((img, index) => (
                <img
                  src={img}
                  className="w-16 h-16"
                  onClick={() => setCurrentImageIndex(index)}
                  key={index}
                />
              ))}
            </div>
          </div>

          <div className="shadow-md container bg-white mt-12 rounded-md flex flex-col py-[2rem] px-[1rem] md:px-[5%] lg:px-[7.5%]">
            <h1 className="text-xl text-orange-500">Poke Info</h1>
            <div className="mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-16">
              <div>
                <h1 className="text-[17px] text-orange-600">Abilities</h1>

                {res.abilities.map((ability, index) => (
                  <p className="text-[14px] flex flex-row gap-1" key={index}>
                    <span className="text-orange-500">*</span>{" "}
                    {ability.ability.name}
                  </p>
                ))}
              </div>
              <div>
                <h1 className="text-[17px] text-orange-600">Forms</h1>
                {res.forms.map((form, index) => (
                  <p className="text-[14px] flex flex-row gap-1" key={index}>
                    <span className="text-orange-500">*</span> {form.name}
                  </p>
                ))}
              </div>

              <div>
                <h1 className="text-[17px] text-orange-600">Held Item</h1>
                {res.held_items.map((item, index) => (
                  <p className="text-[14px] flex flex-row gap-1" key={index}>
                    <span className="text-orange-500">*</span>
                    {item.item.name}
                  </p>
                ))}
              </div>

              {/* // Section for displaying Pokemon stats */}
              <div>
                {/* Heading for the stats section */}
                <h1 className="text-[17px] text-orange-600">Stat</h1>

                {/* Mapping over the stats array in the res object */}
                {res.stats.map((item, index) => (
                  // Paragraph for each stat, using Flexbox for a horizontal layout
                  <p className="text-[14px] flex flex-row gap-1" key={index}>
                    {/* Visual indicator (orange asterisk) */}
                    <span className="text-orange-500">*</span>
                    {/* Displaying the stat name and its base value */}
                    {item.stat.name}: {item.base_stat}
                  </p>
                ))}
              </div>
            </div>
          </div>

          <div className="shadow-md container bg-white mt-12 rounded-md flex flex-col py-[2rem] px-[1rem] md:px-[5%] lg:px-[7.5%]">
            <h1 className="text-xl text-orange-500">Pokemon Move</h1>

            <div className="flex flex-row flex-wrap gap-5 mt-12">
              {res.moves.map((item, index) => (
                <p
                  className="border px-4 py-2 rounded-md shadow-md bg-orange-300 text-white"
                  key={index}
                >
                  {item.move.name}
                </p>
              ))}
            </div>
          </div>
        </div>
      ) : (
        !loading &&
        !res.name && (
          <div className="w-[100%] bg-orange-100 h-[100vh] flex flex-col justify-center items-center">
            <img src="/empty.png" className="max-w-[40rem]" />
            <p className="text-orange-600 text-xl text-center">
              Ooops <br />
              Can't find pokemon
            </p>
          </div>
        )
      )}
    </>
  );
};

export default PokemonDetail;
