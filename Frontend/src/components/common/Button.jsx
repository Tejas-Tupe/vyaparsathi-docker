import React from "react";
import "./common.css"; // Global styles for common components

const Button = ({
  children,
  onClick,
  type = "button",
  variant = "primary",
  loading = false,
  className = "",
  disabled = false,
  auto = false,
  text,
  ...rest
}) => {
  const baseClass = "common-btn";
  const buttonClass = `${baseClass} ${baseClass}-${variant} ${className}`;

  if (auto) {
    return (
      <button
        className={buttonClass}
        type={type}
        disabled={loading || disabled}
        onClick={onClick}
        {...rest}
      >
        {loading ? "Loading..." : text}
      </button>
    );
  }

  return (
    <button
      className={buttonClass}
      onClick={onClick}
      type={type}
      disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
