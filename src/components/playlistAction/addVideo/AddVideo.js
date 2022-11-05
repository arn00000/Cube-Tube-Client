import { useQuery } from "react-query";
import { getAllPlaylist } from "../../../api/playlist";
import Playlist from "./Playlist";
import { toast } from "react-toastify";

export const AddVideo = ({ id, title }) => {
  const { data, isLoading, isError } = useQuery("playlists", getAllPlaylist);

  const notify = () =>
    toast.warning("Login to access this feature", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  if (!localStorage.getItem("token")) {
    return (
      <button onClick={notify} className="text-orange-600 text-sm md:text-xl">
        <i className="fa-solid fa-plus"></i> Add
      </button>
    );
  }

  if (isLoading) {
    return (
      <button onClick={notify} className="text-orange-600 text-sm md:text-xl">
        <i className="fa-solid fa-plus"></i> Add
      </button>
    );
  }

  if (isError) {
    return (
      <button onClick={notify} className="text-orange-600 text-sm md:text-xl">
        <i className="fa-solid fa-plus"></i> Add
      </button>
    );
  }

  return (
    <>
      <button
        type="button"
        className="text-orange-600 text-sm md:text-xl hover:text-orange-300"
        data-bs-toggle="modal"
        data-bs-target="#addVideo"
      >
        <i className="fa-solid fa-plus"></i> Add
      </button>

      <div
        className="modal fade fixed top-0 left-0 hidden w-full h-full outline-none overflow-x-hidden overflow-y-auto"
        id="addVideo"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        aria-labelledby="addVideoLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog relative w-auto pointer-events-none">
          <div className="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
            <div className="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md">
              <h5
                className="text-xl font-medium leading-normal text-gray-800"
                id="exampleModalLabel"
              >
                <span className="underline">{title}</span>
              </h5>
              <button
                type="button"
                className="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body p-4">
              <h3 className="mb-3 text-lg font-medium text-slate-600">
                Select a playlist you wish to add
              </h3>
              <ul className="space-y-2">
                {data
                  ? data.map((list) => (
                      <Playlist
                        data={list}
                        videoId={id}
                        key={list._id}
                        data2={data}
                      />
                    ))
                  : null}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
