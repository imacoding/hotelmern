import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { RentalDetailInfo } from './RentalDetailInfo';
import RentalMap from './RentalMap';
import { connect } from 'react-redux';
import * as actions from '../../../actions';
import Booking from '../../booking/Booking';

function RentalDetail(props) {
const { id } = useParams();

useEffect(() => {
props.dispatch(actions.fetchRentalById(id));
}, [props.dispatch, id]);

const rental = props.rental;

if (!rental) {
return <h1>Loading...</h1>;
}

  return (
  

    <section id='rentalDetails'>
      <div className='upper-section'>
        <div className='row'>
          <div className='col-md-12'>
            <img src={rental.image} alt='' />
          </div>
        
        </div>
     
      </div>

      <div className='details-section'>
        <div className='row'>
          <div className='col-md-8'>
            <RentalDetailInfo rental={rental} />
          </div>
          <div className='col-md-4'>
            <Booking rental={rental} />
          </div>
        </div>
      </div>


            <RentalMap location={`${rental.city}, ${rental.street}`}/>
       
    </section>
     
            
 
        
   
  );
}

function mapStateToProps(state) {
return {
rental: state.rental.data,
};
}

export default connect(mapStateToProps)(RentalDetail);