import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { objectToArrayWithId } from '../../helpers/objects';
import axios from '../../axios';
import { useState } from 'react';
import Cars from '../../components/Cars/Cars';

export default function Search(props) {
  const { term } = useParams();
  const [cars, setCars] = useState([]);

  const search = async () => {
    try {
      const res = await axios.get('/cars.json');
      const newCars = objectToArrayWithId(res.data)
        .filter(car => car.name.includes(term));
      setCars(newCars);
    } catch (ex) {
      console.log(ex.response);
    }
  }

  useEffect(() => {
    search();
  }, [term]);

  return (
    <div>
      <h2>Wyniki dla frazy "{term}":</h2>
      <Cars cars={cars} />
    </div>
  );
}