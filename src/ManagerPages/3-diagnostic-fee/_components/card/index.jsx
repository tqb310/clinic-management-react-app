import React from 'react'
import CardMedia from '@mui/material/CardMedia'
import './index.scss'


function Card({ name, data, icon, color }) {
    return (
        <div style={{backgroundColor:color}} className='fee-card'>
            <div>
                <p>{data}</p>
                <p>{name}</p>
            </div>
            {(icon != null)&&<img src={icon} alt={name}></img>}
        </div>
    )
}

export default Card
