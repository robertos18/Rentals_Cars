import axios from '../../../../axios';
import { useHistory } from 'react-router-dom';
import CarForm from '../CarForm';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useAuth from '../../../../hooks/useAuth';

const EditCar = props => {
  const [auth] = useAuth();
  const { id } = useParams();
  const history = useHistory();
  const [car, setCar] = useState(null);

  const submit = async form => {
    await axios.patch(`/cars/${id}.json?auth=${auth.token}`, form);
    history.push('/profil/samochody');
  }

  const fetchCar = async () => {
    const res = await axios.get(`/cars/${id}.json`);
    const carData = res.data;

    delete (carData.user_id);
    delete (carData.rating);

    setCar(carData);
  }

  useEffect(() => {
    fetchCar();
  }, []);

  return (
    <div className="card">
      <div className="card-header">Edytuj samochód</div>
      <div className="card-body">

        <p className="text-muted">Uzupełnij dane samochodu</p>

        <CarForm
          car={car}
          buttonText="Zapisz!"
          onSubmit={submit} />

      </div>
    </div>
  );
}

export default EditCar;