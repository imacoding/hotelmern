import React, { useState } from 'react';
import RentalCreateForm from './RentalCreateForm';
import * as actions from '../../../actions';
import { useNavigate } from 'react-router-dom';

function RentalCreate() {
  const [errors, setErrors] = useState({});
  const [redirect, setRedirect] = useState(false);
  const rentalCategories = ['apartment', 'house', 'condo'];
  const navigate = useNavigate();

  function createRental(rentalData) {
    actions.createRental(rentalData)
      .then(
        (rental) => {
          setRedirect(true);
        },
        (errors) => {
          setErrors(errors);
        }
      )
  }

  if (redirect) {
    navigate('/rentals');
  }

  return (
    <section id='newRental'>
      <div className='bwm-form'>
        <div className='row'>
          <div className='col-md-5'>
            <h1 className='page-title'>Create Rental</h1>
            <RentalCreateForm submitCb={createRental} options={rentalCategories} errors={errors} />
          </div>
          <div className='col-md-6 ml-auto'>
            <div className='image-container'>
              <h2 className='catchphrase'>Hundreds of awesome places in reach of few clicks.</h2>
              <img src={process.env.PUBLIC_URL + '/img/create-rental.jpg'} alt='' />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default RentalCreate;
