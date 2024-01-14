import { toast } from "react-toastify";
//this function is to add an item to local storage
const addItemToLocalstorage = (name, id, img, height, weight) => {
  // this retrieve the existing items from local storage
  const existingItemsString = localStorage.getItem('pokemonItems');
  const existingItems = existingItemsString ? JSON.parse(existingItemsString) : [];

  //this check if the maximum limit of 6 items is reached
  if (existingItems.length >= 6) {
    toast.info('You have reached maximum of 6');
    throw new Error('Cannot add more than 6 items.');
  }

  //this check if an item with the given id already exists
  const existingItemIndex = existingItems.findIndex(item => item.id === id);

  if (existingItemIndex !== -1) {
    // Item with the given id already exists, you can choose to update or skip
    console.warn(`Item with ID ${id} already exists. Skipping addition.`);
  } else {
    //this add the new item to the array
    const newItem = { id, name, img, height, weight };
    existingItems.push(newItem);

    //this save the updated array back to local storage
    localStorage.setItem('pokemonItems', JSON.stringify(existingItems));
    console.log(`Item with ID ${id} added successfully.`);

    toast.success('Successfully added  to team');
  }
};





  //this Function is to retrieve items from local storage
  const getItemsFromLocalstorage = () => {
    const itemsString = localStorage.getItem('pokemonItems');
    return itemsString ? JSON.parse(itemsString) : [];
  };
  



  //this function to delete an item from local storage by ID
  const deleteItemFromLocalstorage = (id) => {
    // Retrieve existing items from local storage
    const existingItemsString = localStorage.getItem('pokemonItems');
    const existingItems = existingItemsString ? JSON.parse(existingItemsString) : [];
  
    //this find the index of the item with the given ID
    const indexToDelete = existingItems.findIndex(item => item.id === id);
  
    //this state if the item is found, remove it from the array
    if (indexToDelete !== -1) {
      existingItems.splice(indexToDelete, 1);
  
      //this save the updated array back to local storage
      localStorage.setItem('pokemonItems', JSON.stringify(existingItems));
      toast.success('Successfully deleted  from team');
    }
  };

export {
    addItemToLocalstorage, getItemsFromLocalstorage, deleteItemFromLocalstorage
}