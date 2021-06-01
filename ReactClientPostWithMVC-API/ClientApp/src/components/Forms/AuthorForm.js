import React, { useState} from 'react';
import "react-datetime/css/react-datetime.css";
import DatePicker from 'react-datetime-picker';


export const AuthorForm = (props) => {
    const { backToListHandler, heading, imageSRC, buttonAction, onAuthorChange, initialAuthorData} = props

    const [author, setAuthor] = useState(initialAuthorData);   
    const [imageSrc, setImageSrc] = useState(imageSRC);



    const handleSubmit = (event) => {
        event.preventDefault();
        onAuthorChange(author);
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
            setAuthor({ ...author, photoPath: fileURL });
            //setAuthor({ ...author, photoFile: file.name });
            //console.log("file : ", file);
        } else {
            setAuthor({ ...author, photoPath: "" });
        }
    }

    const handleChangeDate = date => {       
        setAuthor({ ...author, dateOfBirth: date });
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
                <h4>{heading}</h4>
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
                        <DatePicker className="form-control"
                            selected={author.dateOfBirth}
                            placeholderText="Select Date"
                            showPopperArrow={false}
                            onChange={handleChangeDate}
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
                        <img src={imageSrc === "" ? imageSRC : imageSrc} style={{ height: "200px" }} alt="" />
                    </div>
                    <hr />
                    <div className="form-group">
                        <button type="submit" className="btn btn-secondary btn-block"><strong>{buttonAction}</strong></button>
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