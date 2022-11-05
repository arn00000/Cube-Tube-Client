import React from "react";
import moment from "moment";
import { Comment } from "../videoAction/Comment";
import { Like } from "../videoAction/Like";
import { Dislike } from "../videoAction/Dislike";
import { Follow } from "../videoAction/Follow";
import { ShowComment } from "../showComment";
import { AddVideo } from "../playlistAction/addVideo/AddVideo";
import { getUserById } from "../../api/users";
// import Loadingicon from "../../images/cubetubeicon.webp";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";

const Video = ({ data }) => {
  const published = moment(data.published).format("DD MMM YYYY");
  const {
    data: data2,
    isLoading,
    isError,
  } = useQuery(["userId", data.publisher_id], () =>
    getUserById(data.publisher_id)
  );
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

  if (isError) {
    return <h1>Error</h1>;
  }

  return (
    <>
      <div className="md:p-5 w-full">
        <video
          src={process.env.REACT_APP_API_SERVER + data.video}
          controls
          autoPlay
          className="w-full mb-2"
        />
        <div className="flex items-center justify-between p-2 border-b border-gray-200">
          <Link to={`/uservideo/${data2._id}`}>
            <div className="flex items-center space-x-2">
              {data2.profile_pic ? (
                <img
                  src={process.env.REACT_APP_API_SERVER + data2.profile_pic}
                  alt=""
                  className="w-10 h-10 md:w-20 md:h-20 rounded-full"
                />
              ) : (
                <div className="">
                  <h1
                    style={{ backgroundColor: data2.color }}
                    className="tracking-tight w-full text-center  rounded-full px-4 py-2 md:px-5 md:py-3 text-white uppercase md:text-4xl"
                  >
                    {data2.name.substring(0, 1)}
                  </h1>
                </div>
              )}

              <h1 className="md:text-2xl text-orange-600">{data2.name}</h1>
            </div>
          </Link>
          <Follow id={data.publisher_id} data={data} />
        </div>
        <div className="flex space-y-3 flex-col md:flex-row md:justify-between px-5 mt-2">
          <div className="space-y-3">
            <h1 className="text-xl md:text-2xl">{data.title}</h1>
            <h1 className="md:text-lg">{data.description}</h1>
          </div>
          <div>
            <h1 className="text-xs md:text-lg uppercase font-medium text-gray-600 w-28">
              {published}
            </h1>
          </div>
        </div>

        <div className="flex justify-center md:justify-start items-center space-x-5 mx-2 my-5 md:mx-5 ">
          <Like id={data._id} liked={data.like} />
          <Dislike id={data._id} disliked={data.dislike} />
          <AddVideo id={data._id} title={data.title} />
        </div>
        <Comment id={data._id} />
        <ShowComment id={data._id} />
      </div>
    </>
  );
};
export default Video;
