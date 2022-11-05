import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { createPlaylist } from "../../api/playlist";

export const CreatePlaylist = () => {
  const [playlist, setPlaylist] = useState({
    title: "",
  });
  const [error, setError] = useState();
  const queryClient = useQueryClient();
  const mutation = useMutation(async (playlist) => createPlaylist(playlist), {
    onSuccess: () => {
      queryClient.invalidateQueries(["playlists"]);
      //   navigate("/");
      //   toast.success("Register successfully", {
      //     position: "top-center",
      //     autoClose: 5000,
      //     hideProgressBar: false,
      //     closeOnClick: true,
      //     pauseOnHover: true,
      //     draggable: true,
      //     progress: undefined,
      //     theme: "light",
      //   });
    },
    onError: (error) => {
      setError(error);
    },
  });

  const onChangeHandler = (e) => {
    setPlaylist({ ...playlist, [e.target.name]: e.target.value });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    mutation.mutate(playlist);
    e.target.reset();
  };
  return (
    <>
      <button
        type="button"
        className="mb-3 py-2 px-3 text-white bg-orange-600 rounded-lg hover:bg-orange-400"
        data-bs-toggle="modal"
        data-bs-target="#createPlaylist"
      >
        Create playlist <i className="fa-solid fa-folder-plus"></i>
      </button>

      <div
        className="modal fade fixed top-0 left-0 hidden w-full h-full outline-none overflow-x-hidden overflow-y-auto"
        id="createPlaylist"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="createPlaylistLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog relative w-auto pointer-events-none">
          <div className="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
            <div className="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md">
              <h5
                className="text-xl font-medium leading-normal text-gray-800"
                id="exampleModalLabel"
              >
                Create Playlist
              </h5>
              <button
                type="button"
                className="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body relative p-4">
              <form className="md:p-2" onSubmit={onSubmitHandler}>
                <div className="relative mb-4 ">
                  <input
                    type="text"
                    name="title"
                    className="block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-gray-50 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-orange-600 peer"
                    placeholder=" "
                    onChange={onChangeHandler}
                  />
                  <label
                    htmlFor="floating_filled"
                    className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-2.5 peer-focus:text-orange-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
                  >
                    Playlist Name
                  </label>
                </div>
                {error ? (
                  <div
                    id="alert-2"
                    className="flex rounded-lg dark:bg-red-200 mb-2"
                    role="alert"
                  >
                    <svg
                      aria-hidden="true"
                      class="flex-shrink-0 w-5 h-5 text-red-700 dark:text-red-800"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                    <span className="sr-only">Info</span>
                    <div className="ml-3 text-sm font-medium text-red-700 dark:text-red-800">
                      {error}
                    </div>
                    <button
                      onClick={() => setError(false)}
                      className="ml-auto -mx-1.5 -my-1.5 text-red-500 rounded-lg focus:ring-2 focus:ring-red-400 p-1.5 inline-flex h-8 w-8"
                      data-dismiss-target="#alert-2"
                      aria-label="Close"
                    >
                      <span className="sr-only">Close</span>
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                          clip-rule="evenodd"
                        ></path>
                      </svg>
                    </button>
                  </div>
                ) : null}
                <button className="text-white bg-orange-600 hover:bg-orange-300 focus:ring-0 focus:outline-none rounded-lg w-full px-5 py-2.5 text-center">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
