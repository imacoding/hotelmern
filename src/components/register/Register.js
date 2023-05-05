import React, { useState } from 'react';
import RegisterForm from './RegisterForm';
import * as actions from '../../actions';
import { useNavigate, Navigate } from 'react-router-dom';

function Register() {
  const [errors, setErrors] = useState([]);
  const [redirect, setRedirect] = useState(false);
  const navigate = useNavigate();

  const registerUser = (userData) => {
    actions.register(userData)
      .then(() => {
        setRedirect(true);
      })
      .catch((errors) => {
        setErrors(errors);
      });
  };

  if (redirect) {
    return <Navigate to="/login" state={{ successRegistered: true }} />;
  }

  return (
    <section id='register'>
      <div className='bwm-form'>
        <div className='row'>
          <div className='col-md-5'>
            <h1>Register</h1>
            <RegisterForm submitCb={registerUser} errors={errors} />
          </div>
          <div className='col-md-6 ml-auto'>
            <div className='image-container'>
              <h2 className='catchphrase'>
                As our member you have access to most awesome places in the world.
              </h2>
              <img src={process.env.PUBLIC_URL + '/img/register-image.jpg'} alt='' />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Register;
