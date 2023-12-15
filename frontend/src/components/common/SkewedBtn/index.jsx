import React from "react"
import "./styles.css"

const SkewedBtn = ({ text }) => {
    return (
        <button className='btn-skewd'>
            {text}
            <span className='btn-skewd-bg'>
                <span className='btn-skewd-bg-on-hover'></span>
            </span>
        </button>
    )
}

export default SkewedBtn
