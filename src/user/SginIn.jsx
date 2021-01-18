import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import Loading from '../core/Loading'
const SginIn =() => {
    const [profile,setProfile] = useState({
        email:'',
        password:'',
        error:'',
        open:false,
        redirectToReferer:false,
        loding:false
    })
    const handleChange = (event) => {
        const {value,name } = event.target;
        //debug thers is an bug wehn trying to clear the error the prevValue disapeer
        setProfile(prevValue =>{
            if(name === 'email'){
                return {
                    email:value,
                    password:prevValue.password,
                    error:''
                }
            }else if(name === 'password'){
                return {
                    email:prevValue.email,
                    password:value,
                    error:''

                }
        }
    })
}

    const authenticate = (jwt,next) => {
        if(typeof window !== 'undefined'){
            localStorage.setItem('jwt', JSON.stringify(jwt))
            next()
        }
    }

    const clickSubmit = (e) =>{
        e.preventDefault()
        setProfile({loading:true})
        const {name, email,password} = profile
        const user = {
            name,
            email,
            password,
        };
        fetch(`${process.env.REACT_APP_API_URL}/signin`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        .then(response => {
            return response.json()
        })
        .catch(err => console.log(err))
        .then((data) => {
            if (data.error){
                setProfile({ error: data.error ,loading:false})
            }else{
                authenticate(data, ()=>{
                    setProfile({redirectToReferer: true})
                }) 
            } 
            }
        )
    }

    

    if(profile.redirectToReferer){
        return <Redirect to='/'/>
    }


    return(
        <div className='container'>
            <h2>Sign In</h2>
            <div className="alert alert-primary" style={{display: profile.error ? '' : 'none'}}>{profile.error}</div>
        <div className="alert alert-info" style={{display: profile.open ? '' : 'none'}}>Sign In successfully</div>
        {profile.loading ? <div className=''><Loading/></div>:''}
        <form>
            <div className="from-group">
                <label  className="text-muted">Email</label>
                <input name="email" type="email" value={profile.email} onChange={handleChange} type="email" className="form-control"/>
                <label className="text-muted">password</label>
                <input name="password" type="password" value={profile.password} onChange={handleChange} type="password" className="form-control"/>
            </div>
            <button onClick={clickSubmit} type="submit" className="btn btn-raised btn-primary">submit</button>
        </form>
        </div>
    )
}


export default SginIn;