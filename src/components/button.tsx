const Button = ({
  klik,
  inner,
  color,
}: {
  klik: () => void;
  inner: string;
  color?: string;
}) => {
  return (
    <div className={`w-28  ${color}  h-9 flex items-center justify-center`}>
      <button className="p-5" onClick={klik}>
        {inner}
      </button>
    </div>
  );
};
export default Button;
