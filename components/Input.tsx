import React from 'react';

interface InputProps {
  name: string;
  type: string;
  placeholder: string;
  required?: boolean;
  errors?: string[];
  icon?: React.ReactNode;
}

export default function Input({
  name,
  type,
  placeholder,
  required,
  errors,
  icon
}: InputProps) {
  return (
    <div>
      <div className='relative'>
        <input
          name={name}
          type={type}
          placeholder={placeholder}
          required={required}
          className={`border rounded-full py-3 px-5 ${
            icon ? 'pl-12' : ''
          } placeholder:text-gray-300 w-full ${
            errors?.length ? 'border-red-500' : ''
          }`}
        />

        {icon && <span className='absolute left-4 top-3.5'>{icon}</span>}
      </div>

      {errors?.map((error, index) => (
        <span key={index} className='flex text-red-500 pl-4 py-1'>
          {error}
        </span>
      ))}
    </div>
  );
}
