import React from 'react';
import './common.css';

const InputField = ({
  label,
  id,
  type = 'text',
  value,
  onChange,
  placeholder,
  required = false,
  auto = false,
  name,
  register, // optional for react-hook-form
  className = '',
  ...rest
}) => {
  if (auto && register && name) {
    return (
      <div className={`input-field-container ${className}`}>
        {label && <label htmlFor={id || name} className="input-label">{label}</label>}
        <input
          id={id || name}
          {...register(name, { required })}
          placeholder={placeholder}
          type={type}
          className="common-input"
          {...rest}
        />
      </div>
    );
  }

  // manual mode
  return (
    <div className={`input-field-container ${className}`}>
      {label && <label htmlFor={id} className="input-label">{label}</label>}
      <input
        id={id || name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="common-input"
        {...rest}
      />
    </div>
  );
};

export default InputField;