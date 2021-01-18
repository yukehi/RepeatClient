import React , { useState,useEffect }from 'react';
import { isAuthenticated } from '../auth/index'

const Profile = (props) => {
    const [user,setUser] = useState({
        user:{
            name:'',
            email:'',
            emotion:'',
            color:'',
        },
        redirectToSignIn: false
    })
    useEffect(() => {
        const userId = props.match.params.userId
        fetch(`${process.env.REACT_APP_API_URL}/user/${userId}`,{
            method:'GET',
            headers: {
                'Accept':'application/json',
                'Content-Type':'application/json',
                'Authorization':`Bearer ${isAuthenticated().token}`
            }
        })
        .then(response =>{
            return response.json()
        })
        .then(data =>{
            if(data.error){
               setUser({redirectToSignIn:true})
            }else{
                setUser({user:
                    {name:data.name, email:data.email,emotion:data.emotion,color:data.color}})
            }
        })
    })
//    const componentDidMount = ()();
    
    // useEffect(() =>console.log('user id form route params:', props.match.params.userId),[])

    return(
        <div className='container'>
            <h2 className="mt-5 mb-5">Profile</h2>
            <p>Hello {user.user.name}</p>
            <p>Email : {user.user.email}</p>
        </div>
    )
}

export default Profile;