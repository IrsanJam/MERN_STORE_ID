import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="flex flex-col gap-6 h-screen justify-center items-center">
        <div className="flex">
          <span className="text-4xl font-bold">
            404 | <span>NOT FOUND 😢</span>
          </span>
        </div>

        <p className="font-Poppins text-slate-400">Page not found, click the button for coming back to home</p>
        <button className="bg-blue-400 text-white px-5 py-2 rounded-md" onClick={() => navigate("/")}>
          Home
        </button>
      </div>
    </>
  );
};

export default NotFound;
