import React from 'react';
import PropTypes from 'prop-types';
import Car from './Car/Car';
import styles from './Cars.module.css';

const propTypes = {
  cars: PropTypes.array.isRequired,
}
function Cars(props) {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Oferty:</h2>
      {props.cars.map(car => (
        <Car
          onOpen={props.onOpen}
          key={car.id} {...car} />
      ))}
    </div>
  );
}

Cars.propTypes = propTypes;

const areEqual = (prevProps, nextProps) => {
  return prevProps.cars === nextProps.cars;
}

export default React.memo(Cars, areEqual);