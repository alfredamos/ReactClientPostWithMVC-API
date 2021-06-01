import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { ConfirmDelete } from '../Utilities/ConfirmDelete' 


export const DeletePost = (props) => {
    const [post, setPost] = useState({ postID: '', title: '', content: '', authorId: '' });
    const [readyForRender, setReadyForRender] = useState(false);
    const [isDelete, setIsDelete] = useState(false);
   
    const apiUrl = `https://localhost:5001/api/posts/${props.match.params.id}`;


    useEffect(() => {        
        const GetData = async () => {
            const result = await axios(apiUrl);
            setPost(result.data);
            setReadyForRender(true);
            setIsDelete(false);            
        };
        GetData();
    }, [apiUrl, readyForRender]);


    //const deleteClick = () => {
    //    setIsDelete(true);
    //}


    const deleteHandler = (deleteConfirmed) => {
        console.log("deleteConfirmed : ", deleteConfirmed);
        if (deleteConfirmed) {
            axios.delete(apiUrl)
        }
        props.history.replace({
            pathname: '/'
        });

    }


    const deleteClick = (event) => {
        event.preventDefault();   
        setIsDelete(true);
        console.log("IsDelete : ", isDelete);
    }


    return (
        <>
            <br />
            <br />
            {
                readyForRender &&
                <div className="content-section mt-5" style={{ width: '50%' }}>
                    <form >
                        <div className="border">
                            <div className="card-body">
                                <fieldset className="form-group">

                                    <legend className="border-bottom m-2">Delete Post</legend>
                                    <h2>Are you sure you want to delete : "{post.title}"?</h2>


                                </fieldset>
                            </div>
                            <div className="form-group card-footer">
                                <button className="btn btn-outline-danger m-2" type="button" onClick={deleteClick}><strong>Yes, Delete</strong></button>
                                <Link
                                    className="btn btn-outline-secondary"
                                    to="/"
                                >
                                    <strong>Cancel</strong>
                                </Link>
                            </div>
                        </div>                       
                        {
                            isDelete && < ConfirmDelete
                                ConfirmationMessage={`Are you sure you want to delete ${post.title}?`}
                                ConfirmationTitle={"Delete Confirmation"}
                                deleteHandler={deleteHandler}
                            />
                        }
                    </form>
                </div>
            }
        </>
    );
}









