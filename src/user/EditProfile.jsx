import React , { useState , useEffect, useRef}from 'react'
import { isAuthenticated } from '../auth/index';
import { Redirect } from 'react-router-dom';
import { read } from '../user/UserApi';
import {update} from './UserApi';

const EditProfile = (props) => {
    const [user,setuser] = useState({
        name: '',
        email: '',
        id:'',
        password: '',
        photo:'',
        error:'',
        redirectToProfile: false,
        
    })
    const form = useRef(null)
    
    //  need a debug does not work 
    // const isValid = () => {
    //     const {name, email ,fileSize} = user;
    //     if(fileSize > 100000){
    //         setuser({
    //             error:'File Size should be less the 100kb',
    //             loading: false
    //         })
    //         return false;
    //     }
    //     //debug the length does not work
    //     if(title.length === 0){
    //         setuser({error: 'Title is required'})
    //         return false;
    //     }if(body.length === 0){
    //         setuser({error: 'contant is required'})
    //         return false;
    //     }
    //     return true
    // }
    const handleChange = name => event => {
        const value = name === 'photo' ? event.target.files[0] : event.target.value;

        
        setuser({...user, [name]: value});
        }
   
    const clickSubmit = (e) =>{
        e.preventDefault()
        const userData = new FormData(form.current);
        const userId = isAuthenticated().user._id;
        const token = isAuthenticated().token;
        console.log(userData);
        update(userId,token,userData).then((data) => {
            if (data.error){
                setuser({ error: data.error})
            }else{
                setuser({redirectToProfile:true})
                } 
            }
        )
        console.log(userData);
    }
    // debug the redirect
    if(user.redirectToProfile){
       return <Redirect to={`/user/${props.match.params.userId}`}/>;
    }
    
    return (<div className="container">
    <h2 className="mt-5 mb-5">Create Your Repeat</h2>
    <div className="alert alert-primary" style={{display: user.error ? '' : 'none'}}>{user.error}</div>
    <form ref={form}  >
        <div className="from-group">
            <label className="text-muted">Profile Picture</label>
            <input name="photo" accept='image/*' onChange={handleChange('photo')} type="file" className="form-control"/>
            <label className="text-muted">Name</label>
            <input name="name" value={user.name} onChange={handleChange('name')} type="text" className="form-control"/>
            <label  className="text-muted">Email</label>
            <input name="email" value={user.email} onChange={handleChange('email')} type="text" className="form-control"/>
            <label className="text-muted">Password</label>
            <input name="password" value={user.password} onChange={handleChange('password')} type="password" className="form-control"/>
        </div>
        <button onClick={clickSubmit} type="submit" className="btn btn-raised btn-primary">Repeat</button>
    </form>
</div>)
}

export default EditProfile;