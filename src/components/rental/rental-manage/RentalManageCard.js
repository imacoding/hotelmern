import React from 'react';
import { pretifyDate, toUpperCase } from '../../../helpers';
import { Link } from 'react-router-dom';

export function RentalManageCard(props) {
	const [wantDelete, setWantDelete] = React.useState(false);

const showDeleteMenu = () => {
    setWantDelete(true);
}

const closeDeleteMenu = () => {
    setWantDelete(false);
}

const deleteRental = (rentalId, rentalIndex) => {
    setWantDelete(false);
    props.deleteRentalCb(rentalId, rentalIndex);
}

const {rental, modal, rentalIndex} = props;
const deleteClass = wantDelete? 'toBeDeleted' : '';
return (
    <div className='col-md-4'>
        <div className={`card text-center ${deleteClass}`}>
            <div className='card-block'>
                <h4 className='card-title'>{rental.title} - {toUpperCase(rental.city)}</h4>
                <Link className='btn btn-bwm' to={`/rentals/${rental._id}`}>Go to Rental</Link>
                { rental.bookings && rental.bookings.length > 0 && modal}
            </div>
            <div className='card-footer text-muted'>
                Created at {pretifyDate(rental.createdAt)} 
                { !wantDelete &&
                <button onClick={()=>{showDeleteMenu()}} className='btn btn-danger'>Delete</button>
                }
                { wantDelete &&
                    <div className='delete-menu'>
                    Do you confirm?
                    <button onClick={()=>{deleteRental(rental._id, rentalIndex)}} className='btn btn-danger'>Yes</button>
                    <button onClick={()=>{closeDeleteMenu()}}className='btn btn-success'>No</button>
                    </div>
                }
            </div>
        </div>
    </div>
)
}