import { useForm } from "react-hook-form";
import InputRow from "../ui/InputRow";
import { addUser } from "../utils/user";
import toast from "react-hot-toast";

function AddUser() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setError,
  } = useForm();

  async function onSubmit(data) {
    const toastId = toast.loading("creating user", { duration: 5000 });
    const response = await addUser(data);
    toast.dismiss(toastId);
    if (!response?.error) {
      toast.success("user Created successfully");
      return;
    }
    toast.error("error creating user");
    setError(response.field, { message: response.error });
  }

  return (
    <div>
      <h2 className=" pt-6 text-center text-2xl  font-bold uppercase sm:text-3xl md:pt-10 md:text-3xl lg:text-4xl">
        Add user
      </h2>
      <form
        className=" flex h-full flex-col px-[5%] pt-4 "
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className=" mt-4 flex grow flex-col gap-4 rounded-3xl sm:mt-10   ">
          <InputRow
            fieldName={"name"}
            type={"text"}
            register={{
              ...register("name", {
                required: { value: true, message: "field required" },

                minLength: {
                  value: 3,
                  message: "name must be 3 or more characters",
                },
                maxLength: {
                  value: 20,
                  message: "name must be 20 or less characters",
                },
              }),
            }}
            error={errors?.name?.message}
          />
          <InputRow
            fieldName={"email"}
            type={"email"}
            error={errors?.email?.message}
            register={{
              ...register("email", {
                required: { value: true, message: "field required" },

                pattern: {
                  value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
                  message: "please provide a valid email",
                },
              }),
            }}
          />
          <InputRow
            fieldName={"password"}
            type={"password"}
            error={errors?.password?.message}
            register={{
              ...register("password", {
                required: { value: true, message: "field required" },
                minLength: {
                  value: 8,
                  message: "password must be 8 or more characters",
                },
                maxLength: {
                  value: 30,
                  message: "password must be 30 or less characters",
                },
              }),
            }}
          />
          <InputRow
            fieldName={"confirmPassword"}
            type={"password"}
            error={errors?.confirmPassword?.message}
            register={{
              ...register("confirmPassword", {
                required: { value: true, message: "field required" },

                validate: (data) => {
                  return (
                    data === getValues("password") || "password does not match"
                  );
                },
              }),
            }}
          />
          <button className=" text-bold ml-auto mr-4 mt-4 w-fit rounded-full bg-main-500 px-4 py-2 font-bold uppercase text-[#fff] hover:bg-main-400 sm:px-6 sm:py-4 sm:text-xl lg:text-2xl">
            add user
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddUser;
