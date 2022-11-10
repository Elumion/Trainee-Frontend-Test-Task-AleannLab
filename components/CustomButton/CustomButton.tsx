import React from "react";

interface Props {
  text: string;
  className?: string;
  onClick?: (...args: any[]) => void;
}

export default function CustomButton({ text, className, onClick }: Props) {
  const handleClick = () => {
    if (onClick) onClick();
  };

  return (
    <button
      onClick={handleClick}
      className={`${className} px-[30px] py-[18px] bg-[#384564] rounded-[8px] text-[#ffffff] text-[12px] font-semibold uppercase hover:bg-[#dddddd] hover:text-[#000] hover:border-[1px] hover:px-[29px] hover:py-[17px] hover:border-[#000] active:scale-[0.95]`}
    >
      {text}
    </button>
  );
}
