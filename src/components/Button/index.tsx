const Button = ({
  color,
  hoverColor,
  hoverTextColor,
  text,
  textColor,
  border,
  borderColor,
}: any) => {
  return (
    <button
      className={`${color} 
        hover:${hoverColor}
        hover:${hoverTextColor}
        h-12 
        max-md:w-[20.813rem] 
        md:w-36 
        rounded ${textColor} 
        font-semibold 
        text-base ${border} 
        ${borderColor}`}
    >
      {text}
    </button>
  );
};

export default Button;
