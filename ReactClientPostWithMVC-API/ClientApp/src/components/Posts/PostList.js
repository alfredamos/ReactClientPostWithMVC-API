import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


export const PostList = (props) => {
    const [postList, setPostList] = useState([]);
    const [stringLength, setStringLength] = useState(0);
    
    const apiURL = `https://localhost:5001/api/Posts`;
    
    useEffect(() => {
        axios.get(apiURL)
            .then(res => {
                setPostList(res.data);
            })
        setStringLength(80); //----> Maximum length of string displayed in post.
    }, []);


    const truncateString = (str, num) => {
        // If the length of str is less than or equal to num
        // just return str--don't truncate it.
        if (str.length <= num) {
            return str
        }
        // Return str truncated with '...' concatenated to the end of str.
        return str.slice(0, num) + '...'
    }


    return (       
        <>
            {
                postList.map(post => (
                    <article className="media content-section" key={post.postID} style={{ width: '50%' }}>
                    <img className="rounded-circle article-img" src={ post.author.photoPath } alt="" />
                    <div className="media-body">
                        <div className="article-metadata">                            
                            <Link
                                    className="mr-2"
                                    to={`/userPost/${post.authorID}`}
                            >
                                <strong>{post.author.fullName}</strong>
                            </Link>

                            <small className="text-muted">{post.datePosted}</small>
                        </div>
                        <h2>
                            <Link
                                to={`/detailPost/${post.postID}`}
                                style={{ textDecoration: "none" }}
                            >
                                {post.title}
                            </Link>
                         </h2>
                         <hr/>
                        <p
                            className="article-content"
                        >
                                {truncateString(post.content, stringLength)}<span>
                                    {post.content.length > stringLength &&
                                        <Link
                                            to={`/detailPost/${post.postID}`}
                                            className="btn btn-outline-info"
                                        >
                                            < strong > Read More</strong>
                                        </Link>
                                    }
                                </span>
                        </p>
                    </div>
                </article >

            ))}
        </>
    );

}