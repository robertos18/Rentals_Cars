import PropTypes from 'prop-types';
import styles from './Car.module.css';
import carImg from '../../../assets/images/car.jpg';
import ThemeContext from '../../../context/themeContext';
import { useContext } from 'react';
import useAuth from '../../../hooks/useAuth';
import { Link } from 'react-router-dom';


const propTypes = {
  name: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
  rating: PropTypes.number,
  description: PropTypes.string.isRequired
};

function Car(props) {
  const theme = useContext(ThemeContext);
  const [auth] = useAuth();

  const clickHandler = e => {
    if (props.onOpen) {
      props.onOpen(props);
    }
  }

  return (
    <div className={`card ${styles.car}`}>
      <div className="card-body">

        <div className="row">
          <div className="col-4">
            <img
              src={carImg}
              alt=""
              className="img-fluid img-thumbnail" />
          </div>
          <div className="col-8">
            <div className="row">
              <div className="col">
                <p className={styles.title}>{props.name}</p>
                <span className="badge badge-light">{props.city}</span>
              </div>
              <div className="col text-right">
                <h5>Ocena: {props.rating ?? <p>brak oceny</p>}</h5>
                <Link
                  onClick={clickHandler}
                  to={`/samochody/${props.id}`}
                  className={`btn btn-${theme.color} mt-2 px-4`}>
                  Pokaż
                  </Link>
              </div>
            </div>
          </div>

          <div className="col-12">
            <p className={styles.description}>
              {props.description}
            </p>

            {auth
              ? <p className="mt-2">Liczba drzwi: {props.doors}</p>
              : <p className="mt-2">Dostępność: zaloguj</p>
            }

          </div>
        </div>

      </div>
    </div>
  );
}

Car.propTypes = propTypes;

export default Car;