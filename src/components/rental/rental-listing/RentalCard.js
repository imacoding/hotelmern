import React from 'react';
import { Link } from 'react-router-dom';
import { rentalType } from '../../../helpers';

export default function RentalCard(props) {
const rental = props.rental;
return (
<div className={props.colNum}>
<div className='rental-detail-link'>
<Link to={/rentals/ + rental._id}>
<div className='card bwm-card'>
<img className='card-img-top' src={rental.image} alt={rental.title} />
<div className='card-block'>
<h6 className={`card-subtitle ${rental.category}`}>
{rentalType(rental.shared)} {rental.category} · {rental.city}
</h6>
<h4 className='card-title'>{rental.title}</h4>
<p className='card-text'>
 <p>$1000</p>
 <span>${rental.dailyRate} </span>per Night · Free Cancelation
</p>
</div>
</div>
</Link>
</div>
</div>
);
}