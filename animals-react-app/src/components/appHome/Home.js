import {Container, Row, Col} from "reactstrap";
import ListAnimals from "../appListAnimals/ListAnimals";
import axios from "axios";
import {useEffect, useState} from "react";
import ModalAnimal from "../appModalAnimal/ModalAnimal";
import {API_URL} from "../../index";

const Home = () => {
    const [animals, setAnimals] = useState([])

    useEffect(()=>{
        getAnimals()
    },[])

    const getAnimals = (data)=>{
        axios.get(API_URL).then(data => setAnimals(data.data))
    }

    const resetState = () => {
        getAnimals();
    };

    return (
        <Container style={{marginTop: "20px"}}>
            <Row>
                <Col>
                    <ListAnimals animals={animals} resetState={resetState} newAnimal={false}/>
                </Col>
            </Row>
            <Row>
                <Col>
                    <ModalAnimal
                    create={true}
                    resetState={resetState}
                    newAnimal={true}/>
                </Col>
            </Row>
        </Container>
    )
}

export default Home;