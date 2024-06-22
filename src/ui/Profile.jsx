import { MdEdit } from "react-icons/md";
import Modal from "./Modal";
import InputRow from "./InputRow";
import { useForm } from "react-hook-form";
import useUser from "../hooks/user/useUser";
import Loader from "./Loader";
import useUpdateUser from "../hooks/user/useUpdateUser";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function Profile() {
  const { user, isLoading } = useUser();

  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors },
  } = useForm();
  const { update, isLoading: isUpdating, response } = useUpdateUser();
  const navigate = useNavigate();

  async function handleValid(data) {
    const toastId = toast.loading("updating ", { duration: 5000 });
    const res = await update(data);

    toast.dismiss(toastId);
    if (res?.status === "success") {
      toast.success("  successfully  updated");
      resetField("photo");
    } else toast.error("error updating ");
  }

  if (isLoading) return <Loader />;

  return (
    <div className=" relative m-10 mx-auto  flex w-[100%] flex-col items-center overflow-hidden rounded-3xl border-2 p-6   text-center dark:border-main-700 sm:w-[70%]   sm:flex-row sm:justify-start sm:p-0  sm:pr-16  lg:w-[70%]">
      <img
        src={user?.photo || "/no-picture.webp"}
        alt="profile "
        className="  h-40 w-40 rounded-full object-cover sm:h-60 sm:w-[40%]  sm:rounded-none sm:rounded-r-3xl"
      />

      <div className=" mt-4 grow">
        <h2 className=" mb-4 mt-4 text-2xl font-bold lg:text-4xl 2xl:text-3xl ">
          {user?.name}
        </h2>
        <p className=" text-xl text-gray-400">test@test.com</p>

        <Modal>
          <Modal.Window title={"edit account"}>
            <form
              className="flex flex-col gap-6 sm:gap-10"
              onSubmit={handleSubmit(handleValid)}
            >
              <InputRow
                fieldName={"photo"}
                type={"file"}
                register={{
                  ...register("photo"),
                }}
                error={response?.error}
              />

              <InputRow
                fieldName={"name"}
                type={"text"}
                register={{
                  ...register("name", {
                    required: { value: true, message: "field required" },
                    value: user?.name,

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

              <div className=" flex flex-col-reverse justify-end gap-4 sm:flex-row sm:gap-6 ">
                <Modal.Close>
                  <button
                    type="reset"
                    className=" text-bold mr-4 rounded-full bg-red-500 px-4 py-2 text-lg  font-bold text-[#fff] hover:bg-red-600 sm:mt-4 sm:px-8 sm:py-4 sm:text-3xl"
                  >
                    Cancel
                  </button>
                </Modal.Close>
                <button className=" text-bold mr-4 rounded-full bg-main-500 px-4 py-2 text-lg  font-bold text-[#fff] hover:bg-main-400 sm:mt-4 sm:px-8 sm:py-4 sm:text-3xl">
                  Update
                </button>
              </div>
            </form>
          </Modal.Window>
          <Modal.Open>
            <button className=" absolute right-4 top-4 transform text-4xl transition-transform hover:scale-110  hover:text-main-500">
              <MdEdit />
            </button>
          </Modal.Open>
        </Modal>
      </div>
    </div>
  );
}

export default Profile;
