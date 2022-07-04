import { FC } from "react";

interface IProps {
  className?: string;
  children: React.ReactNode;
  disabled?: boolean;
  onClick?: () => void;
  type: "button" | "submit" | "reset";
}

const Button: FC<IProps> = ({
  className,
  children,
  disabled = false,
  onClick = undefined,
  type = "button",
}) => (
  <button
    className={className}
    disabled={disabled}
    onClick={onClick}
    type={type}
  >
    {children}
  </button>
);

export default Button;
