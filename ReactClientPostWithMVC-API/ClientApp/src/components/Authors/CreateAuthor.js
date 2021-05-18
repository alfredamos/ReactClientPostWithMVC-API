import React, { useState } from 'react';
import "react-datetime/css/react-datetime.css";
import DateTimePicker from 'react-datetime-picker';
import axios from 'axios';


export const CreateAuthor = (props) => {
    const [author, setAuthor] = useState({ firstName: '', lastName: '', email: '', phoneNumber: '', photoPath: '', dateOfBirth: new Date()});
    const [dateOfBirth, setDateOfBirth] = useState(new Date());
    const [imageSrc, setImageSrc] = useState('');
   
    const apiUrl = `https://localhost:5001/api/authors`;

   
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = { firstName: author.firstName, lastName: author.lastName, email: author.email, phoneNumber: author.phoneNumber, photoPath: author.photoPath, dateOfBirth: author.dateOfBirth }        
        axios.post(apiUrl, data)
            .then(res => {
                props.history.push('/authorList') 
            });
    }


    const handleChange = (event) => {
        event.persist();
        setAuthor({ ...author, [event.target.name]: event.target.value })
    }

    const handleChangeImage = async (event) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            const imageSource = await ConvertBase64(file);
            setImageSrc(imageSource);
            const fileArray = imageSource.split(","); //----> Extract the base64 string ftom the combination of data type and base64 string.
            const fileURL = fileArray[fileArray.length - 1];
            setAuthor({ ...author, photoPath: fileURL })
        } else {
            setAuthor({ ...author, photoPath: "" });
        }
    }

    const handleChangeDate = date => {        
        setDateOfBirth(date);        
        setAuthor({ ...author, dateOfBirth: dateOfBirth });       
    }

    const backToListHandler = () => {
        props.history.push({
            pathname: '/authorList' 
        });

    }


    const ConvertBase64 = async (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);

            fileReader.onload = () => {
                resolve(fileReader.result);               
            };

            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    }


    return (
        <div className="border" style={{ width: '50%' }}>
            <div className="card-header text-center">
                <h4>Author Form</h4>
            </div>
            <div className="card-body">

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="form-label">
                            First Name:
                        </label>
                        <input
                            type="text"
                            name="firstName"
                            id="firstName"
                            placeholder="firstName"
                            value={author.firstName}
                            onChange={handleChange}
                            className="form-control"
                        />

                    </div>
                    <div className="form-group">
                        <label className="form-label">
                            Last Name:
                        </label>
                        <input
                            type="text"
                            name="lastName"
                            id="lastName"
                            placeholder="lastName"
                            value={author.lastName}
                            onChange={handleChange}
                            className="form-control"
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">
                            Email Address:
                        </label>
                        <input
                            type="text"
                            name="email"
                            id="email"
                            placeholder="email"
                            value={author.email}
                            onChange={handleChange}
                            className="form-control"
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">
                            Phone Number:
                        </label>
                        <input
                            type="text"
                            name="phoneNumber"
                            id="phoneNumber"
                            placeholder="phoneNumber"
                            value={author.phoneNumber}
                            onChange={handleChange}
                            className="form-control"
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">
                            Date of Birth:
                        </label>
                        <DateTimePicker
                            className="form-control"
                            onChange={handleChangeDate}
                            value={dateOfBirth}
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">
                            Photo:
                        </label>
                        <input
                            type="file"
                            accept="image/*"                            
                            placeholder="Choose Photo"                            
                            onChange={handleChangeImage}                           
                            className="form-control-file"
                        />                       
                        <img src={imageSrc} style={{ height: "200px" }} alt="" />
                    </div>
                    <hr />
                    <div className="form-group">
                        <button type="submit" className="btn btn-secondary btn-block"><strong>Create</strong></button>
                    </div>
                    <hr />
                </form>
            </div>
            <div className="card-footer">
                <button onClick={backToListHandler} className="btn btn-primary btn-block"><strong>Back To Author List</strong></button>
            </div>
        </div>
    );
}