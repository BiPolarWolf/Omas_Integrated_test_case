
import './App.css';
import Navbar from './components/Navbar'
import AnimalList from './components/Animals'
import AnimalsByBreed from './components/AnimalsByBreed';
import {  Routes, Route } from "react-router-dom";
import WeightingsList from './components/Weightings';
import AnimalDetailsOne from './components/AnimalDetails';
import AnimalAdd from './components/AnimalAdd';
export default function App() {
  return (
    <>
      <Navbar />
      <div class='container'>
      <Routes>
        <Route path="animals" element={<AnimalList />}></Route>
        <Route path="animals/:animalId" element={<AnimalDetailsOne />}></Route>
        <Route path="animals/breed/:breedId" element={<AnimalsByBreed />}></Route>
        <Route path="weightings" element={<WeightingsList />}></Route>
        <Route path="/" element={<AnimalList />}></Route>
        <Route path='animals/add' element={<AnimalAdd/> }></Route>
      </Routes>
      </div> 
    </>
     );
}