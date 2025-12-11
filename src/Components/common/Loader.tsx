// Loader component
import React from 'react';

interface LoaderProps {
  fullPage?: boolean;
  message?: string;
}

export const Loader: React.FC<LoaderProps> = ({ fullPage = false, message = 'Loading...' }) => {
  const content = (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="w-12 h-12 border-4 border-gray-300 border-t-primary-500 rounded-full animate-spin"></div>
      <p className="text-gray-600">{message}</p>
    </div>
  );

  if (fullPage) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-80 z-50">
        {content}
      </div>
    );
  }

  return <div className="flex justify-center items-center py-12">{content}</div>;
};
