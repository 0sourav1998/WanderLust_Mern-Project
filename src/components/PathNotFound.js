import React from 'react';
import { Link } from 'react-router-dom';

const PathNotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-xl mb-8">Oops! The page you’re looking for doesn’t exist.</p>
      <Link to="/" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Go Back Home
      </Link>
    </div>
  );
};

export default PathNotFound;
