import { Link } from 'react-router-dom';

function LastCar(props) {

  return (
    <div className="card mb-2 bg-light">
      <div className="card-header">
        Ostatnio oglądałeś ten samochód. Wciąż zainteresowany?
      </div>
      <div className="card-body">
        <div className="d-flex justify-content-between">
          <h5 className="card-title">{props.name}</h5>
          <span className="badge badge-light">{props.city}</span>
        </div>
        <div
          style={{ width: '100px' }}
          className="ml-auto d-flex justify-content-between">
          <Link to={`/samochody/${props.id}`} className="btn btn-sm btn-dark">
            Tak!
          </Link>
          <button onClick={props.onRemove} className="btn btn-sm btn-dark">
            Nie
          </button>
        </div>
      </div>
    </div>
  );
}

export default LastCar;