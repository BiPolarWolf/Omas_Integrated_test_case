import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
function WeightingsList() {
  const [weightings, setWeightings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:8000/api/weightings/')
      .then(response => {
        setWeightings(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching weightings:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2 className='text-center'>Список всех взвешиваний</h2>
      <ul >
        {weightings.map(weighting => (
          <li key={weighting.id}>
            <ul className = 'horizontal shadow-3'>
                <li><p>Дата: {weighting.weighting_date}</p></li>
                <li><p>Животное: <Link to={`/animals/${weighting.animal}`}>{weighting.animal_info}</Link></p></li>
                <li><p>Вес: {weighting.weight_kg} kg</p></li>     
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default WeightingsList;
