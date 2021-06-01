import React, { useState } from 'react';

export const InputImage = (props) => {
    const [baseImage, setBaseImage] = useState('');
    const {imageHandler } = props;

    UploadImage = async (event) => {
        const file = event.target.files[0];
        imageSource = await ConvertBase64(file);
        setBaseImage(base64);
    }

    const ConvertBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);

            fileReader.onload = () => {
                resolve(file.result);
            };

            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    }

    return (
        <div>
            <input
                type="file"
                value={file}
                onChange={imageHandler}
            />
        </div>
    );
}
