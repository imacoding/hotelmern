import React from 'react';
import { Link } from 'react-router-dom';
import RentalCard from './RentalCard';

export function RentalList(props) {

    const renderRentals = () => {
        return props.rentals.map((rental, index) => {
            return (
                <div className='col-md-3 col-xs-6' key={index}>
                    <Link className='rental-detail-link' to={`/rentals/${rental._id}`}>
                        <RentalCard rental={rental} />
                    </Link>
                </div>
            );
        });
    }

    return (
        <div className='row'>
            {renderRentals()}
        </div>
    );
}
