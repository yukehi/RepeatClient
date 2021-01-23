import React , { useState,useEffect }from 'react';
import { Redirect ,Link } from 'react-router-dom';
import { isAuthenticated } from '../auth/index'
import DefaultProfile from '../images/avater.png';
import DeleteUser from './DeleteUser'
import { read } from './UserApi';


const Profile = (props) => {

    const [user,setUser] = useState({
        user:{
            name:'',
            email:'',
            emotion:'',
            color:'',
            id:'',
        },
    })

    useEffect(() => {
        const userId = props.match.params.userId
        const token = isAuthenticated().token
        read(userId,token)
        .then(data =>{
            if(!data.error){
               setUser({user:
                {name:data.name, email:data.email,emotion:data.emotion,color:data.color,id:data._id}})
            }if(data.error){
                console.log(data.error);
            }
        })
    }, [])// importent to set the [] if ther is no contuinme fucntion 

    if(!isAuthenticated()) {
        return <Redirect to='/signin'/>
        }
     

    return (
        
        <div className='container'>
            <div className='row'>
                <div className='col-md-6 '>
                    <img className="card-img-top" style={{width:'100%',height:'15vw',objectFit:'cover'}} src={DefaultProfile} alt="Card image cap"/>
                </div>

                <div className='col-md-6'>
                <h2 className="mt-5 mb-5">Hello {user.user.name}</h2>
                    <p>Email : {user.user.email}</p>
                    {isAuthenticated().user && isAuthenticated().user._id === user.user.id && (
                        <div className='d-inLine-block mt-5'>
                        {/* debug th edit page ther is a prblom with pic upload */}
                            <Link className = 'btn btn-raised btn-success mr-5' to={`/user/edit/${user.user.id}`}>Edit Profile</Link>
                            <DeleteUser userId = {isAuthenticated().user._id}/>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Profile;