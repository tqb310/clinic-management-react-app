import React, {createContext, useContext} from 'react';
import './index.scss';
// import PropTypes from 'prop-types'
const Context = createContext();

export function CustomRadioGroup({
    children,
    onChange,
    value: finalValue,
    name,
    minTime,
    placedList,
    selectDate,
}) {
    //   const onChange = () => {};
    return (
        <Context.Provider
            value={{
                onChange,
                finalValue,
                name,
                minTime,
                placedList,
                selectDate,
            }}
        >
            {children}
        </Context.Provider>
    );
}

export function CustomRadio({id, value, label}) {
    const {
        onChange,
        finalValue,
        name,
        minTime,
        placedList,
        selectDate,
    } = useContext(Context);
    const date = selectDate || new Date();
    return (
        <div className="CustomRadio__container">
            <input
                id={id}
                name={name}
                type="radio"
                value={value}
                checked={finalValue === value}
                onChange={onChange}
                className="CustomRadio__input"
                disabled={
                    new Date(
                        date.toLocaleDateString() +
                            ' ' +
                            value,
                    ).getTime() < minTime.getTime() ||
                    placedList.includes(value)
                }
            />
            <label htmlFor={id}>{label}</label>
        </div>
    );
}

CustomRadio.propTypes = {};
