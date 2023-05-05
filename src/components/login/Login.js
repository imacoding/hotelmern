import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { Navigate, useLocation } from 'react-router-dom';

import LoginForm from './LoginForm';

function Login(props) {
  const { isAuth, errors } = props.auth;
  const location = useLocation();
  const successRegistered = location.state?.successRegistered || false;

  function loginUser(userData) {
    props.dispatch(actions.login(userData));
  }


    if (isAuth) {
      return <Navigate to="/rentals" />;
    }

  return (
    <section id="login">
      <div className="bwm-form">
        <div className="row">
          <div className="col-md-5">
            <h1>Login</h1>
            {successRegistered && (
              <div className="alert alert-success">
                <p>You have been successfully registered. Please login now.</p>
              </div>
            )}
            <LoginForm submitCb={loginUser} errors={errors} />
          </div>
          <div className="col-md-6 ml-auto">
            <div className="image-container">
              <h2 className="catchphrase">Hundreds of awesome places in reach of few clicks.</h2>
              <img src={process.env.PUBLIC_URL + '/img/login-image.jpg'} alt="" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


const mapStateToProps = (state) => ({
  auth: state.auth
});



export default connect(mapStateToProps)(Login);
