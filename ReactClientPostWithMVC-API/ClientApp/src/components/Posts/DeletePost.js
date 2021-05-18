import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


export const DeletePost = (props) => {
    const [post, setPost] = useState({ postID: '', title: '', content: '', authorId: '' });
    const [readyForRender, setReadyForRender] = useState(false);
   
    const apiUrl = `https://localhost:5001/api/posts/${props.match.params.id}`;


    useEffect(() => {
        const GetData = async () => {
            const result = await axios(apiUrl);
            setPost(result.data);
            setReadyForRender(true);
        };
        GetData();
    }, [apiUrl]);


    const deleteHandler = async (id) => {
        console.log("Post ID ",id);
        console.log("Click me Delete");
        if (window.confirm('Are you sure to delete this record?')) {
            axios.delete(apiUrl)
                .then(res => {
                    props.history.push({
                        pathname: "/postList"
                    });

                })
        }
    }


    return (
        readyForRender &&
        <div className="content-section" style={{ width: '50%' }}>
            <form onSubmit={() => deleteHandler(post.postID)}>                
                <fieldset className="form-group">
                    <legend className="border-bottom m-2">Delete Post</legend>
                    <h2>Are you sure you want to delete the Post "{post.title}"?</h2>
                </fieldset>
                <div className="form-group">
                    <button className="btn btn-outline-danger m-2" type="submit"><strong>Yes, Delete</strong></button>
                    <Link
                        className="btn btn-outline-secondary"
                        to="/"
                    >                        
                        <strong>Cancel</strong>
                    </Link>
                </div>
            </form>
        </div>
    );

}









