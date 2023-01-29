import { useEffect, useState } from 'react';
import axios from 'axios';

function Sirovine() {
    const [sirovine, setSirovine] = useState([]);

    useEffect(() => {
        axios
            .get('http://localhost:8800/sirovine')
            .then((response) => {
                setSirovine(response.data);
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
                        <th>Količina</th>
                        <th>Minimalna količina</th>
                        <th>Cijena</th>
                        <th>Jedinica mjere</th>
                        <th>Da li se koristi</th>
                        <th>Dobavljac</th>
                        <th>Edit</th>
                    </tr>
                </thead>
                <tbody>
                    {sirovine.map((sirovina) => (
                        <tr key={sirovina.id}>
                            <td>{sirovina.naziv}</td>
                            <td>{sirovina.kolicina}</td>
                            <td>{sirovina.min_kolicina}</td>
                            <td>{sirovina.cijena}</td>
                            <td>{sirovina.jedinica_mjere}</td>
                            <td>{sirovina.da_li_se_koristi}</td>
                            <td>{sirovina.dobavljac_id}</td>
                            </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Sirovine;