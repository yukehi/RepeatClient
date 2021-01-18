import React from 'react';
import { Link , withRouter} from 'react-router-dom';
import { isAuthenticated } from '../auth/index'
import Hover from '../core/OnHover'
import HomeIcon from '@material-ui/icons/Home';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import {signout} from '../auth'

const isActive =(history,path) =>{
    if(history.location.pathname === path) return {color:'#ff9900'}
    else return {color:'#f22fff'}
};


const Menu = ({history})=>{

    return(
    <div style = {{display: 'flex',justifyContent: 'center'}}>
    <ul className="nav nav-tabs">
    <li className="nav-item">
        <Link style={isActive(history,'/')} className="nav-link" to='/'><HomeIcon/></Link>
    </li>
    {!isAuthenticated() && (<div className="nav nav-tabs">
        <li className="nav-item">
        <Link style={isActive(history,'/signin')} className="nav-link" to='/signin'>Sign In</Link>
    </li>
    <li className="nav-item">
        <Link style={isActive(history,'/signup')} className="nav-link" to='/signup'>Sign Up</Link>
    </li>
    </div>
        )}
    {isAuthenticated() && (<div className='nav nav-tabs'>
    <li className="nav-item">
    <Link style = {isActive(history,`/user/${isAuthenticated().user._id}`)}className="nav-link" to={`/user/${isAuthenticated().user._id}`}><AccountCircleIcon/></Link>
    </li>
        <li className="nav-item">
        <Link to='/' onClick={() =>signout(()=> history.push('/'))} style={isActive(history,'/signup'),{cursor:'pointer'},{backgroundColor:'#7debfa'}} className="nav-link" ><Hover/></Link>
    </li>
    
    </div>
    )}    
    
    </ul>   
    </div>
    )
}


export default withRouter(Menu);

