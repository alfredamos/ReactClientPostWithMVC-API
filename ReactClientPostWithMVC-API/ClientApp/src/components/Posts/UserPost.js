import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'


export const UserPost = (props) => {
    const [posts, setPosts] = useState([]);
    const [numberOfUserPosts, setNumberOfUserPosts] = useState(0);
    const [userName, setUserName] = useState("");
    const [stringLength, setStringLength] = useState(0);

    const apiUrl = `https://localhost:5001/api/posts`;

    useEffect(() => {
        const GetData = async () => {
            const result = await axios(apiUrl);
            const userId = parseInt(props.match.params.id);            
            let postes = (result.data)
            const filteredPosts = postes.filter(post => post.authorID === userId)
            const author = filteredPosts[0].author;
            const userName = author.fullName;
            setUserName(userName);
            setNumberOfUserPosts(filteredPosts.length);
            setPosts(filteredPosts);
            setStringLength(80); //----> Maximum length of string displayed in post.
        };
        GetData();
    }, [apiUrl]);

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
            <h3>All {userName} posts : {numberOfUserPosts}.</h3>
            {
                posts.map(post => (
                    <article className="media content-section" key={post.postID} style={{width: '50%'}}>
                        <img className="rounded-circle article-img" src={post.author.photoPath} alt="" />
                        <div className="media-body">
                            <div className="article-metadata">
                                <Link
                                    className="mr-2"
                                    to="/"
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
                            <hr />
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