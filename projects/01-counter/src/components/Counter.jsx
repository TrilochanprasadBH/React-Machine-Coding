import React, { useState } from "react";
import Button from "./Button";

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div className="flex flex-col justify-center items-center text-center bg-gray-100">
      <h1 className="bg-orange-500 p-4 mb-10 w-100">
        Count value is : {count}
      </h1>
      <div className="w-max flex flex-col  gap-2 mt-2">
        <Button
          onClick={() => setCount((prev) => prev + 100)}
          className="bg-green-400 py-2 px-2 rounded-full w-48"
        >
          Increment
        </Button>
        <Button
          onClick={() => setCount((prev) => (prev > 0 ? prev - 100 : 0))}
          className="bg-red-400 py-2 px-2 rounded-full w-48"
        >
          Decrement
        </Button>
      </div>
    </div>
  );
}
