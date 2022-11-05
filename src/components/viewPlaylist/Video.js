import { useQuery } from "react-query";
import { getVideo } from "../../api/video";
import Loadingicon from "../../images/cubetubeicon.webp";
import { AiOutlineExclamationCircle } from "react-icons/ai";
// import { addVideo } from "../../api/playlist";
// import { useMutation, useQueryClient } from "react-query";

// import { getUserById } from "../../api/users";
// import { useState } from "react";

export const Video = ({ videoId, data2, id }) => {
  const { data, isLoading, isError } = useQuery(["video", videoId], () =>
    getVideo(videoId)
  );
  // const queryClient = useQueryClient();

  // const mutation = useMutation(({ id, videoId }) => addVideo(id, videoId), {
  //   onSuccess: () => {
  //     window.location.reload();
  //     queryClient.invalidateQueries(["playlists"]);
  //   },
  // });

  // const addHandler = (playlistId, videoId) => {
  //   mutation.mutate({ id: playlistId, videoId });
  // };

  // const {
  //   data: data2,
  //   isLoading: isLoading2,
  //   isError: isError2,
  // } = useQuery(["userId", userId], () => data && getUserById(userId));

  if (!videoId && data2.videos.length === 0) {
    return null;
  }

  if (!videoId && data2.videos.length > 0) {
    return (
      <div className="flex flex-col justify-center items-center h-96 space-y-3">
        <h1 className="text-center text-orange-500 font-semibold text-2xl">
          Please click a video
          <br />
          to play here
        </h1>
      </div>
    );
  }

  if (isError) {
    return (
      <>
        <div className="md:m-5">
          <div className=" w-full bg-zinc-800 h-96 ">
            <div className="p-5">
              <h1 className="border-b border-slate-200 pb-2 text-2xl text-white flex items-center">
                <AiOutlineExclamationCircle className="text-xl sm:text-3xl mr-2" />
                This video is unavailable
              </h1>
              <h1 className="pt-2 text-sm text-gray-500">
                This video has been removed by the user
              </h1>
            </div>
            <div className="flex justify-center mt-5">
              <img src={Loadingicon} alt="" className=" w-20 animate-bounce" />
            </div>
          </div>
        </div>
      </>
    );
  }

  if (isLoading) {
    return (
      <div role="status" className="md:p-5 w-full animate-pulse ">
        <div
          role="status"
          className="flex justify-center items-center w-full h-96 bg-gray-300 rounded-lg animate-pulse dark:bg-gray-700"
        >
          <svg
            class="w-12 h-12 text-gray-200 dark:text-gray-600"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 384 512"
          >
            <path d="M361 215C375.3 223.8 384 239.3 384 256C384 272.7 375.3 288.2 361 296.1L73.03 472.1C58.21 482 39.66 482.4 24.52 473.9C9.377 465.4 0 449.4 0 432V80C0 62.64 9.377 46.63 24.52 38.13C39.66 29.64 58.21 29.99 73.03 39.04L361 215z" />
          </svg>
          <span class="sr-only">Loading...</span>
        </div>
        <div className="flex items-center mt-4 space-x-3 mb-2">
          <svg
            className="w-14 h-14 text-gray-200 dark:text-gray-700"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
              clip-rule="evenodd"
            ></path>
          </svg>
          <div>
            <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32 mb-2"></div>
            <div className="w-48 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
          </div>
        </div>
        <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
        <span className="sr-only">Loading...</span>
      </div>
    );
  }

  return (
    <>
      {data2.videos.length > 0 ? (
        <>
          <div className="md:p-5 w-full">
            <video
              src={process.env.REACT_APP_API_SERVER + data.video}
              controls
              autoPlay
              className="w-full mb-2"
            />
            <div className="flex items-center justify-between p-2 border-b border-gray-200"></div>
            <div className="flex space-y-3 flex-col md:flex-row items-center md:justify-between px-5 mt-2">
              <div className="space-y-3">
                <h1 className="text-xl md:text-2xl">{data.title}</h1>
                <h1 className="md:text-lg">{data.description}</h1>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <h1 className="text-center sm:hidden text-orange-500 font-semibold text-2xl">
            Please click a video
            <br />
            to play here
          </h1>
        </>
      )}
    </>
  );
};
