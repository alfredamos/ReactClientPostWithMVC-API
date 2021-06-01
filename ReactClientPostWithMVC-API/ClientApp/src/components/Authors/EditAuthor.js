import React, { useState, useEffect } from 'react';
import { AuthorForm } from '../Forms/AuthorForm';
import axios from 'axios';


const initAuthorData = {authorID: '', firstName: '', lastName: '', email: '', phoneNumber: '', dateOfBirth: new Date() };

export const EditAuthor = (props) => {

    const [author, setAuthor] = useState(initAuthorData);    
    const [isLoading, setIsLoading] = useState(false);
    const [imageSRC, setImageSRC] = useState('');    
    
    const apiUrl = `https://localhost:5001/api/authors/${props.match.params.id}`;


    useEffect(() => {
        const GetData = async () => {
            const result = await axios(apiUrl);
            setAuthor(result.data);
            setIsLoading(true);            
            if (result.data.photoPath !== null) {
                const imageUrl = result.data.photoPath;
                setImageSRC(imageUrl);
                         
            }
        };
        GetData();
        
    }, [apiUrl, isLoading]);  


    const authorEditHandler = (author) => {
        console.log(author);
        axios.put(apiUrl, author)
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
            {
                isLoading &&
                <AuthorForm
                    backToListHandler={backToListHandler}
                    heading={"Author Edit Form"}
                    imageSRC={imageSRC}
                    buttonAction={"Save"}
                    onAuthorChange={authorEditHandler}
                    initialAuthorData={author}                    
                />
            }
        </>
    );
}