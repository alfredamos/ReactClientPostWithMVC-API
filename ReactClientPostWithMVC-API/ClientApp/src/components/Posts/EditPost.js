import React, { useState, useEffect } from 'react';
import axios from 'axios';


export const EditPost = (props) => {
    const [authors, setAuthors] = useState([]);
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
        };
        GetPost();
    }, [postApiUrl]);


    const handleSubmit = (event) => {
        event.preventDefault();        
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


    const handleChange = (event) => {
        event.persist();
        setPost({ ...post, [event.target.name]: event.target.value })
    }

    const handleChangeAuthor = (authorId) => {
        setPost({ ...post, authorId: authorId })
    }

    return (
        <div className="border" style={{ width: '50%' }}>
            <div className="card-header text-center">
                <h4>Post Form</h4>
            </div>
            <div className="card-body">

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="form-label">
                            Title:
                        </label>
                        <input
                            type="text"
                            name="title"
                            id="title"
                            placeholder="title"
                            value={post.title}
                            onChange={handleChange}
                            className="form-control"
                        />

                    </div>
                    <div className="form-group">
                        <label className="form-label">
                            Content:
                        </label>
                        <textarea
                            type="text"
                            name="content"
                            id="content"
                            placeholder="content"
                            value={post.content}
                            onChange={handleChange}
                            className="form-control"
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">
                            Author:
                        </label>
                        <select
                            placeholder="email"
                            className="form-control"
                        >
                            {
                                authors.map(author => (
                                    <option
                                        key={author.authorID}
                                        value={author.fullName}
                                        onChange={() => handleChangeAuthor(author.authorID)}
                                    >
                                        {author.fullName}
                                    </option>

                                ))}
                        </select>
                    </div>

                    <hr />
                    <div className="form-group">
                        <button type="submit" className="btn btn-secondary btn-block"><strong>Create</strong></button>
                    </div>
                    <hr />
                </form>
            </div>
            <div className="card-footer">
                <button onClick={backToListHandler} className="btn btn-primary btn-block"><strong>Back To Post List</strong></button>
            </div>
        </div>
    );
}