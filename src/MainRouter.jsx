import React from 'react';
import {Route,Switch} from 'react-router-dom';
import Home from './core/Home';
import SginUp from './user/SginUp';
import SginIn from './user/SginIn';
import Menu from './core/Menu';
import Profile from './user/Profile'


const MainRouter = () => {
    return(
        <div>
        <Menu/>
        <Switch>
        <Route exact path='/' component={Home}  ></Route>
        <Route exact path='/signin' component={SginIn}  ></Route>
        <Route exact path='/signup' component={SginUp}  ></Route>
        <Route exact path='/user/:userId' component={Profile}  ></Route>
        
        </Switch>
        </div>
    )

    
}

export default MainRouter;