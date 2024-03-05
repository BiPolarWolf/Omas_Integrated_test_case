import {Fragment, useState} from "react";
import {Button, Modal, ModalHeader, ModalBody} from "reactstrap";
import AnimalForm from "../appAnimalForm/AnimalForm";

const ModalStudent = (props) => {
    const [visible, setVisible] = useState(false)
    var button = <Button onClick={() => toggle()}>Редактировать</Button>;

    const toggle = () => {
        setVisible(!visible)
    }

    if (props.create) {
        button = (
            <Button
                color="primary"
                className="float-right"
                onClick={() => toggle()}
                style={{minWidth: "200px"}}>
                Добавить студента
            </Button>
        )
    }
    return (
        <Fragment>
            {button}
            <Modal isOpen={visible} toggle={toggle}>
                <ModalHeader
                    style={{justifyContent: "center"}}>{props.create ? "Добавить Животное" : "Редактировать Животное"}</ModalHeader>
                <ModalBody>
                    <AnimalForm
                        animal={props.animal ? props.animal : []}
                        resetState={props.resetState}
                        toggle={toggle}
                        newAnimal={props.newAnimal}
                    />
                </ModalBody>
            </Modal>
        </Fragment>
    )
}
export default ModalStudent;