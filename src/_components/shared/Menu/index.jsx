import React, {memo} from 'react';
import {Menu} from '@mui/material';

function MenuPopup({
    anchor,
    closeMenu,
    menuItems,
    renderItem,
}) {
    return (
        <Menu
            anchorEl={anchor}
            open={Boolean(anchor)}
            onClose={closeMenu}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
            sx={{
                '& .MuiPaper-root': {
                    boxShadow:
                        '1px 2px 5px rgba(0,0,0,0.05)',
                },
            }}
            MenuListProps={{
                'aria-labelledby': 'basic-button',
            }}
        >
            {menuItems.map(renderItem)}
        </Menu>
    );
}

export default memo(MenuPopup);
