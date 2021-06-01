import React, { useState } from 'react';


export const PostForm = (props) => {
    const { backToListHandler, heading, authors, buttonAction, onPostChange, initialPostData } = props;

    const [post, setPost] = useState(initialPostData);

    const handleSubmit = (event) => {
        event.preventDefault();
        onPostChange(post);
    }


    const handleChange = (event) => {
        event.persist();
        setPost({ ...post, [event.target.name]: event.target.value })
    }


    return (
        <div className="border" style={{ width: '50%' }}>
            <div className="card-header text-center">
                <h4>{heading}</h4>
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
                            id="authorId"
                            name="authorId"
                            value={post.authorID}
                            className="form-control"
                            onChange={handleChange}
                        >
                            <option>Select Author</option>
                            {
                                authors.map(author => (

                                    <option
                                        key={author.authorID}
                                        value={author.authorID}

                                    >
                                        {author.fullName}
                                    </option>

                                ))}
                        </select>

                    </div>

                    <hr />
                    <div className="form-group">
                        <button type="submit" className="btn btn-secondary btn-block"><strong>{buttonAction}</strong></button>
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