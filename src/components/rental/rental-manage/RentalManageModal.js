import React from 'react';
import Modal from 'react-responsive-modal';
import { pretifyDate } from '../../../helpers';
import { useState } from 'react';

export default function RentalManageModal({bookings}) {
const [open, setOpen] = useState(false);
const openModal = () => setOpen(true);
const closeModal = () => setOpen(false);

const renderBookings = (bookings) => {
    return bookings.map((booking, index) => {
        return (
            <React.Fragment key={index}>
                <p><span>Date:</span> {pretifyDate(booking.startAt)} - {pretifyDate(booking.endAt)}</p>
                <p><span>Guests:</span> {booking.guests}</p>
                <p><span>Total Price:</span> ${booking.totalPrice}</p>
                { index + 1 !== bookings.length &&
                <hr></hr>
                }
            </React.Fragment>
        )
    })
}

return (
    <React.Fragment>
        <button type='button' onClick={openModal} className='btn btn-bwm'>Bookings</button>
        <Modal open={open} onClose={closeModal} little classNames={{ modal: 'rental-booking-modal' }}>
            <h4 className='modal-title title'>Made Bookings</h4>
            <div className='modal-body bookings-inner-container'>

                {renderBookings(bookings)}

            </div>
            <div className='modal-footer'>
                <button type='button' onClick={closeModal} className='btn btn-bwm'>Cancel</button>
            </div>
        </Modal>
    </React.Fragment>
)
}

