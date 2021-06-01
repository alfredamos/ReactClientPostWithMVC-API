import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PostForm } from '../Forms/PostForm';


const initialPostData = { title: '', content: '', authorId: 0 };

export const CreatePost = (props) => {
    const [authors, setAuthors] = useState([]);    
    

    const authorApiUrl = `https://localhost:5001/api/authors`;
    const postApiUrl = `https://localhost:5001/api/posts`;


    useEffect(() => {
        const GetAuthors = async () => {
            const result = await axios(authorApiUrl);
            setAuthors(result.data);
        };
        GetAuthors();
    }, [authorApiUrl]);


    const postCreateHandler = (post) => {        
        axios.post(postApiUrl, post)
            .then(res => {
                props.history.push('/')
            });
    }


    const backToListHandler = () => {
        props.history.push({
            pathname: '/'
        });

    }


    return (
        <PostForm
            backToListHandler={backToListHandler}
            heading={"Post Create Form"}
            authors={authors}
            buttonAction={"Create"}
            onPostChange={postCreateHandler}
            initialPostData={initialPostData}
        />
    );
}