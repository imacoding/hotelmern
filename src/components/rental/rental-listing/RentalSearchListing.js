import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { toUpperCase } from '../../../helpers';
import * as actions from '../../../actions';
import { RentalList } from './RentalList';
import { useParams } from 'react-router-dom';

function RentalSearchListing({ rentals, dispatch }) {
  const [searchedCity, setSearchedCity] = useState('');

  const { city } = useParams();

  useEffect(() => {
    setSearchedCity(city);
    dispatch(actions.fetchRentals(city));
  }, [city, dispatch]);

  const renderTitle = () => {
    const { errors, data } = rentals;
    let title = '';

    if (errors.length > 0) {
      title = errors[0].detail;
    }
    if (data.length > 0) {
      title = `Your Home in city of ${toUpperCase(searchedCity)}`;
    }

    return <h1 className='page-title'>{title}</h1>;
  };

  return (
    <section id='rentalListing'>
      {renderTitle()}
      <RentalList rentals={rentals.data} />
    </section>
  );
}

function mapStateToProps(state) {
  return {
    rentals: state.rentals,
  };
}

export default connect(mapStateToProps)(RentalSearchListing);
