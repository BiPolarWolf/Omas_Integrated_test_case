import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { RadioButton } from 'primereact/radiobutton';



export default function AnimalDetailsOne() {
    const { animalId } = useParams();
    const [breeds, setBreeds] = useState([]);
    const [parentAnimals, setParentAnimals] = useState([]);
    const [animal, setAnimal] = useState({});
    const [loading, setLoading] = useState(true);
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const navigate = useNavigate();
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

        axios.get(`http://localhost:8000/api/animals/${animalId}/`)
            .then(response => {
                setAnimal(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching animal details:', error);
                setLoading(false);
            });

        axios.get('http://localhost:8000/api/animals/')
            .then(response => {
                setParentAnimals(response.data);
            })
            .catch(error => {
                console.error('Error fetching parent animals:', error);
            });
    }, [animalId]);

    const handleSubmit = (values, { setSubmitting }) => {
        axios.patch(`http://localhost:8000/api/animals/${animalId}/`, values)
            .then(response => {
                console.log('Animal details updated successfully:', response.data);
                setSuccessMessage('Данные о животном успешно обновлены');
                setErrorMessage('');
            })
            .catch(error => {
                console.error('Error updating animal details:', error);
                setSuccessMessage('');
                setErrorMessage('Ошибка обновления информации животного, возможно вы ввели не корректные данные');
            })
            .finally(() => {
                setSubmitting(false);
            });
    };

    const handleDelete = () => {
        axios.delete(`http://localhost:8000/api/animals/${animalId}/`)
            .then(response => {
                console.log('Animal deleted successfully:', response.data);
                navigate('/animals');
                // Можно добавить обновление состояния или другие действия после успешного удаления
            })
            .catch(error => {
                console.error('Error deleting animal:', error);
            });
    };



    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className='m-4'>
            <h2>Информация о животном</h2>
            <div>
                <p>Инвентарный номер: {animal.inventory_number}</p>
                <p>Кличка: {animal.nickname}</p>
                <p>Дата регистрации: {animal.date_arrival}</p>
                <p>Срок нахождения: {animal.is_in_months}</p>
                <p>Порода: {animal.breed_info}</p>
                <p>Пол: {animal.sex}</p>
                <p>Родитель: {animal.parent_info}</p>
                {/* Отобразите остальную информацию о животном */}
            </div>
            <hr />
            <h3>Обновить информацию</h3>
            <br />
            {successMessage && <div className="success-message">{successMessage}</div>}
            {errorMessage && <div className="error-message">{errorMessage}</div>}
            <Formik
                initialValues={animal}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting }) => (
                    <Form className="p-fluid">
                        <div className='my-3'>
                            <label htmlFor="inventory_number">Инвентарный номер</label>
                            <Field type="text" name="inventory_number" as={InputText} />
                            <ErrorMessage name="inventory_number" component="div" />
                        </div>
                        <div className='my-3'>
                            <label htmlFor="nickname">Кличка</label>
                            <Field type="text" name="nickname" as={InputText} />
                            <ErrorMessage name="nickname" component="div" />
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
                                    <Field className='mx-2' type="radio" name="sex" value="M" as={RadioButton} />
                                    Мужской
                                </label>
                                <label className='mx-2'>
                                    <Field className='mx-2' type="radio" name="sex" value="W" as={RadioButton} />
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


                        {/* Добавьте остальные поля животного */}
                        <Button className="p-button-primal " type="submit" disabled={isSubmitting}>
                            {isSubmitting ? 'Обновление...' : 'Обновить'}
                        </Button>
                        <br />
                        <br />

                        <Button type='button' label="Удалить" className="p-button-danger" onClick={() => setShowDeleteConfirmation(true)}></Button>
                        {showDeleteConfirmation && (
                            <div className="confirmation-dialog">
                                <p>Вы уверены, что хотите удалить этого животного?</p>
                                <Button type='button' label="Да" className="p-button-danger" onClick={handleDelete} />
                                <Button label="Отмена" className="p-button-secondary" onClick={() => setShowDeleteConfirmation(false)} /> </div>
                        )}

                    </Form>
                )}
            </Formik>

        </div>
    );
}
