import React from 'react';
 

const Pagination = ({ recipesPerPage, totalRecipes, paginate, currentPage }) => {
 const pageNumbers = [];


 for (let i = 1; i <= Math.ceil(totalRecipes / recipesPerPage); i++) {
 pageNumbers.push(i);
 }


 return (
 <nav className="flex justify-center mt-4">
 <ul className="flex list-style-none">
 {pageNumbers.map((number) => (
 <li key={number} className="page-item">
 <button
 onClick={() => paginate(number)}
 className={`page-link px-4 py-2 mx-1 rounded  ${
 currentPage === number
 ? 'bg-blue-500 text-white'
 : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
 }`}
 >
 {number}
 </button>
 </li>
 ))}
 </ul>
 </nav>
 );
};


export default Pagination;
