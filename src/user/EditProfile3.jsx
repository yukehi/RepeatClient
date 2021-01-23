import React , { useState,useEffect,useRef } from 'react'; 
import { isAuthenticated } from '../auth/index';
import { read } from './UserApi';
import { Redirect } from 'react-router-dom';
import { update } from './UserApi';

const EditProfile = (props) => {
    const [user,setUser] = useState({
        name:'',
        email:'',
        id:'',
        password:'',
        error:'',
        redirectToProfile: false,
        photo:'',
        
        
    });
    const form = useRef(null);
    
    // useEffect(() => {
    //     const userId = props.match.params.userId;
        
    //     }, []);

    useState(() => {
        const userId = props.match.params.userId;
        const token = isAuthenticated().token;
        read(userId,token).then(data => {
            if (data.error){
                setUser({redirectToProfile:true})
            }else{
                setUser({id:data._id,name:data.name,email:data.email,password:data.password,emotion:data.emotion,color:data.color,})
            }
        })
        
    });
   
    

    const isValid = () => {
        const {name, email, password} = user;
        //debug the length does not work in single input
        if(name.length == 0){
            setUser({error: 'Name is required'})
            return false
        }if(!/^\w+([\.-?\w+])*@\w+([\.-]?w+)*(\.\w{2,3})+$/.test(email)){
            setUser({error: 'a valid email is required'})
            return false
        }if(password.length >= 1 && password.length <= 5){
            setUser({error: 'password must be at least 6 characters'})
            return false
        }
        return true
    };
    
    const handleChange = name => event => {
        const value = name === 'photo' ? event.target.files[0] : event.target.value;
        
            setUser(prevValue =>{
            return {
                ...prevValue,
                [name]: value
            }
            })
        };
    
    const clickSubmit = (e) =>{
        e.preventDefault()
        // debug does not work to upadte 
        const userData = new FormData(form.current);
        const userId = props.match.params.userId;
        const token = isAuthenticated().token;
        update(userId,token,userData).then((data) => {
            if (data.error){
                setUser({ error: data.error})
            }else{
                setUser({redirectToProfile:true})
                } 
            }
        )
        console.log(userData);
    };
   
    if(user.redirectToProfile){
       return <Redirect to={`/user/${props.match.params.userId}`}/>;
    };
    

    return (<div className="container">
        <h2 className="mt-5 mb-5">Edit Profile</h2>
        <div className="alert alert-primary" style={{display: user.error ? '' : 'none'}}>{user.error}</div>
        <form ref={form}>
            <div className="from-group">
                <label className="text-muted">Profile Picture</label>
                <input name="photo" accept='image/*' onChange={handleChange('photo')} type="file" className="form-control"/>
                <label className="text-muted">Name</label>
                <input name="name" value={user.name} onChange={handleChange('name')} type="text" className="form-control"/>
                <label  className="text-muted">Email</label>
                <input name="email"  value={user.email} onChange={handleChange('email')} type="email" className="form-control"/>
                <label className="text-muted">password</label>
                <input name="password" value={user.password} onChange={handleChange('password')} type="password" className="form-control"/>
            </div>
            <button onClick={clickSubmit} type="submit" className="btn btn-raised btn-primary">UPDATE</button>
        </form>
    </div>)
}

export default EditProfile;