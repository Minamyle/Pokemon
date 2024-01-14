// Importing necessary hooks and components from libraries
// import { useState } from 'react'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom'

// Importing screen components and layout
import HomeScreen from './screen/HomeScreen'
import PokemonDetail from './screen/PokemonDetail'
import MyPokemon from './screen/MyPokemon'
import Layout from './components/Layout'

// Importing components for notifications
import { ToastContainer, toast } from 'react-toastify';

// Importing styles for notifications
import 'react-toastify/dist/ReactToastify.css';

// Main component for the application
function App() {
  // Defining routes for the application
  const routes = [
    // Route for the home screen, the initial screen when the website is opened
    <Route path="/" element={<Layout><HomeScreen /></Layout>} />,

    // Route for displaying detailed information about a specific Pokemon
    // The ":id" in the path allows passing the Pokemon ID as a parameter
    <Route path="/pokemon-detail/:id" element={<Layout><PokemonDetail /></Layout>} />,

    // Route for displaying the user's Pokemon collection
    <Route path="/my-pokemon" element={<Layout><MyPokemon /></Layout>} />
  ]

  // Creating a router based on the defined routes
  const router = createBrowserRouter(createRoutesFromElements(routes))

  // Returning the main structure of the application
  return (
    <>
      {/* Component for displaying toast notifications */}
      <ToastContainer />

      {/* Providing the router to the application */}
      <RouterProvider router={router} />
    </>
  )
}

// Exporting the App component as the default export
export default App
