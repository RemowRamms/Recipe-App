import React from 'react';

const Button = ({ title, btnType, containerStyle, onClick }) => {
  return (
    <button
      type={btnType || 'button'}
      className={`px-4 py-2 rounded-md ${containerStyle}`}
      onClick={onClick}
    >
      {title}
    </button>
  );
};

export default Button;
