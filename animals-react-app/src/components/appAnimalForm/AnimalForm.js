import {useEffect, useState} from "react";
import {Button, Form, FormGroup, Input, Label} from "reactstrap";
import axios from "axios";
import {API_URL} from "../../index";

const AnimalForm = (props) => {
    const [animal, setAnimal] = useState({})

    const onChange = (e) => {
        const newState = animal
        if (e.target.name === "file") {
            newState[e.target.name] = e.target.files[0]
        } else newState[e.target.name] = e.target.value
        setAnimal(newState)
    }

    useEffect(() => {
        if (!props.animal) {
            setAnimal(animal => props.animal)
        }
        // eslint-disable-next-line
    }, [props.animal])

    const defaultIfEmpty = value => {
        return value === "" ? "" : value;
    }

    const submitDataEdit = async (e) => {
        e.preventDefault();
        // eslint-disable-next-line
        const result = await axios.put(API_URL + animal.id, animal, {headers: {'Content-Type': 'multipart/form-data'}})
            .then(() => {
                props.resetState()
                props.toggle()
            })
    }
    const submitDataAdd = async (e) => {
        e.preventDefault();
        const data = {
            name: animal['nickname'],
            email: animal['breed_info'],
            document: animal['date_arrival'],
            phone: animal['parent_info'],
        }
        // eslint-disable-next-line
        const result = await axios.post(API_URL, data, {headers: {'Content-Type': 'multipart/form-data'}})
            .then(() => {
                props.resetState()
                props.toggle()
            })
    }
    return (
        <Form onSubmit={props.newAnimal ? submitDataAdd : submitDataEdit}>
            <FormGroup>
                <Label for="name">Кличка</Label>
                <Input
                    type="text"
                    name="name"
                    onChange={onChange}
                    defaultValue={defaultIfEmpty(animal.nickname)}
                />
            </FormGroup>
            <FormGroup>
                <Label for="email">Порода</Label>
                <Input
                    type="text"
                    name="email"
                    onChange={onChange}
                    defaultValue={defaultIfEmpty(animal.breed_info)}
                />
            </FormGroup>
            <FormGroup>
                <Label for="document">Дата регистрации</Label>
                <Input
                    type="text"
                    name="document"
                    onChange={onChange}
                    defaultValue={defaultIfEmpty(animal.date_arrival)}
                />
            </FormGroup>
            <FormGroup>
                <Label for="phone">Родитель</Label>
                <Input
                    type="text"
                    name="phone"
                    onChange={onChange}
                    defaultValue={defaultIfEmpty(animal.parent_info)}
                />
            </FormGroup>
            <div style={{display: "flex", justifyContent: "space-between"}}>
                <Button>Send</Button> <Button onClick={props.toggle}>Cancel</Button>
            </div>
        </Form>
    )
}

export default AnimalForm;