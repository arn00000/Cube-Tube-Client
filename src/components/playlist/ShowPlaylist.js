import React from "react";
import { useQuery } from "react-query";
import { getAllPlaylist } from "../../api/playlist";
import Playlist from "./Playlist";
import { Link } from "react-router-dom";
import Loadingicon from "../../images/cubetubeicon.webp";
import { CreatePlaylist } from "../playlistAction/CreatePlaylist";

export const ShowPlaylist = () => {
  const { data, isLoading, isError } = useQuery("playlists", getAllPlaylist);
  if (!localStorage.getItem("token")) {
    return (
      <div className="flex flex-col justify-center items-center h-96 space-y-3">
        <h1 className="text-center sm:hidden text-orange-500 font-semibold text-2xl">
          Sign in now <br />
          to view your playlist
        </h1>
        <h1 className="hidden sm:block text-orange-500 font-semibold text-2xl">
          Sign in now to view your playlist
        </h1>
        <Link
          to="/login"
          className="text-center text-orange-700 border-2 border-orange-700 rounded-lg px-5 py-2 hover:bg-orange-700 hover:text-white"
        >
          Sign in
        </Link>
      </div>
    );
  }
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-96">
        <img src={Loadingicon} alt="" className="animate-spin w-16" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col justify-center items-center h-96 space-y-3">
        <h1 className="text-center sm:hidden text-orange-500 font-semibold text-2xl">
          Please login again, <br />
          your session has expired.
        </h1>
        <h1 className="hidden sm:block text-orange-500 font-semibold text-2xl">
          Please login again, your session has expired.
        </h1>
        <Link
          to="/login"
          className="text-center text-orange-700 border-2 border-orange-700 rounded-lg px-5 py-2 hover:bg-orange-700 hover:text-white"
        >
          Sign in
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="flex justify-center">
        <div
          // style={{ height: "85vh" }}
          className="h-screen md:h-auto overflow-auto p-4 w-full md:max-w-md bg-white md:rounded-lg md:border shadow-2xl sm:p-5 text-end"
        >
          <CreatePlaylist />
          <div className="flex justify-between items-center mb-4">
            <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
              Your Playlist
            </h5>
            <p className="text-sm font-medium text-orange-600">Action</p>
          </div>
          <div className="flow-root">
            <ul className="divide-y divide-gray-200 dark:divide-gray-700">
              {data.length === 0 ? (
                <>
                  <div className="flex justify-center items-center h-96">
                    <h1>You have no playlist</h1>
                  </div>
                </>
              ) : (
                <div className="h-96">
                  {data.map((playlist) => (
                    <Playlist data={playlist} key={playlist._id} />
                  ))}
                </div>
              )}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};
