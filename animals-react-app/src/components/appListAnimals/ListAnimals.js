import {Table} from "reactstrap";
import ModalAnimal from "../appModalAnimal/ModalAnimal";
import AppRemoveAnimal from "../appRemoveAnimal/appRemoveAnimal";


const ListAnimals = (props) => {
    const {animals} = props
    return (
        <Table dark>
            <thead>
            <tr>
                <th>Кличка</th>
                <th>Порода</th>
                <th>Дата регистрации</th>
                <th>Время нахождения</th>
                <th>Родитель</th>
                <th>Операции</th>
            </tr>
            </thead>
            <tbody>
            {!animals || animals.length <= 0 ? (
                <tr>
                    <td colSpan="6" align="center">
                        <b>Пока ничего нет</b>
                    </td>
                </tr>
            ) : animals.map(animal => (
                    <tr key={animal.id}>
                        <td>{animal.nickname}</td>
                        <td>{animal.breed_info}</td>
                        <td>{animal.date_arrival}</td>
                        <td>{animal.is_in_months}</td>
                        <td>{animal.parent_info}</td>
                        <td>
                            <ModalAnimal
                                create={false}
                                animal={animal}
                                resetState={props.resetState}
                                newAnimal={props.newAnimal}
                            />
                            &nbsp;&nbsp;
                            <AppRemoveAnimal
                                pk={animal.pk}
                                resetState={props.resetState}
                            />
                        </td>
                    </tr>
                )
            )}
            </tbody>
        </Table>
    )
}

export default ListAnimals