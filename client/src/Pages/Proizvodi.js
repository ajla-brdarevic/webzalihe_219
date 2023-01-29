import { useEffect, useState } from 'react';
import axios from 'axios';

function Proizvodi() {
    const [proizvodi, setProizvodi] = useState([]);

    useEffect(() => {
        axios
            .get('http://localhost:8800/proizvodi')
            .then((response) => {
                setProizvodi(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Naziv</th>
                        <th>Slika</th>
                        <th>Marža</th>
                        <th>Cijena</th>
                        <th>Proizvodni proces</th>
                        <th>Edit</th>
                    </tr>
                </thead>
                <tbody>
                    {proizvodi.map((proizvod) => (
                        <tr key={proizvod.id}>
                            <td>{proizvod.naziv}</td>
                            <td>{proizvod.slika}</td>
                            <td>{proizvod.marza}</td>
                            <td>{proizvod.cijena}</td>
                            <td>{proizvod.proizvodni_proces_id}</td>
                            </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Proizvodi;