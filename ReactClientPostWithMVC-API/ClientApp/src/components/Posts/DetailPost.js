import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';



export const DetailPost = (props) => {
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
        console.log(id);
        console.log("Click me Delete");
        props.history.push({
            pathname: `/deletePost/${id}`
        });      
    }


    const editHandler = async (id) => {
        console.log(id);
        console.log("Click me Edit");
        props.history.push({
            pathname: `/editPost/${id}`
        });      
    }


    return (
        <>
            <article className="media content-section" style={{ width: '50%' }}>               
                {
                    readyForRender &&
                    <>
                        <img className="rounded-circle article-img" src={post.author.photoPath} alt="" />
                        <div className="media-body">
                            <div className="article-metadata">
                                <Link className="mr-2" to="#"><strong>{post.author.fullName}</strong></Link>
                                <small className="text-muted">{post.datePosted}</small>

                                <div>
                                    <button
                                        className="btn btn-outline-secondary btn-sm m-1"

                                        onClick={() => editHandler(post.postID)}>
                                        <strong>Update</strong>
                                    </button>
                                    <button
                                        className="btn btn-outline-danger btn-sm m-1"
                                        onClick={() => deleteHandler(post.postID)}>
                                        <strong>Delete</strong>
                                    </button>
                                </div>
                            </div>
                            <h2 className="article-title">
                                <Link
                                    to="/"
                                    style={{ textDecoration: "none" }}>
                                    {post.title}
                                </Link>                                
                            </h2>
                            <hr/>
                            <p
                                className="article-content">
                                {post.content}
                            </p>
                        </div>
                    </>
                }
            </article>
        </>
    );

}









