const Button = ({ color, text }: any) => {
  return <button className={`border-2 ${color} w-10`}>{text}</button>;
};

export default Button;
