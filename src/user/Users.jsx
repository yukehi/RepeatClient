import React , { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import DefaultProfile from '../images/avater.png';

const Users = () => {
    const [users,setUsers] = useState({
        users:[],
    })
    useState(() => {
        fetch(`${process.env.REACT_APP_API_URL}/users`,{
            method: 'GET',
        })
        .then(response =>{
            return response.json()
        })
        .catch(err => console.log(err))
        .then(data =>{
            if(data.error){
                console.log(data.error);
            }else{
                setUsers({users: data})
            }
        })
    })
    //debug how to make that all of the profiles will load difrentlle
    return(
    <div className='container'>
        <div className='row'>{users.users.map((user,i,a) =>{
            return <div key={i} className="card" style={{backgroundColor:`${user.color}` ,width: '13rem' ,margin: '3%',borderRadius:'100px'}}>
                    <img className="card-img-top" style={{width:'100%',height:'15vw',objectFit:'cover'}} src={DefaultProfile} alt="avtar"/>
                    <div className="card-body">
                        <h5 className="card-title">{user.name}</h5>
                        <p className="card-text">courrent emotion : {user.emotion}</p>
                    </div>
                    <div className="card-body" style={{display:'flex',justifyContent: 'center'}}>
                        <Link style={{borderRadius:'45%',backgroundColor:'#fff25a'}} className="btn btn-primary btn-sm btn-raised" to={`/user/${user._id}`}>View Profile</Link>
                    </div>
                    </div>
    })}</div>
    </div>)

}






export default Users;