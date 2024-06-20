import { useForm } from "react-hook-form";
import Header from "../ui/Header";
import InputRow from "../ui/InputRow";
import Loader from "../ui/Loader";

import useUser from "../hooks/user/useUser";
import { useNavigate } from "react-router-dom";
import useLogin from "../hooks/user/useLogin";

function Login() {
  const { user, isLoadingUser } = useUser();
  const navigate = useNavigate();
  if (!isLoadingUser && user?.email) navigate("/overview");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { login, isLoading, response } = useLogin();

  return (
    <div className=" grid h-[100vh] grid-rows-[auto_1fr] bg-stone-50 dark:bg-main-900 dark:text-[#fff]">
      <div className=" grid grid-cols-2 ">
        <div className="h-full py-20">
          <img
            src="/beautiful-alternative-energy-plant-with-solar-panels.jpg"
            alt="solar panel img"
            className=" h-full rounded-r-[3rem]    object-cover  brightness-75"
          />
        </div>

        {isLoadingUser ? (
          <Loader />
        ) : (
          <form
            className=" flex h-full flex-col px-[2%] py-20 "
            onSubmit={handleSubmit(login)}
          >
            <div className=" mt-10 flex grow flex-col gap-4 rounded-3xl  px-8 py-16  ">
              <h3 className="   text-4xl font-bold  ">
                <span className="mb-2 block text-7xl">Welcome back!</span>
                Please log in to access your solar panel dashboard.
              </h3>

              <p className=" mb-8 text-lg tracking-wide text-gray-600 dark:text-gray-400">
                Monitor, analyze, and optimize your solar panel system. Sign in
                now.
              </p>
              <InputRow
                fieldName={"email"}
                type={"email"}
                register={{ ...register("email") }}
                error={response}
              />
              <InputRow
                fieldName={"password"}
                type={"password"}
                register={{ ...register("password") }}
              />
              <button
                className=" text-bold ml-auto mr-4 mt-4 w-fit rounded-full  bg-main-500 px-8 py-4 text-3xl font-bold text-[#fff] hover:bg-main-400"
                disabled={isLoading}
              >
                Login
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default Login;
