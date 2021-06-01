import React, { useState, useEffect } from 'react';
import { PostForm } from '../Forms/PostForm';
import axios from 'axios';


export const EditPost = (props) => {
    const [authors, setAuthors] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [post, setPost] = useState({ postID: '', title: '', content: '', authorId: 0 });

    const authorApiUrl = `https://localhost:5001/api/authors`;
    const postApiUrl = `https://localhost:5001/api/posts/${props.match.params.id}`;


    useEffect(() => {
        const GetAuthors = async () => {
            const result = await axios(authorApiUrl);
            setAuthors(result.data);            
        };
        GetAuthors();
    }, [authorApiUrl]);


    useEffect(() => {
        const GetPost = async () => {
            const result = await axios(postApiUrl);
            setPost(result.data);
            setIsLoading(true);
        };
        GetPost();
    }, [postApiUrl]);


    const postEditHandler = (post) => {
        console.log("post : ", post);
        axios.put(postApiUrl, post)
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
        <>
            {
                isLoading &&
                <PostForm
                    backToListHandler={backToListHandler}
                    heading={"Post Edit Form"}
                    authors={authors}
                    buttonAction={"Save"}
                    onPostChange={postEditHandler}
                    initialPostData={post}
                />
            }
        </>
    );
}