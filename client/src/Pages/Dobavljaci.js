import './Dobavljaci.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

function Dobavljaci() {
    const [dobavljaci, setDobavljaci] = useState([]);
    const [showEditForm, setShowEditForm] = useState(false);
    const [selectedSupplier, setSelectedSupplier] = useState({});

    useEffect(() => {
        axios
            .get('http://localhost:8800/dobavljaci')
            .then((response) => {
                setDobavljaci(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    const handleEdit = (dobavljac) => {
        setSelectedSupplier(dobavljac);
        setShowEditForm(true);
      };      
    

    const handleUpdate = (e) => {
        e.preventDefault();
        axios
            .put(`/dobavljaci/${selectedSupplier.id}`, {
                id: e.target.id.value,
                naziv: e.target.naziv.value,
                jib: e.target.jib.value,
                pdv: e.target.pdv.value,
                broj_telefona: e.target.broj_telefona.value,
                kontakt_osoba: e.target.kontakt_osoba.value,
                email_adresa: e.target.email_adresa.value,
                datum_pocetka: e.target.datum_pocetka.value,
                datum_zavrsetka: e.target.datum_zavrsetka.value,
            })
            .then((res) => {
                console.log(res);
                setShowEditForm(false);
                axios.get("/dobavljaci").then((res) => {
                    setDobavljaci(res.data);
                });
            })
            .catch((err) => console.log(err));
    };

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Naziv</th>
                        <th>JIB</th>
                        <th>PDV</th>
                        <th>Broj telefona</th>
                        <th>Kontakt osoba</th>
                        <th>Email adresa</th>
                        <th>Datum početka</th>
                        <th>Datum završetka</th>
                        <th>Edit</th>
                    </tr>
                </thead>
                <tbody>
                    {dobavljaci.map((dobavljac) => (
                        <tr key={dobavljac.id}>
                            <td>{dobavljac.naziv}</td>
                            <td>{dobavljac.jib}</td>
                            <td>{dobavljac.pdv}</td>
                            <td>{dobavljac.broj_telefona}</td>
                            <td>{dobavljac.kontakt_osoba}</td>
                            <td>{dobavljac.email_adresa}</td>
                            <td>{dobavljac.datum_pocetka}</td>
                            <td>{dobavljac.datum_zavrsetka}</td>
                            <td>
                            <button onClick={() => handleEdit(dobavljac.id)}>Edit</button> 
                            {showEditForm && (
                                    <form onSubmit={handleUpdate}>
                                        <label>
                                            Naziv:
                                            <input
                                                type="text"
                                                name="naziv"
                                                defaultValue={selectedSupplier.naziv}
                                            />
                                        </label>
                                        <br />
                                        <label>
                                            JIB:
                                            <input
                                                type="text"
                                                name="jib"
                                                defaultValue={selectedSupplier.jib}
                                            />
                                        </label>
                                        <br />
                                        <label>
                                            PDV:
                                            <input
                                                type="text"
                                                name="pdv"
                                                defaultValue={selectedSupplier.pdv}
                                            />
                                        </label>
                                        <br />
                                        <label>
                                            Broj telefona:
                                            <input
                                                type="text"
                                                name="broj_telefona"
                                                defaultValue={selectedSupplier.broj_telefona}
                                            />
                                        </label>
                                        <br />
                                        <label>
                                            Kontakt osoba:
                                            <input
                                                type="text"
                                                name="kontakt_osoba"
                                                defaultValue={selectedSupplier.kontakt_osoba}
                                            />
                                        </label>
                                        <br />
                                        <label>
                                            Email adresa:
                                            <input
                                                type="text"
                                                name="email_adresa"
                                                defaultValue={selectedSupplier.email_adresa}
                                            />
                                        </label>
                                        <br />
                                        <label>
                                            Datum početka:
                                            <input
                                                type="text"
                                                name="datum_pocetka"
                                                defaultValue={selectedSupplier.datum_pocetka}
                                            />
                                        </label>
                                        <br />
                                        <label>
                                            Datum završetka:
                                            <input
                                                type="text"
                                                name="datum_zavrsetka"
                                                defaultValue={selectedSupplier.datum_zavrsetka}
                                            />
                                        </label>
                                        <br />
                                        <input type="submit" value="Update" />
                                    </form>
                                )}

                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Dobavljaci;