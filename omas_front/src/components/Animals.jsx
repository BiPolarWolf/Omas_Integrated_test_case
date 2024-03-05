import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class AnimalList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      animals: [],
      loading: true
    };
  }

  componentDidMount() {
    axios.get('http://localhost:8000/api/animals/')
      .then(response => {
        this.setState({
          animals: response.data,
          loading: false
        });
      })
      .catch(error => {
        console.error('Error fetching animals:', error);
        this.setState({ loading: false });
      });
  }

  render() {
    const { animals, loading } = this.state;

    if (loading) {
      return <div>Loading...</div>;
    }

    return (
        <>
    <h2 class='text-center'>Список всех животных</h2>
      <div class='animals '>
        {animals.map(animal => (
          <div class='animal-cart text-center shadow-7' key={animal.id}>
            <h2>{animal.nickname}</h2>
            <h4> {animal.breed_info}</h4>
            <h5>Инвентарный номер:  {animal.inventory_number}</h5>
            <p>Дата регистрации: {animal.date_arrival}</p>
            <p>Срок нахождения: {animal.is_in_months}</p>
            <p>Родитель: {animal.parent_info}</p>
            <p><Link to={`/animals/${animal.id}`}>Подробнее</Link></p>
          </div>
        ))}
      </div></>
    );
  }
}

export default AnimalList;