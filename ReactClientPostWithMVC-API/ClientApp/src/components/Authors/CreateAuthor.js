import React, { useState } from 'react';
import { AuthorForm } from '../Forms/AuthorForm';
import axios from 'axios';


const initialAuthorData = { firstName: '', lastName: '', email: '', phoneNumber: '', photoPath: '', dateOfBirth: new Date() };

export const CreateAuthor = (props) => {       
    const [imageSRC] = useState('');    
   
    const apiUrl = `https://localhost:5001/api/authors`;


    const authorCreateHandler = (author) => {       
        axios.post(apiUrl, author)
            .then(res => {
                props.history.push('/authorList')
            });
    }

  

    const backToListHandler = () => {
        props.history.push({
            pathname: '/authorList' 
        });

    }


    return (
        <>
            <AuthorForm
                backToListHandler={backToListHandler}
                heading={"Author Create Form"}
                imageSRC={imageSRC}
                buttonAction={"Create"}
                onAuthorChange={authorCreateHandler}
                initialAuthorData={initialAuthorData}               
            />
        </>
    );
}