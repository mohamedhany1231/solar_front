import { useNavigate, useRouteError } from "react-router-dom";

function ErrorFallback({}) {
  const error = useRouteError();
  const navigate = useNavigate();
  return (
    <>
      <div className="flex h-screen items-center justify-center bg-gray-50 p-12">
        <div className="flex flex-col items-center rounded-md bg-gray-900 p-12 text-white shadow-md">
          <h1 className=" mb-5">Something went wrong </h1>
          <p className="mb-8  text-gray-400">{error.message}</p>
          <button
            type="button"
            className="rounded-md bg-blue-500 px-4 py-2 text-white shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            onClick={() => navigate(-1)}
          >
            go back
          </button>
        </div>
      </div>
    </>
  );
}

export default ErrorFallback;
