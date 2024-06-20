import { useParams } from "react-router-dom";
import useEditPanel from "../hooks/panels/useEditPanel";
import InputRow from "./InputRow";
import Loader from "./Loader";
import Modal from "./Modal";
import usePanel from "../hooks/panels/usePanel";
import { useForm } from "react-hook-form";
import { MdEdit } from "react-icons/md";
import toast from "react-hot-toast";

function EditPanel() {
  const { id } = useParams();
  const { panel, isLoading } = usePanel(id);
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setError,
  } = useForm();

  const { editPanel, isLoading: isEditing } = useEditPanel(id);

  if (isLoading) return <Loader />;

  async function handleValid(data) {
    const toastId = toast.loading("editing panel", { duration: 5000 });
    const response = await editPanel({ id, data });
    toast.dismiss(toastId);
    if (!response?.error) {
      toast.success("panel edited");
      return;
    }
    toast.error("error editing panel");
    setError(response.field, { message: response.error });
  }

  return (
    <Modal>
      <Modal.Open>
        <button className=" absolute right-4 top-4 transform text-4xl transition-transform hover:scale-110  hover:text-main-500">
          <MdEdit />
        </button>
      </Modal.Open>
      <Modal.Window title={"edit panel"}>
        <form
          className="flex flex-col gap-6 sm:gap-10"
          onSubmit={handleSubmit(handleValid)}
        >
          <InputRow
            fieldName={"name"}
            type={"text"}
            register={{
              ...register("name", {
                required: { value: true, message: "field required" },
                value: panel.name,

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
            fieldName={"location"}
            type={"text"}
            register={{
              ...register("location", {
                required: { value: true, message: "field required" },
                value: panel.location,

                minLength: {
                  value: 3,
                  message: "name must be 3 or more characters",
                },
                maxLength: {
                  value: 50,
                  message: "name must be 20 or less characters",
                },
              }),
            }}
            error={errors?.location?.message}
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
            <button
              disabled={isEditing}
              className=" text-bold mr-4 rounded-full bg-main-500 px-4 py-2 text-lg  font-bold text-[#fff] hover:bg-main-400 sm:mt-4 sm:px-8 sm:py-4 sm:text-3xl"
            >
              edit
            </button>
          </div>
        </form>
      </Modal.Window>
    </Modal>
  );
}

export default EditPanel;
