import React, { useState } from 'react';

const SginUp = () => {
    const [profile,setProfile] = useState({
        name: '',
        email:'',
        password:'',
        error:'',
        open:false
    })
    const handleChange = (event) => {
        const {value,name } = event.target;
        //debug thers is an bug wehn trying to clear the error the prevValue disapeer
        setProfile(prevValue =>{
            if(name === 'name'){
                return {
                    name:value,
                    email:prevValue.email,
                    password:prevValue.password,
                    error:''
                }
            }else if(name === 'email'){
                return {
                    name:prevValue.name,
                    email:value,
                    password:prevValue.password,
                    error:''
                }
            }else if(name === 'password'){
                return {
                    name:prevValue.name,
                    email:prevValue.email,
                    password:value,
                    error:''

                }
        }
    })
}
    const clickSubmit = (e) =>{
        e.preventDefault()
        const {name, email,password} = profile
        const user = {
            name,
            email,
            password,
        };
        fetch('http://localhost:8080/signup', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
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
                setProfile({ error: data.error})
            }else{
                setProfile({name:'',email:'',password:'',error:'',open:true})
            } 
            //need to move an error if data is with error
            
            }
        )
        
    }

    


    
    return (<div className="container">
        <h2 className="mt-5 mb-5">Sgin up</h2>
        <h2 className="mt-5 mb-5">Hello {profile.name}</h2>
        <div className="alert alert-primary" style={{display: profile.error ? '' : 'none'}}>{profile.error}</div>
        <div className="alert alert-info" style={{display: profile.open ? '' : 'none'}}>New account successfully created. please log in</div>
        <form>
            <div className="from-group">
                <label className="text-muted">Name</label>
                <input name="name" type="text" value={profile.name} onChange={handleChange} type="text" className="form-control"/>
                <label  className="text-muted">Email</label>
                <input name="email" type="email" value={profile.email} onChange={handleChange} type="email" className="form-control"/>
                <label className="text-muted">password</label>
                <input name="password" type="password" value={profile.password} onChange={handleChange} type="password" className="form-control"/>
            </div>
            <button onClick={clickSubmit} type="submit" className="btn btn-raised btn-primary">submit</button>
        </form>
    </div>)


}


export default SginUp;