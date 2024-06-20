import { useParams } from "react-router-dom";
import InputRow from "./InputRow";
import { useForm } from "react-hook-form";
import useAddViewer from "../hooks/panels/panel-access/useAddViewer";
import toast from "react-hot-toast";

export function AddPanelViewer() {
  const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
  } = useForm();

  const { id } = useParams();

  const { addViewer, isLoading } = useAddViewer(id);

  async function add(data) {
    const toastId = toast.loading("adding user to panel", { duration: 5000 });
    const res = await addViewer({ panel: id, email: data.email });
    toast.dismiss(toastId);
    if (!res?.error) {
      toast.success("user added successfully");
      return;
    }

    setError("email", { message: res.error });
    toast.error("error adding user ");
  }

  return (
    <div>
      <h4 className=" mt-4 text-center text-xl font-bold sm:text-2xl">
        Add viewer to panel
      </h4>
      <form
        className="flex  flex-col gap-2 sm:flex-row  sm:items-end sm:gap-8"
        onSubmit={handleSubmit(add)}
      >
        <div className=" grow ">
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
        </div>
        <button
          disabled={isLoading}
          className=" text-bold ml-auto mr-4 mt-4 w-fit translate-y-[-2px] rounded-full bg-main-500 px-4 py-2 font-bold uppercase text-[#fff]  hover:bg-main-400 sm:text-lg lg:text-xl"
        >
          add user
        </button>
      </form>
    </div>
  );
}
