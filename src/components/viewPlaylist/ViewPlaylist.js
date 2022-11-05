import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { getPlaylistVideo } from "../../api/playlist";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import Loadingicon from "../../images/cubetubeicon.webp";
import { addVideo } from "../../api/playlist";
import { useMutation, useQueryClient } from "react-query";
import Swal from "sweetalert2";
import { Video } from "./Video";
import { Videos } from "./Videos";

export const ViewPlaylist = () => {
  const { id } = useParams();
  const { data, isLoading, isError } = useQuery(["playlistvideos", id], () =>
    getPlaylistVideo(id)
  );

  const [videoId, setVideoId] = useState();

  const handlerClick = (id2) => {
    setVideoId(id2);
  };

  const queryClient = useQueryClient();

  const mutation = useMutation(({ id, videoId }) => addVideo(id, videoId), {
    onSuccess: () => {
      queryClient.invalidateQueries(["playlistvideos"]);
    },
  });

  const removeHandler = (playlistId, videoId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      showCancelButton: true,
      confirmButtonColor: "#f97316",
      cancelButtonColor: "#9ca3af",
      confirmButtonText: "Yes, remove it!",
    }).then((result) => {
      if (result.isConfirmed) {
        mutation.mutate({ id: playlistId, videoId });
        Swal.fire("Removed!", "Your video has been removed.", "success");
      }
    });
  };

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
          Sign in now <br />
          to view video from your playlist
        </h1>
        <h1 className="hidden sm:block text-orange-500 font-semibold text-2xl">
          Sign in now to view video from your playlist
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
      <div className="md:mx-6 p-3 flex items-center space-x-2 bg-orange-100 md:rounded-lg border-b-8 border-orange-600">
        <h5 className="text-2xl font-bold tracking-tight text-orange-600">
          {data.title}
        </h5>
        <p className="font-normal text-gray-500 underline">
          {data.videos.length < 1 ? (
            <h1>{data.videos.length} video</h1>
          ) : (
            <h2>{data.videos.length} videos</h2>
          )}
        </p>
      </div>

      {data.videos.length === 0 && (
        <div className="flex justify-center items-center h-96">
          <h1 className="text-center text-orange-500 font-semibold text-2xl">
            You have no video in your playlist
          </h1>
        </div>
      )}
      <div className="grid grid-cols-1 lg:grid-cols-3 ">
        <div className="mb-2 md:md-0 md:col-start-1 md:col-end-3 ">
          <Video videoId={videoId} data2={data} id={id} />
        </div>
        {data.videos.length === 0 ? null : (
          <div className="xl:col-start-3 xl:col-end-6 h-screen bg-white rounded-md shadow-lg md:overflow-auto mt-2">
            <div className="overflow-auto p-3 space-y-5">
              {data.videos.map((video, i) => (
                <>
                  <div
                    key={i}
                    className="w-full border-b border-slate-200 text-end"
                  >
                    <button
                      onClick={() => handlerClick(video.videoId)}
                      // key={i}
                      className=" flex flex-col sm:flex-row space-x-2 "
                    >
                      <Videos
                        videoId={video.videoId}
                        data2={data}
                        // key={video.videoId}
                      />
                    </button>
                    <button
                      className="text-sm hover:bg-orange-400 bg-orange-500 text-white rounded-lg px-3 py-2 mb-2"
                      onClick={() => removeHandler(id, video.videoId)}
                      // key={i}
                    >
                      Remove
                    </button>
                  </div>
                </>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};
