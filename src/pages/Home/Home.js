import { useEffect, useState } from 'react';
import LastCar from '../../components/Cars/LastCar/LastCar';
import useStateStorage from '../../hooks/useStateStorage';
import useWebsiteTitle from '../../hooks/useWebsiteTitle';
import BestCar from '../../components/Cars/BestCar/BestCar';
import Cars from '../../components/Cars/Cars';
import LoadingIcon from '../../components/UI/LoadingIcon/LoadingIcon';
import axios from '../../axios';
import { objectToArrayWithId } from '../../helpers/objects';

export default function Home(props) {
  useWebsiteTitle('Strona główna');
  const [lastCar, setLastCar] = useStateStorage('last-car', null);

  const [loading, setLoading] = useState(true);
  const [cars, setCars] = useState([]);

  const getBestCar = () => {
    if (cars.length < 2) {
      return null;
    } else {
      return cars.sort((a, b) => a.rating > b.rating ? -1 : 1)[0];
    }
  }
  const openCar = (car) => setLastCar(car);
  const removeLastCar = () => setLastCar(null);
  const fetchCars = async () => {
    try {
      const res = await axios.get('/cars.json');
      const newCars = objectToArrayWithId(res.data)
        .filter(car => car.status == 1);
      setCars(newCars);
    } catch (ex) {
      console.log(ex.response);
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchCars();
  }, []);


  return loading ? <LoadingIcon /> : (
    <>
      {lastCar ? <LastCar {...lastCar} onRemove={removeLastCar} /> : null}
      {getBestCar()
        ? <BestCar getCar={getBestCar} />
        : null
      }
      <Cars onOpen={openCar} cars={cars} />
    </>
  );
}