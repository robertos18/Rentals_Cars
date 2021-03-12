import { useEffect, useState } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import axios from '../../../axios';
import { objectToArrayWithId } from '../../../helpers/objects';
import useAuth from '../../../hooks/useAuth';

export default function MyCars(props) {
  const [auth] = useAuth();
  const { url } = useRouteMatch();
  const [cars, setCars] = useState([]);

  const fetchCars = async () => {
    try {
      const res = await axios.get('/cars.json');
      console.log(res)
      const newCar = objectToArrayWithId(res.data)
        .filter(car => car.user_id === auth.userId);
      setCars(newCar);
    } catch (ex) {
      console.log(ex.response);
    }
  }

  const deleteHandler = async id => {
    try {
      await axios.delete(`/cars/${id}.json`);
      setCars(cars.filter(x => x.id !== id));
    } catch (ex) {
      console.log(ex.response);
    }
  }

  useEffect(() => {
    fetchCars();
  }, []);

  return (
    <div>
      {cars ? (
        <table className="table">
          <thead>
            <th>Nazwa</th>
            <th>Status</th>
            <th>Opcje</th>
          </thead>
          <tbody>
            {cars.map(car => (
              <tr key={car.id}>
                <td>{car.name}</td>
                <td>
                  {car.status == 1
                    ? <span className="badge bg-success text-light">aktywny</span>
                    : <span className="badge bg-secondary text-light">ukryty</span>
                  }
                </td>
                <td>
                  <Link to={`/profil/samochody/edytuj/${car.id}`} className="btn btn-warning">Edytuj</Link>
                  <button onClick={() => deleteHandler(car.id)} className="ml-2 btn btn-danger">Usuń</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Nie masz jeszcze żadnego samochodu.</p>
      )}
      <Link to={`${url}/dodaj`} className="btn btn-primary">Dodaj samochód</Link>
    </div>
  );
}