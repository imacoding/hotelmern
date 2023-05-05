import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const RentalSearchInput = () => {
    const [city, setCity] = useState('');
    const searchInputRef = useRef(null);
    const navigate = useNavigate();

    const handleSearch = () => {
        city ? navigate(`/rentals/${city}/homes`) : navigate('/rentals');
    }

    const handleKeyPress = (event) => {
        if(event.key === 'Enter'){
            handleSearch();
        }
    }

    return (
        <div className='form-inline my-2 my-lg-0'>
            <input className='form-control mr-sm-2 bwm-search' 
                   type='search' 
                   placeholder='Try "New York"' 
                   aria-label='Search'
                   ref={searchInputRef}
                   value={city}
                   onChange={(e) => setCity(e.target.value)}
                   onKeyPress={(event) => {handleKeyPress(event)}}
            />
            <button onClick={() => {handleSearch()}} className='btn btn-outline-success my-2 my-sm-0 btn-bwm-search' type='submit'>Search</button>
        </div>
    )
}

export default RentalSearchInput;
