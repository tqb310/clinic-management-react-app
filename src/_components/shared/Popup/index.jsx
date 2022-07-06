import React, {useEffect} from 'react';
import './index.scss';
function Popup({children, isOpen, onClose}) {
    useEffect(() => {
        window.addEventListener('click', onClose);
        return () => {
            window.removeEventListener('click', onClose);
        };
    }, []);
    const handleClick = e => {
        e.stopPropagation();
    };
    return (
        <div
            className={`popup-container ${
                isOpen ? 'open' : ''
            }`}
            onClick={handleClick}
        >
            {children}
        </div>
    );
}

export default Popup;
