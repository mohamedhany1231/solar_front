import useLogout from "../hooks/user/useLogout";
import Modal from "./Modal";

export function LogoutButton() {
  const { logout, isLoading } = useLogout();
  return (
    <Modal>
      <Modal.Open>
        <button className=" text-bold ml-auto mr-4 mt-4 w-fit rounded-full  bg-red-500 px-8 py-4 text-3xl font-bold text-[#fff] hover:bg-red-600">
          Logout
        </button>
      </Modal.Open>
      <Modal.Window title={"Are you sure you want to log out ? "}>
        <div className=" flex flex-col-reverse items-end justify-end sm:flex-row">
          <Modal.Close>
            <button className=" text-bold  mr-4 mt-4 w-fit rounded-full  bg-gray-500 px-4 py-2 text-lg font-bold text-[#fff]  hover:bg-gray-600 md:px-8 md:py-4 md:text-xl lg:text-2xl">
              cancel
            </button>
          </Modal.Close>
          <div>
            <button
              className=" text-bold  mr-4 mt-4 w-fit rounded-full bg-red-500  px-4 py-2 text-lg font-bold text-[#fff]  hover:bg-red-600 md:px-8 md:py-4 md:text-xl lg:text-2xl"
              onClick={logout}
              disabled={isLoading}
            >
              Logout
            </button>
          </div>
        </div>
      </Modal.Window>
    </Modal>
  );
}
