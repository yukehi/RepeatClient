import React , { useState , useEffect, useRef}from 'react'
import { isAuthenticated } from '../auth/index';
import { Redirect } from 'react-router-dom';
import { read } from '../user/UserApi';
import {create} from './ApiPost';

const NewPost = (props) => {
    const [post,setpost] = useState({
        title: '',
        body: '',
        photo:'',
        error:'',
        redirectToHome: false,
        fileSize: 0,
        user:{},
    })
    const form = useRef(null)

    useEffect(() => {
        setpost({user:isAuthenticated().user})
      }, []);
    //  need a debug does not work 
    const isValid = () => {
        const {title, body ,fileSize} = post;
        if(fileSize > 100000){
            setpost({
                error:'File Size should be less the 100kb',
                loading: false
            })
            return false;
        }
        //debug the length does not work
        if(title.length === 0){
            setpost({error: 'Title is required'})
            return false;
        }if(body.length === 0){
            setpost({error: 'contant is required'})
            return false;
        }
        return true
    }
    const handleChange = name => event => {
        const value = name === 'photo' ? event.target.files[0] : event.target.value;
        setpost({...post, [name]: value});
        }
   
    const clickSubmit = (e) =>{
        e.preventDefault()
        const userData = new FormData(form.current);
        const userId = isAuthenticated().user._id;
        const token = isAuthenticated().token;
        if(isValid())create(userId,token,userData).then((data) => {
            if (data.error){
                setpost({ error: data.error})
            }else{
                setpost({redirectToHome:true})
                } 
            }
        )
        
    }
    // debug the redirect
    if(post.redirectToHome){
       return <Redirect to={'/'}/>;
    }
    
    return (<div className="container">
    <h2 className="mt-5 mb-5">Create Your Repeat</h2>
    <div className="alert alert-primary" style={{display: post.error ? '' : 'none'}}>{post.error}</div>
    <form ref={form}  >
    <p>{post.title}</p>
        <div className="from-group">
            <label className="text-muted">Picture</label>
            <input name="photo" accept='image/*' onChange={handleChange('photo')} type="file" className="form-control"/>
            <label className="text-muted">Title</label>
            <input name="title" value={post.title} onChange={handleChange('title')} type="text" className="form-control"/>
            <label  className="text-muted">Contant</label>
            <input name="body" value={post.body} onChange={handleChange('body')} type="text" className="form-control"></input>
        </div>
        <button onClick={clickSubmit} type="submit" className="btn btn-raised btn-primary">Repeat</button>
    </form>
</div>)
}

export default NewPost;