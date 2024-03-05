import React, { useState, useEffect } from 'react';
import { Menubar } from 'primereact/menubar';
import axios from 'axios';
import { PrimeIcons } from 'primereact/api';

export default function Navbar() {
    const [menuItems, setMenuItems] = useState([]);

    const items = [
        {
            label: 'Список всех Животных',
            icon: 'pi-list',
            command: () => { window.location = `/animals`; }
        },
        {
            label: 'Взвешивания животных',
            icon: 'pi-list',
            command: () => { window.location = `/weightings`; }
        },
        {
            label: 'Добавить животное',
            icon: PrimeIcons.PLUS,
            command: () => { window.location = `/animals/add`; }
        },
    ]
    useEffect(() => {
        axios.get('http://localhost:8000/api/breed/')
            .then(response => {
                const types = {};
                response.data.forEach(breed => {
                    if (!types[breed.type_info]) {
                        types[breed.type_info] = [];
                    }
                    types[breed.type_info].push({
                        label: breed.name,
                        command: () => { window.location = `/animals/breed/${breed.id}`; }
                    });
                });

                const newMenuItems = Object.keys(types).map(type => ({
                    label: type,
                    items: types[type]
                }));
                setMenuItems(newMenuItems);
            })
            .catch(error => {
                console.error('Error fetching animals:', error);
            });
    }, []);

    return (
        <div className="card">
            <Menubar model={items} />
            <Menubar model={menuItems} />
        </div>
    );
}
