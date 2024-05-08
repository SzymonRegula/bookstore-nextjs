import classes from "./Button.module.css";

function Button({
  children,
  onClick,
  type,
  variant = "primary",
  disabled = false,
}) {
  const btnClasses = `${classes.btn} ${classes[`btn-${variant}`]}`;

  return (
    <button
      className={btnClasses}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default Button;
