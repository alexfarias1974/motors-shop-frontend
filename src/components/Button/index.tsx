const Button = ({ color, text, textColor }: any) => {
  return (
    <button
      className={`${color} h-12 w-36 rounded ${textColor} font-inter font-semibold text-base`}
    >
      {text}
    </button>
  );
};

export default Button;
