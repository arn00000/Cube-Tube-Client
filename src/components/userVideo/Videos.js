import { getUserById } from "../../api/users";
import { useQuery } from "react-query";
import Loadingicon from "../../images/cubetubeicon.webp";
import React from "react";
import HoverVideoPlayer from "react-hover-video-player";
import moment from "moment";
import { Link } from "react-router-dom";
const Videos = ({
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
      <div className="flex justify-center items-center h-96">
        <img src={Loadingicon} alt="" className="animate-spin w-16" />
      </div>
    );
  }

  if (isError) {
    return <h1>Error</h1>;
  }

  return (
    <>
      <Link to={`/getvideo/${_id}`} className="w-full max-w-md ">
        <div className="md:h-38 xl:h-40">
          <div
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
          </div>
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
            <div className="flex items-center space-x-2">
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
              <h5 className="text-sm md:text-lg font-bold tracking-tight text-gray-900">
                {publisher_name}
              </h5>
            </div>
          </div>
          <div className="px-3">
            <h5 className="text-md md:text-md font-bold tracking-tight text-gray-700">
              {title.length > 20 ? title.slice(0, 20) + "..." : title}{" "}
              <i className="fa-solid fa-minus mr-2"></i>
            </h5>
            <p className="flex items-center md:text-sm font-normal text-gray-700 tracking-tight">
              {description.length > 38
                ? description.slice(0, 38) + "..."
                : description}
            </p>
          </div>
        </div>
      </Link>
    </>
  );
};

export default Videos;
