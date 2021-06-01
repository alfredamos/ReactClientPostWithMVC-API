import React, { useState } from 'react'
import InputImage from '../Utilities/InputImage'

export const TestImage = (props) => {
    const { imageSource, imageHandler } = props;
    return <InputImage imageSource={imageSource} imageHandler={imageHandler} />
}