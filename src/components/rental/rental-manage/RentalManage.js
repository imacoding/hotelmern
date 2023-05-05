import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { RentalManageCard } from './RentalManageCard';
import RentalManageModal from './RentalManageModal';
import { ToastContainer, toast } from 'react-toastify';
import { getUserRentals, deleteRental } from '../../../actions';

export default function RentalManage() {
  const [userRentals, setUserRentals] = useState([]);
  const [errors, setErrors] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    setIsFetching(true);

    getUserRentals()
      .then((userRentals) => {
        setUserRentals(userRentals);
        console.log(userRentals);
        setIsFetching(false);
      })
      .catch((errors) => {
        setErrors(errors);
        setIsFetching(false);
      });
  }, []);

  const renderRentalCard = (rentals) => {
    return rentals.map((rental, index) => {
      return (
        <RentalManageCard
          modal={<RentalManageModal bookings={rental.bookings} />}
          rental={rental}
          key={index}
          rentalIndex={index}
          deleteRentalCb={deleteRentalFromList}
        />
      );
    });
  };

  const deleteRentalFromList = (rentalIndex) => {
    const updatedRentals = userRentals.filter((rental, index) => index !== rentalIndex);

    setUserRentals(updatedRentals);
  };

  const handleDeleteRental = (rentalId, rentalIndex) => {
    deleteRental(rentalId)
      .then(() => {
        deleteRentalFromList(rentalIndex);
      })
      .catch((errors) => {
        toast.error(errors[0].detail);
      });
  };

  return (
    <section id='userRentals'>
      <ToastContainer />
      <h1 className='page-title'>My Rentals</h1>
      <div className='row'>{renderRentalCard(userRentals)}</div>
      {!isFetching && userRentals.length === 0 && (
        <div className='alert alert-warning'>
          You don't have any rentals currently created. If you want to advertise your property, please follow this link.{' '}
          <Link style={{ marginLeft: '10px' }} className='btn btn-bwm' to='/rentals/new'>
            Register Rental
          </Link>
        </div>
      )}
    </section>
  );
}
