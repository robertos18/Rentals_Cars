import axios from '../../../../axios';
import { useHistory } from 'react-router-dom';
import CarForm from '../CarForm';
import useAuth from '../../../../hooks/useAuth';

const AddCar = props => {
  const [auth] = useAuth();
  const history = useHistory();

  const submit = async form => {
    await axios.post(`/cars.json?auth=${auth.token}`, form);
    history.push('/profil/samochody');
  }

  return (
    <div className="card">
      <div className="card-header">Dodaj samochód</div>
      <div className="card-body">

        <p className="text-muted">Uzupełnij dane samochodu</p>

        <CarForm
          buttonText="Dodaj!"
          onSubmit={submit} />

      </div>
    </div>
  );
}

export default AddCar;