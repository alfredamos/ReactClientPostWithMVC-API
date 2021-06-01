import React, { useState, useEffect } from 'react';
import { SearchItem } from '../Utilities/SearchItem'
import axios from 'axios';

export const AuthorList = (props) => {
    const [authors, setAuthors] = useState([])
    const [filter, setFilter] = useState('');
    const [isLoading, setIsLoading] = useState(false);


    const authorUrl = `https://localhost:5001/api/Authors`;


    const editHandler = (id) => {
        console.log(id);
        props.history.push({
            pathname: `/editAuthor/${id}`
        });

    }

    const deleteHandler = (id) => {
        console.log(id);
        props.history.push({
            pathname: `/deleteAuthor/${id}`
        });
    }


    const createHandler = () => {
        props.history.push({
            pathname: '/createAuthor'
        });
    }


    const detailHandler = (id) => {
        console.log(id);
        props.history.push({
            pathname: `/detailAuthor/${id}`
        });
    }


    useEffect(() => {
        axios.get(authorUrl)
            .then(res => {
                setAuthors(res.data);
                setIsLoading(true);
            })

    }, [authorUrl, isLoading]);


    const filterHandler = (event) => {
        const { value } = event.target;
        setFilter(value)
    }


    const searchHandler = (event) => {
        event.preventDefault();
        console.log("filter : ", filter);
        if (filter !== "") {
            const searchApiUrl = `${authorUrl}/search/${filter}`;
            axios.get(searchApiUrl)
                .then(res => {
                    setAuthors(res.data)
                });
        } else {
            axios.get(authorUrl)
                .then(res => {
                    setAuthors(res.data)
                });
        }
    }


    return (
        <>
            {
                isLoading &&
                <section>
                    <div className="border">
                        <div className="card-header text-center">
                            <h4>List of Authors</h4>
                        </div>
                        <div className="card-body">
                            <SearchItem filterHandler={filterHandler} searchHandler={searchHandler} />
                            <br/>
                            <table className="table table-bordered table-striped">
                                <thead>
                                    <tr>
                                        <th>Full Name</th>
                                        <th>Email</th>
                                        <th>Phone Number</th>
                                        <th>Date of Birth</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        authors.map((author) => (

                                            <tr key={author.authorID}>
                                                <td>{author.fullName}</td>
                                                <td>{author.email}</td>
                                                <td>{author.phoneNumber}</td>
                                                <td>{new Date(author.dateOfBirth).toLocaleDateString()}</td>
                                                <td>
                                                    <button onClick={() => editHandler(author.authorID)} className="btn btn-warning mr-2" style={{ fontWeight: "bold" }}>Edit</button>
                                                    <button onClick={() => deleteHandler(author.authorID)} className="btn btn-danger mr-2" style={{ fontWeight: "bold" }}>Delete</button>
                                                    <button onClick={() => detailHandler(author.authorID)} className="btn btn-primary" style={{ fontWeight: "bold" }}>Detail</button>
                                                </td>
                                            </tr>

                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                        <div className="card-footer">
                            <button type="button" onClick={createHandler} className="btn btn-primary btn-block" style={{ fontWeight: "bold" }}>Create Author</button>
                        </div>
                    </div>
                </section>
            }
        </>
    );


}

