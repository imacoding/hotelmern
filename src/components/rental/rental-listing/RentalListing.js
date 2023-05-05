import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRentals } from '../../../actions';
import { RentalList } from './RentalList';

function RentalListing() {
  const dispatch = useDispatch();
  const rentals = useSelector(state => state.rentals.data);

  useEffect(() => {
    dispatch(fetchRentals());
  }, [dispatch]);

  return (
    <section id='rentalListing'>
      <h1 className='page-title'>Your Home All Around the World</h1>
      <RentalList rentals={rentals}/>
    </section>
  );
}

export default RentalListing;
