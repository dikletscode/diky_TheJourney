import React, { ChangeEvent, FC } from "react";
const FormInput: FC<{
  field: string;
  type: string;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}> = ({ field, type, value, onChange }) => {
  return (
    <div className="mb-6">
      <label
        htmlFor={field}
        className="block mb-2 text-sm text-gray-600 dark:text-gray-400"
      >
        {field}
      </label>
      <input
        type={type}
        name={field}
        id={field}
        value={value}
        onChange={onChange}
        className="w-full px-3  py-2 placeholder-gray-300 border border-red-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
      />
    </div>
  );
};
export default FormInput;
