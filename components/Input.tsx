import React, { InputHTMLAttributes } from 'react';

interface InputProps {
  name: string;
  errors?: string[];
  icon?: React.ReactNode;
}

export default function Input({
  name,
  errors = [],
  icon,
  ...rest
}: InputProps & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <div className='relative'>
        <input
          name={name}
          className={`border rounded-full py-3 px-5 ${
            icon ? 'pl-12' : ''
          } placeholder:text-gray-300 w-full ${
            errors?.length ? 'border-red-500' : ''
          }`}
          {...rest}
        />

        {icon && <span className='absolute left-4 top-3.5'>{icon}</span>}
      </div>

      {errors.map((error, index) => (
        <span key={index} className='flex text-red-500 pl-4 py-1'>
          {error}
        </span>
      ))}
    </div>
  );
}
