import { Navigate, Outlet } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

function PrivateRoute(props){
    if(props.auth.isLoading) {
        return <h1>LOADING...</h1>
    } else if(!props.auth.isAuthenticated){
        return <Navigate to='/login'/>
    } else {
        return <Outlet />
    }
}

const mapStateToProps = state => ({
    auth: state.authReducer
  });

export default connect(mapStateToProps)(PrivateRoute);
