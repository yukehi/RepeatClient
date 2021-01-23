import React ,{ Component} from 'react';
import { isAuthenticated } from './index';
import { Redirect ,Route } from 'react-router-dom';

const  PrivateRoute = ({...rest}) =>{
    return (
        <Route {...rest} render={props => isAuthenticated() ? (
            <Component {...props}/>
        ):(
            <Redirect to={{pathname:'/signin',state:{from:props.location}}}/>
        )} />
    )
}

export default PrivateRoute;