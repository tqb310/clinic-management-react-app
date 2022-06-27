import React, {useState, memo} from 'react';
// import PropTypes from 'prop-types'
import {Box} from '@mui/material';
// import {Search, FilterAlt} from '@mui/icons-material';
import {CustomPaper} from '_components/shared/StyledComponent';
import './index.scss';

function TabTableWrapper({
    tabNameArr,
    children,
    onSwitchTab,
    ...rest
}) {
    const [selectedItem, setSelectedItem] = useState(0);
    const childrenArray = React.Children.toArray(children);

    const onClickItem = index => e => {
        setSelectedItem(index);
        if (onSwitchTab) onSwitchTab(index);
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
                        <span className="TabTableWrapper__tabItemBadge">
                            {item.number}
                        </span>
                    </Box>
                ))}
            </Box>
            <Box className="TabTableWrapper__table">
                {childrenArray && childrenArray.length === 1
                    ? childrenArray[0]
                    : childrenArray[selectedItem]}
            </Box>
        </CustomPaper>
    );
}

TabTableWrapper.propTypes = {};

export default memo(TabTableWrapper);
