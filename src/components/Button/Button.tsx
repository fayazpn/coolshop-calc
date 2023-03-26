import { ButtonProps } from "../../shared/AppInterface";
import "./Button.scss";

const Button = ({ children, onClick, variant, disabled }: ButtonProps) => {
  return (
    <button
      className={`button-style ${variant}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
