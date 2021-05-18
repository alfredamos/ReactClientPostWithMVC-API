import React, { useState } from 'react';

export const InputImage = ({ base64, UploadImage }) => {
    const [baseImage, setBaseImage] = useState('');

    UploadImage = async (event) => {
        const file = event.target.files[0];
        base64 = await ConvertBase64(file);
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
        <input
            type="file"
            value={file}          
        />
    );
}
