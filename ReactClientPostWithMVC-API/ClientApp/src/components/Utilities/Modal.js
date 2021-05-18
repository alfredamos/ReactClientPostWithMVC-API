import React from 'react';


export const Modal = (props) => {

    const deleteHandler = () => {
        console.log("I'm in onDelete")
        props.onDelete;
    }

    const cancelHandler = () => {
        console.log("I'm in onCancel")
        props.onCancel;
    }

    return (
        <>
            <br />
            <br/>
        <div className="modal">
            <p>Are you sure?</p>
            <button className="btn btn-danger" onClick={deleteHandler}>Confirm Delete</button>
            <button className="btn btn-warning" onClick={cancelHandler}>Cancel</button>
            </div>
       </>
    ); 
}