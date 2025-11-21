import React, { useEffect, useRef } from "react";
import { useState } from "react";

const Dropdown = () => {
  const [isOpen, setIsOpen] = useState(true);
  const dropdownref = useRef(null);

  //   est Practice: It is often safer to listen for mousedown instead of click
  //  for "outside click" detection to improve UX (reacts faster) and avoid bubbling issues with the trigger button.
  const handleOutsideClick = (event) => {
    console.log(event.target);

    if (
      event.target !== dropdownref.current &&
      !dropdownref.current.contains(event.target)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (!isOpen) return;
    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [isOpen]);

  return (
    <div
      ref={dropdownref}
      className="Dropdown-container bg-green-200 w-[500px] h-[200px]"
    >
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="bg-amber-100 border-2 p-1 mb-2"
      >
        Dropdown select option
      </button>
      <div className="bg-yellow-500">
        {isOpen && (
          <div className="flex flex-col">
            {["Option 1", "Option 2", "Option 3"].map((item, index) => (
              <button key={index}>{item}</button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dropdown;
