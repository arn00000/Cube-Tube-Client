import React from "react";
import Logo from "../../images/playlist2.png";
import { Link } from "react-router-dom";
import { useState } from "react";
import { editPlaylist } from "../../api/playlist";
import { deletePlaylist } from "../../api/playlist";
import { useQueryClient, useMutation } from "react-query";
import Swal from "sweetalert2";

const Playlist = ({ data }) => {
  const [edit, setEdit] = useState(false);

  const [playlist, setPlaylist] = useState({
    title: data.title,
  });

  const queryClient = useQueryClient();

  const editMutation = useMutation(
    ({ id, playlist }) => editPlaylist(data._id, playlist),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["playlists"]);
      },
      onError: () => {
        let x = editMutation.error;
        console.log(x);
      },
    }
  );

  const delMutation = useMutation((id) => deletePlaylist(data._id), {
    onSuccess: () => {
      queryClient.invalidateQueries(["playlists"]);
    },
    onError: () => {
      let x = delMutation.error;
      console.log(x);
    },
  });

  const deleteHandler = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      showCancelButton: true,
      confirmButtonColor: "#f97316",
      cancelButtonColor: "#9ca3af",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        delMutation.mutate(id);
        Swal.fire(
          "Deleted!",
          `Playlist ${data.title} has been deleted.`,
          "success"
        );
      }
    });
  };

  const onChangeHandler = (e) => {
    setPlaylist({ ...playlist, [e.target.name]: e.target.value });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    editMutation.mutate({ playlist });
    setEdit(false);
  };
  return (
    <>
      <li className="py-3 sm:py-3">
        <div className="space-x-4 bg-slate-200 p-2 rounded-lg">
          <div className="flex space-x-4">
            <Link
              to={`/viewplaylist/${data._id}`}
              className="flex-shrink-0 cursor-pointer"
            >
              <img className="w-10 cursor-pointer" src={Logo} alt="" />
            </Link>
            <div className="flex w-full items-center space-x-2">
              {edit ? (
                <>
                  <form className="flex w-full" onSubmit={onSubmitHandler}>
                    <input
                      type="text"
                      id="default-search"
                      className="rounded-l-lg block p-2 w-full text-sm text-gray-900 bg-gray-50 border border-gray-300 focus:border-orange-500 focus:outline-none"
                      required=""
                      name="title"
                      defaultValue={data.title}
                      onChange={onChangeHandler}
                    />
                    <button
                      type="submit"
                      // onClick={() => setEdit(false)}
                      className="rounded-r-lg text-white bg-orange-600 hover:bg-orange-300 focus:ring-0 focus:outline-none font-medium text-sm px-4 py-2"
                    >
                      Edit
                    </button>
                  </form>
                </>
              ) : (
                <>
                  <p className="text-md font-medium text-gray-900 truncate dark:text-white">
                    {data.title}
                  </p>
                  <p className="text-sm text-gray-500 truncate dark:text-gray-400 underline">
                    {data.videos.length < 1
                      ? data.videos.length + " video"
                      : data.videos.length + " videos"}
                  </p>
                </>
              )}
            </div>
          </div>
          {edit === false ? (
            <button
              onClick={() => setEdit(true)}
              className="text-sm text-gray-500 hover:text-orange-600"
            >
              Edit
            </button>
          ) : (
            <button
              onClick={() => setEdit(false)}
              className="text-sm text-gray-500 hover:text-orange-600"
            >
              Cancel Edit
            </button>
          )}

          <button
            onClick={() => deleteHandler(data._id)}
            className="text-sm text-gray-500 hover:text-orange-600"
          >
            Delete
          </button>
        </div>
      </li>
    </>
  );
};
export default Playlist;
