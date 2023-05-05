import { Link, NavLink, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import RentalSearchInput from '../rental/RentalSearchInput';

function Header({ auth, logout }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/rentals');
  };

  const renderAuthButton = (isAuth) => {
    if (isAuth) {
      return (
        <a className="nav-item nav-link clickable" onClick={handleLogout}>
          Logout
        </a>
      );
    }

    return (
      <>
        <NavLink className="nav-item nav-link" to="/login">
          Login <span className="sr-only">(current)</span>
        </NavLink>
        <NavLink className="nav-item nav-link" to="/register">
          Register
        </NavLink>
      </>
    );
  };

  const renderOwnerSection = (isAuth) => {
    if (isAuth) {
      return (
        <div className="nav-item dropdown">
          <a
            className="nav-link nav-item dropdown-toggle clickable"
            id="navbarDropdownMenuLink"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            Owner Section
          </a>
          <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
            <NavLink className="dropdown-item" to="/rentals/new">
              Create Rental
            </NavLink>
            <NavLink className="dropdown-item" to="/rentals/manage">
              Manage Rentals
            </NavLink>
            <NavLink className="dropdown-item" to="/bookings/manage">
              Manage Bookings
            </NavLink>
          </div>
        </div>
      );
    }
  };

  const { username, isAuth } = auth;

  return (
    <nav className="navbar navbar-dark navbar-expand-lg">
      <div className="container">
        <Link className="navbar-brand" to="/rentals">
          EMAHOTEL
          <img src={process.env.PUBLIC_URL + '/img/logo.png'} alt="" />
        </Link>
        <RentalSearchInput />
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav ml-auto">
            {isAuth && <a className="nav-item nav-link">{username}</a>}
            {renderOwnerSection(isAuth)}
            {renderAuthButton(isAuth)}
          </div>
        </div>
      </div>
    </nav>
  );
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

export default connect(mapStateToProps)(Header);
