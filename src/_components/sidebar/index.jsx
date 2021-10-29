import React, {useState} from 'react'
import PropTypes from 'prop-types'
import {NavLink, useRouteMatch} from 'react-router-dom';
import {Tooltip} from '@mui/material';
import './index.scss';


const iconStyles = {
    color: '#A0A4A8',
    fontSize: 30,
    transition: 'all .3s',
    '&:hover': {
        transform: 'scale(1.2,1.2)',
    }
}

const activeIconStyles = {
    ...iconStyles,
    color: 'white',
    backgroundColor: '#2E3192',
    transform: 'scale(1.2,1.2)',
    boxShadow: '0px 4px 20px #2E3192',
    '&:hover': {}
}

function SideBar({routes}) {       
    const {path} = useRouteMatch();
    // console.log(path);
    const [selectedTab, setSelectedTab] = useState(0);
    return (
        <div>
            <ul className="sidebar">
                {
                    routes.map((route, index) => {
                        const {id, path: childPath, name, icon: Icon} = route;                        
                        return (
                            <li key={id} className="sidebar__item">
                                <NavLink to={`${path + childPath}`} isActive={(match, location) => {
                                        if(match){
                                            setSelectedTab(index);
                                        }
                                }}>
                                    <Tooltip title={name} followCursor arrow>
                                        <Icon sx={selectedTab === index ? activeIconStyles : iconStyles}/>
                                    </Tooltip>
                                </NavLink>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}

SideBar.propTypes = {
    routes: PropTypes.arrayOf(
        PropTypes.shape({
            path: PropTypes.string,
            name: PropTypes.string,
            public: PropTypes.bool,
            exact: PropTypes.bool,
            component: PropTypes.object,
            icon: PropTypes.object
        })
    )
}

export default SideBar

