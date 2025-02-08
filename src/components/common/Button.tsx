import React, { MouseEventHandler } from "react";

interface ButtonProps {
  label: string;
  type: "button" | "submit" | "reset";
  kind:
    | "primary"
    | "secondary"
    | "secondary-variation"
    | "outline"
    | "outlineblack"
    | "create"
    | "modal";
  size?: "sm" | "sm-login" | "md" | "lg" | "full";
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

const BUTTON_KINDS: Record<ButtonProps["kind"], string> = {
  primary: "bg-[#B88E2F] text-white font-bold h-[74px]",
  secondary:
    "bg-white text-[#160A60] rounded-[8px] hover:bg-[#5C5A79] hover:text-white",
  "secondary-variation":
    "bg-white text-[#160A60] font-medium rounded-[8px] hover:bg-[#1E293B] hover:text-white",
  outline: "bg-white font-semibold text-[#B88E2F] border border-[#B88E2F]",
  outlineblack:
    "font-poppins text-[20px] text-black border border-[#000000] rounded-[15px] h-[58px]",
  create:
    "bg-[#22C55E] text-white rounded-[8px] border border-[#22C55E] hover:bg-[#5CB77D]",
  modal:
    "flex border border-[#000000] rounded-[50px] h-[30px] items-center justify-center px-6",
};

const BUTTON_SIZES: Record<
  "mobile" | "tablet" | "desktop",
  Record<NonNullable<ButtonProps["size"]>, string>
> = {
  mobile: {
    sm: "w-[205px]",
    "sm-login": "w-[105px]",
    md: "w-[287px]",
    lg: "w-full",
    full: "w-full",
  },
  tablet: {
    sm: "w-[240px]",
    "sm-login": "w-[162px]",
    md: "w-[410px]",
    lg: "w-[489px]",
    full: "w-full",
  },
  desktop: {
    sm: "w-[240px]",
    "sm-login": "w-[240px]",
    md: "w-[410px]",
    lg: "w-[222px]",
    full: "w-full",
  },
};

const getScreenSize = () => {
  if (window.innerWidth <= 540) return "mobile";
  if (window.innerWidth <= 768) return "tablet";
  return "desktop";
};

const Button: React.FC<ButtonProps> = ({
  label,
  type,
  kind,
  size,
  onClick,
}) => {
  const screenSize = getScreenSize();
  const kindClasses = BUTTON_KINDS[kind];
  const sizeClasses = BUTTON_SIZES[screenSize][size];

  const classes = `px-4 py-2 h-12 ${kindClasses} ${sizeClasses}`;

  return (
    <button className={classes} type={type} onClick={onClick}>
      {label}
    </button>
  );
};

export default Button;
