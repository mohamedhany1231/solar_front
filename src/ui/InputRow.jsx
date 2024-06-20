function InputRow({ fieldName, register, type, error, value }) {
  return (
    <div className=" text-base sm:text-lg md:text-xl ">
      <div className=" flex justify-between">
        <label className=" mb-2 block pl-4 capitalize">
          {fieldName === "confirmPassword" ? "confirm password" : fieldName}
        </label>
        {error && (
          <p className=" ml-auto  inline-block text-sm  font-bold text-red-500   sm:text-base md:text-lg lg:text-xl ">
            ** {error} **
          </p>
        )}
      </div>

      <input
        type={type}
        value={value}
        className=" block w-full  rounded-[2rem]  border-2 border-main-800 bg-main-50 bg-opacity-50 px-3 py-1 outline-none focus:border-main-400 dark:border-main-800 dark:bg-main-800 dark:focus:border-main-600  sm:px-6 sm:py-2"
        {...register}
      ></input>
    </div>
  );
}
export default InputRow;

//   <p className="text-#f0f0f0  my-4 rounded-3xl border bg-red-400 px-6 py-2 text-xl font-bold dark:border-red-100">
// ** {error} **
// </p>
