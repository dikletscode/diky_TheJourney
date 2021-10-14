import loading from "../assets/loading.gif";

const Loading = ({ style }: { style?: string }) => {
  return (
    <div
      className={`bg-base self-center justify-self-center w-full mx-auto ${style} flex items-center flex-col mb-24 `}
    >
      <img src={loading} alt="" className="mx-auto object-contain" />
    </div>
  );
};
export default Loading;
