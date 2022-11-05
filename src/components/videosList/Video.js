import React from "react";
import HoverVideoPlayer from "react-hover-video-player";
import moment from "moment";
import { Link } from "react-router-dom";
import { getUserById } from "../../api/users";
import { useQuery } from "react-query";
// import Loadingicon from "../../images/cubetubeicon.webp";
const Video = ({
  data: {
    title,
    description,
    video,
    published,
    _id,
    publisher_id,
    publisher_name,
    publisher_image,
    like,
    thumbnail,
    duration,
  },
}) => {
  const time = moment(published).fromNow();

  const { data, isLoading, isError } = useQuery(["userId", publisher_id], () =>
    getUserById(publisher_id)
  );

  if (isLoading) {
    return (
      <div role="status" className="p-4 max-w-sm animate-pulse md:p-6">
        <div
          role="status"
          className="flex justify-center items-center max-w-sm h-44 bg-gray-300 rounded-lg animate-pulse dark:bg-gray-700"
        >
          <svg
            className="w-12 h-12 text-gray-200 dark:text-gray-600"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 384 512"
          >
            <path d="M361 215C375.3 223.8 384 239.3 384 256C384 272.7 375.3 288.2 361 296.1L73.03 472.1C58.21 482 39.66 482.4 24.52 473.9C9.377 465.4 0 449.4 0 432V80C0 62.64 9.377 46.63 24.52 38.13C39.66 29.64 58.21 29.99 73.03 39.04L361 215z" />
          </svg>
          <span className="sr-only">Loading...</span>
        </div>

        <div className="flex items-center mt-4 space-x-3">
          <svg
            className="w-14 h-14 text-gray-200 dark:text-gray-700"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
              clipRule="evenodd"
            ></path>
          </svg>
          <div>
            <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32 mb-2"></div>
            <div className="w-48 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
          </div>
        </div>
      </div>
    );
  }

  if (isError) {
    return <h1>Error</h1>;
  }
  return (
    <>
      <div className="w-full max-w-md ">
        <div className="md:h-38 xl:h-40">
          <Link
            to={`/getvideo/${_id}`}
            style={{ borderRadius: "8px" }}
            className=" lg:flex lg:items-center lg:bg-black relative"
          >
            <HoverVideoPlayer
              videoStyle={{
                borderRadius: "8px",
              }}
              videoSrc={process.env.REACT_APP_API_SERVER + video}
              pausedOverlay={
                <>
                  <img
                    src={process.env.REACT_APP_API_SERVER + thumbnail}
                    alt=""
                    style={{
                      // Make the image expand to cover the video's dimensions
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      borderRadius: "8px",
                    }}
                    className="rounded-lg"
                  />
                  {/* <div className=" absolute bottom-0 left-0 text-white w-full h-full flex items-center justify-center">
                    <p className="drop-shadow-2xl shadow-orange-600">
                      Hover to play
                    </p>
                  </div> */}
                </>
              }
            />
            <div
              id="duration"
              className="text-xs bg-slate-800 text-white px-3 py-1 absolute z-50 bottom-0 right-0 m-3 xl:m-1 rounded-lg flex items-center"
            >
              <svg
                aria-hidden="true"
                className="mr-1 w-4 h-4"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                  clipRule="evenodd"
                ></path>
              </svg>

              {duration}
            </div>
          </Link>
        </div>

        <div className="mt-1">
          <div className="px-3 flex justify-between items-center">
            <span className="bg-gray-100 text-gray-800 text-xs font-medium inline-flex items-center rounded px-2">
              {like.length === 0 ? "0 " : like.length}
              {like.length < 2 ? "Like" : "Likes"}
            </span>
            <span className="bg-gray-100 text-gray-800 text-xs font-medium inline-flex items-center rounded px-2">
              {time}
            </span>
          </div>
          <div className="px-3 mt-1">
            <Link
              to={`/uservideo/${publisher_id}`}
              className="flex items-center space-x-2"
            >
              {data.profile_pic ? (
                <img
                  src={process.env.REACT_APP_API_SERVER + data.profile_pic}
                  className="w-10 h-10 rounded-full"
                  alt=""
                />
              ) : (
                <div className="">
                  <h1
                    style={{ backgroundColor: data.color }}
                    className="tracking-tight w-full text-center rounded-full px-3 py-1 text-white uppercase text-xl"
                  >
                    {data.name.substring(0, 1)}
                  </h1>
                </div>
              )}
              <h5 className="text-sm md:text-md font-bold tracking-tight text-gray-900">
                {publisher_name}
              </h5>
            </Link>
          </div>
          <div className="px-3">
            <h5 className="text-sm font-bold tracking-tight text-gray-700">
              {title.length > 20 ? title.slice(0, 20) + "..." : title}{" "}
              <i className="fa-solid fa-minus mr-2"></i>
            </h5>
            <p className="flex items-center text-xs font-normal text-gray-700 tracking-tight">
              {description.length > 45
                ? description.slice(0, 45) + "..."
                : description}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
export default Video;
