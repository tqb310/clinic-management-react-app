import React, {useState} from 'react';
// import PropTypes from 'prop-types'
import {Box} from '@mui/material';
// import {Search, FilterAlt} from '@mui/icons-material';
import {CustomPaper} from '_components/shared/StyledComponent';
import './index.scss';

function TabTableWrapper({tabNameArr, children, ...rest}) {
    const [selectedItem, setSelectedItem] = useState(0);
    const onClickItem = index => {
        return () => setSelectedItem(index);
    };
    return (
        <CustomPaper className="TabTableWrapper" {...rest}>
            <Box className="TabTableWrapper__tablabel">
                {tabNameArr.map((item, index) => (
                    <Box
                        key={index}
                        className={`TabTableWrapper__tabItem ${
                            selectedItem === index
                                ? 'active'
                                : ''
                        }`}
                        onClick={onClickItem(index)}
                    >
                        <span>{item.title}</span>
                        {item.number && (
                            <span className="TabTableWrapper__tabItemBadge">
                                {item.number}
                            </span>
                        )}
                    </Box>
                ))}
            </Box>
            <Box className="TabTableWrapper__table">
                {children && children(selectedItem)}
            </Box>
        </CustomPaper>
    );
}

TabTableWrapper.propTypes = {};

export default TabTableWrapper;
