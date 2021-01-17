import React from 'react';
import {Route,Switch} from 'react-router-dom';
import Home from './core/Home';
import SginUp from './user/SginUp';

const MainRouter = () => {
    return(
        <div>
        <Switch>
        <Route exact path='/signup' component={SginUp}  ></Route>
        <Route exact path='/' component={Home}  ></Route>
        </Switch>
        </div>
    )

    
}

export default MainRouter;