import  { Component } from 'react';
import { Link } from 'react-router-dom';
import  { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';










function AnimalsByBreedId() {
  const { breedId } = useParams();
  const [animals, setAnimals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [breed, setBreedName] = useState('');

  useEffect(() => {
    axios.get(`http://localhost:8000/api/animals/?breed=${breedId}`)
      .then(response => {
        setAnimals(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching animals:', error);
        setLoading(false);
      });

  // Получаем информацию о породе
    axios.get(`http://localhost:8000/api/breed/${breedId}/`)
      .then(response => {
        setBreedName(response.data);
      })
      .catch(error => {
        console.error('Error fetching breed:', error);
      });

  }, [breedId]);


  if (loading) {
    return <div>Loading...</div>;
  }


  if (animals.length === 0) {
    return <h2 className='text-center'>Пока нету ни одного животного - {breed.type_info} породы {breed.name} </h2>;
  }

  return (
  
  <>
  <h2 className='text-center'>Список животных - {breed.type_info} породы {breed.name}</h2>
    <div class='animals '>
        {animals.map(animal => (
          <div class='animal-cart text-center shadow-7' key={animal.id}>
            <h2>{animal.nickname}</h2>
            <h4> {animal.breed_info}</h4>
            <p>Дата регистрации: {animal.date_arrival}</p>
            <p>Срок нахождения: {animal.is_in_months}</p>
            <p>Родитель: {animal.parent_info}</p>
            <p><Link to={`/animals/${animal.id}`}>Подробнее</Link></p>
          </div>
        ))}
      </div></>
  );
}

export default AnimalsByBreedId;