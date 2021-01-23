import React from 'react';
import {Route,Switch} from 'react-router-dom';
import Home from './core/Home';
import SginUp from './user/SginUp';
import SginIn from './user/SginIn';
import Menu from './core/Menu';
import Profile from './user/Profile';
import Users from './user/Users';
import EditProfile from './user/EditProfile';
import PrivateRoute from './auth/PriveteRoute';
import NewPost from './post/NewPost'

const MainRouter = () => {
    
    return(
        <div>
        <Menu/>
        <Switch>
        <Route exact path='/' component={Home}  ></Route>
        <Route exact path='/users' component={Users} ></Route>
        <Route exact path='/signin' component={SginIn}  ></Route>
        <Route exact path='/signup' component={SginUp}  ></Route>
        <Route exact path='/user/edit/:userId' component={EditProfile}  ></Route>
        <PrivateRoute exact path='/user/edit/:userId' component={EditProfile}/>
        <PrivateRoute exact path='/user/:userId' component={Profile}  />
        <PrivateRoute exact path='/post/new/:userId' component={NewPost}  />
        </Switch>
        </div>
    )

    
}

export default MainRouter;