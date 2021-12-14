import React, { createContext, useContext } from "react";
import './index.scss';
// import PropTypes from 'prop-types'
const Context = createContext();

export function CustomRadioGroup({ children, onChange, value: finalValue, name }) {
//   const onChange = () => {};
  return (
    <Context.Provider value={{ onChange, finalValue, name }}>
      {children}
    </Context.Provider>
  );
}

export function CustomRadio({ id, value, label }) {
  const { onChange, finalValue, name } = useContext(Context);
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
      />
      <label htmlFor={id}>{label}</label>
    </div>
  );
}

CustomRadio.propTypes = {};
