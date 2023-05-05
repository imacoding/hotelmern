import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { Provider } from 'react-redux';

import Header from './components/shared/Header';
import RentalListing from './components/rental/rental-listing/RentalListing';
import RentalSearchListing from './components/rental/rental-listing/RentalSearchListing';
import RentalDetail from './components/rental/rental-detail/RentalDetail';
import RentalCreate from './components/rental/rental-create/RentalCreate';
import  RentalManage from './components/rental/rental-manage/RentalManage';
import BookingManage from './components/booking/booking-manage/BookingManage';
import Login from './components/login/Login';
import Register from './components/register/Register';
import * as actions from './actions';
import ProtectedRoute  from './components/shared/auth/ProtectedRoute';
import LoggedInRoute  from './components/shared/auth/LoggedInRoute';

import './App.scss';

const store = require('./reducers').init();

class App extends Component {
  componentWillMount() {
    store.dispatch(actions.checkAuthState());
  }

  logout() {
    store.dispatch(actions.logout());
  }

  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Header logout={this.logout} />

            <div className="container">
              <Routes>
                <Route path="/" element={<Navigate to="/rentals" />} />
                <Route path="/rentals" element={<RentalListing />} />
                <Route
                  path="/rentals/:city/homes"
                  element={<RentalSearchListing />}
                />
              
              <Route path="/rentals/manage" element={<ProtectedRoute />}>
          <Route  path="/rentals/manage" element={<RentalManage  />} />
        </Route>

        <Route path="/bookings/manage" element={<ProtectedRoute />}>
          <Route path="/bookings/manage" element={<BookingManage  />} />
        </Route>

        <Route path="/rentals/new" element={<ProtectedRoute />}>
          <Route path="/rentals/new" element={<RentalCreate  />} />
        </Route>

               

        

                <Route path="/rentals/:id" element={<RentalDetail />} />
                <Route path="/login" element={<Login />} />
                 <Route path="/register" element={<LoggedInRoute />}>
          <Route path="/register" element={<Register />} />
        </Route>

               
              
              </Routes>
            </div>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
