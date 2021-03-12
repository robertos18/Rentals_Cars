import { useEffect, useState } from "react";
import moment from 'moment';
import { Link } from 'react-router-dom';

const BestCar = (props) => {
  const [time, setTime] = useState('');

  const car = props.getCar();
  const endTime = moment().add(23, 'minutes').add(34, 'seconds');
  let interval = null;


  useEffect(() => {
    interval = setInterval(() => {
      const leftTime = -moment().diff(endTime) / 1000;
      const minutes = Math.floor(leftTime / 60);
      const seconds = Math.floor(leftTime % 60);
      setTime(`minut: ${minutes}, sekund: ${seconds}`);
    }, 1000);

    return () => {
      clearInterval(interval);
    }
  }, []);

  return (
    <div className="card bg-success text-white">
      <div className="card-header">
        Najlepsza oferta!
      </div>
      <div className="card-body">
        <div className="d-flex justify-content-between">
          <h5 className="card-title">{car.name}</h5>
          <p>Ocena: {car.rating}</p>
        </div>
        <p>Do końca oferty pozostało: {time}</p>
        <Link to={`/samochody/${car.id}`} className="btn btn-sm btn-light">
          Pokaż
        </Link>
      </div>
    </div>
  );
}

export default BestCar;