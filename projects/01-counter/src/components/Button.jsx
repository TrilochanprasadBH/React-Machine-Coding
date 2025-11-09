import { Children } from "react";

export default function Button({
  children,
  onClick,
  type = "button",
  className,
}) {
  return (
    <button onClick={onClick} className={className}>
      {children}
    </button>
  );
}
