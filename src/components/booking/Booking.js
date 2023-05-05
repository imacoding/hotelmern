import React from 'react';
import { useState, useEffect, useRef } from 'react';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import { getRangeOfDates } from '../../helpers';
import BookingModal from './BookingModal';
import moment from 'moment';
import * as actions from '../../actions';
import { ToastContainer, toast } from 'react-toastify';
import { connect } from 'react-redux';
import { NavLink, Link } from 'react-router-dom';

const Booking = (props) => {
  const [errors, setErrors] = useState([]);
  const [proposedBooking, setProposedBooking] = useState({
    startAt: '',
    endAt: '',
    guests: '',
  });
  const [modal, setModal] = useState({
    open: false,
  });
  const rental = props.rental;
  const bookedOutDates = useRef([]);
  const dateRef = useRef();

  useEffect(() => {
    getBookedOutDates();
  }, []);

  const getBookedOutDates = () => {
    const { bookings } = rental;
    if (bookings && bookings.length > 0) {
      bookings.forEach((booking) => {
        const dateRange = getRangeOfDates(
          booking.startAt,
          booking.endAt,
          'Y/MM/DD'
        );
        bookedOutDates.current.push(...dateRange);
      });
    }
  };

  const checkInvalidDates = (date) => {
    return (
      bookedOutDates.current.includes(date.format('Y/MM/DD')) ||
      date.diff(moment(), 'days') < 0
    );
  };

  const handleApply = (event, picker) => {
    const startAt = picker.startDate.format('Y/MM/DD');
    const endAt = picker.endDate.format('Y/MM/DD');
    dateRef.current.value = startAt + ' to ' + endAt;
    setProposedBooking({
      ...proposedBooking,
      startAt,
      endAt,
    });
  };

  const addNewBookedOutDates = (booking) => {
    const dateRange = getRangeOfDates(booking.startAt, booking.endAt);
    bookedOutDates.current.push(...dateRange);
  };

  const resetData = () => {
    dateRef.current.value = '';
    setProposedBooking({
      guests: '',
    });
  };

  const selectGuests = (event) => {
    setProposedBooking({
      ...proposedBooking,
      guests: parseInt(event.target.value, 10),
    });
  };

  const confirmProposedData = () => {
    const { startAt, endAt } = proposedBooking;
    const days = getRangeOfDates(startAt, endAt).length - 1;
    setProposedBooking({
      ...proposedBooking,
      days,
      totalPrice: days * rental.dailyRate,
      rental,
    });
    setModal({
      open: true,
    });
  };

  const cancelConfirmation = () => {
    setModal({
      open: false,
    });
  };

  const reserveRental = () => {
    actions.createBooking(proposedBooking).then(
      (booking) => {
        addNewBookedOutDates(booking);
        cancelConfirmation();
        resetData();
        toast.success('Booking has been successfully created! Enjoy!!');
      },
      (errors) => {
        setErrors(errors);
      }
    );
  };

  const { isAuth } = props.auth;

  const { startAt, endAt, guests } = proposedBooking;
        return (
            <div className='booking'>
            <ToastContainer />
                <h3 className='booking-price'>${rental.dailyRate} <span className='booking-per-night'>per night</span></h3>
                <hr></hr>
                { !isAuth &&
                    <Link className='btn btn-bwm btn-confirm btn-block' to={{pathname: '/login'}}>Login to book place!</Link>

                }
                { isAuth &&
                <React.Fragment>
                <div className='form-group'>
  <label htmlFor='dates'>Dates</label>
  <DateRangePicker
    onApply={handleApply}
    isInvalidDate={checkInvalidDates}
    opens='left'
    containerStyles={{ display: 'block' }}
  >
    <input ref={dateRef} id='dates' type='text' className='form-control'></input>
  </DateRangePicker>
</div>

                <div className='form-group'>
                    <label htmlFor='guests'>Guests</label>
                    <input value={guests} onChange={(event) => { selectGuests(event) }} type='number' className='form-control' id='guests' aria-describedby='emailHelp' placeholder=''></input>
                </div>
                <button disabled={!startAt || !endAt || !guests} onClick={() => { confirmProposedData() }} className='btn btn-bwm btn-confirm btn-block'>Reserve place now</button>
                </React.Fragment>
                }
                <hr></hr>
                
                <p className='booking-note-title'>People are interested into this house</p>
                <p className='booking-note-text'>
                    More than 500 people checked this rental in last month.
                </p>
                <BookingModal open={modal.open} closeModal={cancelConfirmation} booking={proposedBooking} confirmModal={reserveRental} errors={errors}
                rentalPrice={rental.dailyRate}/>
            </div>
        )
    
}

function mapStateToProps(state){
    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps)(Booking)
