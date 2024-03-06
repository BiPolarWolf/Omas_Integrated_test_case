import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const AnimalList = () => {
  const [animals, setAnimals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:8000/api/animals/')
      .then(response => {
        setAnimals(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching animals:', error);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <h2 className='text-center'>Список всех животных</h2>
      <div className='animals'>
        {loading ? (
          <div>Loading...</div>
        ) : (
          animals.map(animal => (
            <div className='animal-cart text-center shadow-7' key={animal.id}>
              <h2>{animal.nickname}</h2>
              <h4>{animal.breed_info}</h4>
              <h5>Инвентарный номер: {animal.inventory_number}</h5>
              <p>Дата регистрации: {animal.date_arrival}</p>
              <p>Срок нахождения: {animal.is_in_months}</p>
              <p>Родитель: {animal.parent_info}</p>
              <p><Link to={`/animals/${animal.id}`}>Подробнее</Link></p>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default AnimalList;