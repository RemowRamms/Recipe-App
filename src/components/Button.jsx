import React from 'react';

const Button = ({ title, btnType, containerStyle, onClick }) => {
  return (
    <button
      type={btnType || 'button'}
      className={`inline-flex items-center bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:from-yellow-600 hover:to-orange-600 transform hover:-translate-y-1 transition-all duration-200 ${containerStyle}`}
      onClick={onClick}
    >
      {title}
    </button>
  );
};

export default Button;
