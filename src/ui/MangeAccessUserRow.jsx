import { FaTimes } from "react-icons/fa";
import useUser from "../hooks/user/useUser";
import useRemoveViewer from "../hooks/panels/panel-access/useRemoveViewer";
import toast from "react-hot-toast";
import Modal from "./Modal";
import { useParams } from "react-router-dom";

export function MangeAccessUserRow({ user: { email, photo, name, _id: id } }) {
  const { user: currentUser, isLoading: isLoadingUser } = useUser();

  const { id: panelId } = useParams();
  const { removeViewer, isLoading } = useRemoveViewer();

  if (isLoadingUser) return;

  async function remove() {
    const toastId = toast.loading("removing user from panel", {
      duration: 5000,
    });
    const res = await removeViewer({ panel: panelId, user: id });

    toast.dismiss(toastId);
    if (!res?.error) {
      toast.success("user removed ");
      return;
    }

    toast.error("error removing user ");
  }

  const canRemove = currentUser?._id !== id;
  return (
    <>
      <div className=" mx-auto flex items-center  sm:mx-0">
        <img
          src={photo || "/no-picture.webp"}
          alt={name}
          className=" h-12 w-12 rounded-full sm:h-16 sm:w-16"
        />
        <p className=" ml-4">{name}</p>
      </div>
      <p className=" mx-auto italic opacity-80 sm:mx-0 ">{email}</p>
      <div className=" mb-8 flex justify-center gap-4 text-2xl font-bold">
        {canRemove && (
          <Modal>
            <Modal.Open>
              <button className=" rounded-lg border-2 border-main-100 p-2 transition-colors dark:border-main-700  ">
                <FaTimes className=" text-red-500" />
              </button>
            </Modal.Open>

            <Modal.Window
              title={`Are you sure you want to remove ${name} from panel observers ?`}
            >
              <div className=" flex flex-col-reverse items-end justify-end sm:flex-row">
                <Modal.Close>
                  <button className=" text-bold  mr-4 mt-4 w-fit rounded-full  bg-gray-500 px-4 py-2 text-lg font-bold text-[#fff]  hover:bg-gray-600 md:px-8 md:py-4 md:text-xl lg:text-2xl">
                    cancel
                  </button>
                </Modal.Close>
                <Modal.Close>
                  <button
                    className=" text-bold  mr-4 mt-4 w-fit rounded-full bg-red-500  px-4 py-2 text-lg font-bold text-[#fff]  hover:bg-red-600 md:px-8 md:py-4 md:text-xl lg:text-2xl"
                    onClick={remove}
                    disabled={isLoading}
                  >
                    Remove
                  </button>
                </Modal.Close>
              </div>
            </Modal.Window>
          </Modal>
        )}
      </div>
    </>
  );
}
