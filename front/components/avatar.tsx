import React from "react";

const Avatar = ({ value }: { value: string }) => {
  const arr = value.split(" ");
  let avatar = "";
  for (let i of arr) {
    avatar += i[0];
  }
  return (
    <div className="relative inline-flex items-center justify-center w-8 h-8 overflow-hidden bg-gray-200 rounded-full dark:bg-gray-600">
      <span className="font-medium text-gray-600 dark:text-gray-300">
        {avatar}
      </span>
    </div>
  );
};

export default Avatar;
