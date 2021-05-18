import React, { useState, useEffect } from 'react';
import axios from 'axios';


export const DetailAuthor = (props) => {
    const [author, setAuthor] = useState({ authorID: '', firstName: '', lastName: '', email: '', phoneNumber: '', dateOfBirth: '' });    

    const apiUrl = `https://localhost:5001/api/authors/${props.match.params.id}`;


    useEffect(() => {
        const GetData = async () => {
            const result = await axios(apiUrl);
            setAuthor(result.data);
        };
        GetData();
    }, [apiUrl]);


    const backToListHandler = () => {
        props.history.push({
            pathname: '/authorList'
        });

    }

    const deleteHandler = async (id) => {
        console.log(id);
        console.log("Click me Delete");
         props.history.push({
            pathname: `/deleteAuthor/${id}`
        });      
    }

    return (

        <div className="border" style={{ width: '50%' }}>
            <div className="card-header text-center">
                <h3>Author Detail</h3>
            </div>
            <div className="card-body">
                <table>
                    <tbody>
                        <tr>
                            <td><strong>Full Name : </strong>{author.fullName}</td>
                        </tr>
                        <tr>
                            <td><strong>Email Address : </strong>{author.email}</td>
                        </tr>
                        <tr>
                            <td><strong>Phone Number : </strong>{author.phoneNumber}</td>
                        </tr>
                        <tr>
                            <td><strong>Date of Birth : </strong>{author.dateOfBirth}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="card-footer">
                <button type="button" className="btn btn-outline-danger btn-block" onClick={() => deleteHandler(author.authorID)} style={{ fontWeight: "bold" }}>
                    Delete
                </button>
                <button type="button" className="btn btn-outline-primary btn-block" onClick={backToListHandler} style={{ fontWeight: "bold" }}>
                    Back to List
                </button>
            </div >
        </div >

    );

}













