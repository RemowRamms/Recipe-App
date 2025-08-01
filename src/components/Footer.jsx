import React from 'react';

const Footer = ({ theme }) => {
  return (
    <footer className={`w-full py-4 mt-8 border-t ${theme === 'dark' ? 'border-gray-700 bg-[#121212]' : 'border-gray-200 bg-white'}`}>
      <div className="container mx-auto px-4 text-center">
        <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
          &copy; {new Date().getFullYear()} Recipe App. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;