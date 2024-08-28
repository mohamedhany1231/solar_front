import { useForm } from "react-hook-form";
import Header from "../ui/Header";
import InputRow from "../ui/InputRow";
import Loader from "../ui/Loader";

import useUser from "../hooks/user/useUser";
import { useNavigate } from "react-router-dom";
import useLogin from "../hooks/user/useLogin";
import { useWindowWidth } from "@react-hook/window-size";
import toast from "react-hot-toast";
import { useRef } from "react";

function Login() {
  const { user, isLoadingUser } = useUser();
  const navigate = useNavigate();
  if (!isLoadingUser && user?.email) navigate("/overview");
  const toastId = useRef(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const width = useWindowWidth();
  const isLargeScreen = width >= 1024;

  const { login, isLoading, response } = useLogin();

  async function onSubmit(data) {
    toast.dismiss(toastId.current);
    toastId.current = toast.loading("logging in", { duration: 10000 });
    const response = await login(data);
    toast.dismiss(toastId.current);
    if (!response?.error) {
      toastId.current = toast.success("logged in");
      return;
    }
    toastId.current = toast.error("error logging in");
  }

  return (
    <div className=" grid h-[100vh] grid-rows-[auto_1fr]  bg-main-900 text-[#fff]">
      <div className=" grid grid-cols-1 overflow-auto lg:grid-cols-2 ">
        {isLargeScreen && (
          <div className="h-full py-20">
            <img
              src="/beautiful-alternative-energy-plant-with-solar-panels.jpg"
              alt="solar panel img"
              className=" h-full rounded-r-[3rem]    object-cover  brightness-75"
            />
          </div>
        )}

        {isLoadingUser ? (
          <Loader />
        ) : (
          <form
            className=" flex h-full flex-col px-[2%] py-8 lg:py-20 "
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className=" mt-10 flex grow flex-col gap-4 rounded-3xl  px-8  lg:py-16  ">
              <h3 className="  text-2xl font-bold md:text-3xl lg:text-4xl  ">
                <span className=" mb-4 block text-3xl sm:text-4xl md:text-5xl lg:mb-2  lg:text-7xl">
                  Welcome back!
                </span>
                Please log in to access your solar panel dashboard.
              </h3>

              <p className=" mb-8 text-base tracking-wide text-gray-400 md:text-lg">
                Monitor, analyze, and optimize your solar panel system. Sign in
                now.
              </p>
              <InputRow
                fieldName={"email"}
                type={"email"}
                register={{ ...register("email") }}
                error={response?.error}
                disableDarkMode={true}
                value={"test@test.com"}
              />
              <InputRow
                fieldName={"password"}
                type={"password"}
                register={{ ...register("password") }}
                disableDarkMode={true}
                value={"test1234"}
              />
              <button
                className=" text-bold ml-auto mr-4 mt-4 w-fit rounded-full bg-main-500  px-8 py-4 text-3xl font-bold text-[#fff] hover:bg-main-400 disabled:bg-main-300"
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
