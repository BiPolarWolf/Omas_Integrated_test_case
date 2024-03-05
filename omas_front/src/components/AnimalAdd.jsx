import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { RadioButton } from 'primereact/radiobutton';

function AddAnimal() {
  const [breeds, setBreeds] = useState([]);
  const [parentAnimals, setParentAnimals] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    // Получаем список пород животных из API
    axios.get('http://localhost:8000/api/breed/')
      .then(response => {
        setBreeds(response.data);
      })
      .catch(error => {
        console.error('Error fetching breeds:', error);
      });

    // Получаем список всех животных для родителя из API
    axios.get('http://localhost:8000/api/animals/')
      .then(response => {
        setParentAnimals(response.data);
      })
      .catch(error => {
        console.error('Error fetching parent animals:', error);
      });
  }, []);

  const handleSubmit = (values, { setSubmitting }) => {
    axios.post('http://localhost:8000/api/animals/', values)
      .then(response => {
        console.log('Animal added successfully:', response.data);
        setSuccessMessage('Животное успешно добавлено');
        setErrorMessage('');
        // Обновляем состояние компонента или делаем другие действия после успешного добавления
      })
      .catch(error => {
        console.error('Error adding animal:', error);
        setSuccessMessage('');
        setErrorMessage('Ошибка добавления животного, возможно вы ввели уже существующий инвентарный номер');
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  return (
    <div className='mx-4'>
      <h2>Добавить новое животное</h2>
      {successMessage && <div className="success-message">{successMessage}</div>}
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      <Formik
        initialValues={{
          inventory_number: '',
          nickname: '',
          breed: '',
          parent: ''
        }}
        validate={values => {
          const errors = {};
          if (!values.inventory_number) {
            errors.inventory_number = 'Обязательное поле';
          }
          if (!values.nickname) {
            errors.nickname = 'Вы не ввели кличку';
          }
          if (!values.breed) {
            errors.breed = 'Вы не выбрали породу';
          }
          return errors;
        }}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="p-fluid">
            <div className='my-3'>
              <label htmlFor="inventory_number">Инвентарный номер</label>
              <Field type="text" name="inventory_number" as={InputText} />
              <ErrorMessage className='text-error' name="inventory_number" component="div" />
            </div>
            <div className='my-3'>
              <label htmlFor="nickname">Кличка</label>
              <Field type="text" name="nickname" as={InputText} />
              <ErrorMessage className='text-error' name="nickname" component="div" />
            </div>
            <div className='my-3'>
              <label htmlFor="breed">Порода</label>
              <Field as="select" name="breed" className="p-inputtext">
                <option value="">Выберите породу</option>
                {breeds.map(breed => (
                  <option key={breed.id} value={breed.id}>{breed.type_info} {breed.name}</option>
                ))}
              </Field>
              <ErrorMessage className='text-error' name="breed" component="div" />
            </div>
            <div className='my-3'>
            <label className=''>Пол</label>
            <div className='my-2'>
              <label >
                <Field className='mx-2'   type="radio" name="sex" value="M" as={RadioButton} />
                Мужской
              </label>
              <label className='mx-2'>
                <Field  className='mx-2' type="radio" name="sex" value="W" as={RadioButton} />
                Женский
              </label>
            </div>
            <ErrorMessage name="sex" component="div" />
          </div>
            <div className='my-3'>
              <label htmlFor="parent">Родитель</label>
              <Field as="select" name="parent" className="p-inputtext">
                <option value="">Отсутствует</option>
                {parentAnimals.map(parent => (
                  <option key={parent.id} value={parent.id}>{parent.breed_info} по имени {parent.nickname} ({parent.sex})</option>
                ))}
              </Field>
              <ErrorMessage className='text-error' name="parent" component="div" />
            </div>
            <Button className="p-button-primal" type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Добавляется...' : 'Добавить Животное'}
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default AddAnimal;