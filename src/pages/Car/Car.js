import { useEffect, useState } from "react";
import { useParams, useHistory } from 'react-router-dom';
import LoadingIcon from "../../components/UI/LoadingIcon/LoadingIcon";
import useWebsiteTitle from "../../hooks/useWebsiteTitle";
import axios from '../../axios';
import carImg from '../../assets/images/car.jpg';
import useAuth from "../../hooks/useAuth";

function Car(props) {
  const history = useHistory();
  const [auth] = useAuth();
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [rating, setRating] = useState(5);

  const setTitle = useWebsiteTitle();

  const fetchCar = async () => {
    try {
      const res = await axios.get(`/cars/${id}.json`);
      setCar(res.data);
      setTitle('Samochód - ' + res.data.name);
    } catch (ex) {
      console.log(ex.response);
    }
    setLoading(false);
  }

  const rateCar = async () => {
    try {
      await axios.put(`/cars/${id}/rating.json?auth=${auth.token}`, rating);
      history.push('/');
    } catch (ex) {
      console.log(ex.response);
    }
  }

  useEffect(() => {
    fetchCar();
  }, []);

  return loading ? <LoadingIcon /> : (
    <div className="card">
      <div className="card-header">
        <h1>Samochód: {car.name}</h1>
      </div>
      <div className="card-body">
        <img
          src={carImg}
          alt=""
          className="img-fluid img-thumbnail mb-4" />

        <p>Miejscowość: <b>{car.city}</b></p>
        <p>Ilość drzwi: <b>{car.doors}</b></p>
        <p className="lead">{car.description}</p>
        <p>Wyposażenie:</p>
        <ul>
          {car.features.map(item =>
            <li key={item}>{item}</li>
          )}
        </ul>
        {auth ? <h4>Ocena: {props.rating}</h4> : <h4>Ocena: {props.rating} Zaloguj się by ocenić</h4>}
      </div>
      <div className="card-footer">
        {auth ? (
          <div className="form-group row mt-4">
            <div className="col">
              <select
                value={rating}
                onChange={e => setRating(e.target.value)}
                className="form-control form-select-lg mb-3">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </div>
            <div className="col">
              <button className="btn btn-info" onClick={rateCar}>Oceń</button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default Car;