import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


export const DeleteAuthor = (props) => {
    const [author, setAuthor] = useState({ authorID: '', firstName: '', lastName: '', email: '', phoneNumber: '', dateOfBirth: '' });
    
    const apiUrl = `https://localhost:5001/api/authors/${props.match.params.id}`;


    useEffect(() => {
        const GetData = async () => {
            const result = await axios(apiUrl);
            setAuthor(result.data);
        };
        GetData();
    }, [apiUrl]);


    const deleteHandler = (event) => {
        event.preventDefault();        
        if (window.confirm('Are you sure to delete this record?')) {
            axios.delete(apiUrl)
                .then(res => {
                    props.history.push({
                        pathname: "/authorList"
                    });

                })
        }
    }


    return (

        <div className="content-section" style={{width: '50%'}}>
            <form onSubmit={() => deleteHandler(author.authorID)}>
                <fieldset className="form-group">
                    <legend className="border-bottom m-2">Delete Author</legend>
                    <h2>Are you sure you want to delete the Author "{author.fullName}"?</h2>
                </fieldset>
                <div className="form-group">
                    <button className="btn btn-outline-danger" type="submit"><strong>Yes, Delete</strong></button>
                    <Link
                        className="btn btn-outline-secondary m-2"
                        to="/authorList"
                    >
                        <strong>Cancel</strong>
                    </Link>
                </div>
            </form>
        </div>
    );

}













