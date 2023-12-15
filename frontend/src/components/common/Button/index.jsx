import React from "react"
import "./styles.css"

const Button = ({ text, handleOnClick, type }) => {
    return (
        <button
            type={type}
            className='btn btn-primary'
            onClick={(e) => {
                e.preventDefault()
                handleOnClick(e)
            }}>
            {text}
        </button>
    )
}

export default Button
