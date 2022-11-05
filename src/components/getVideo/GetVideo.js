import React from "react";
import { useQuery } from "react-query";
import { getVideo } from "../../api/video";
import { getAllVideos } from "../../api/video";
import { useParams } from "react-router-dom";
import Video from "./Video";
import Videos from "./Videos";

export const GetVideo = () => {
  const { id } = useParams();
  const { data, error, isLoading, isError } = useQuery(["video", id], () =>
    getVideo(id)
  );

  const { data: data2 } = useQuery("videos", getAllVideos);

  if (isLoading) {
    return (
      <>
        <div className="grid grid-cols-1 lg:grid-cols-3 ">
          <div className="mb-2 md:md-0 md:col-start-1 md:col-end-3 ">
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
          </div>
          <div className="xl:col-start-3 xl:col-end-6 bg-white rounded-lg shadow-lg md:overflow-auto">
            <div
              role="status"
              className="md:p-5 w-full animate-pulse flex space-x-2"
            >
              <div
                role="status"
                className="flex justify-center items-center h-32 w-52 bg-gray-300 rounded-lg animate-pulse dark:bg-gray-700"
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
              <div>
                <div className="flex items-center space-x-2 mb-2">
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
                <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-2"></div>
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                <span className="sr-only">Loading...</span>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  if (isError) {
    return <h1>Error: {error.msg}</h1>;
  }

  const sorted = data2.sort(
    (a, b) => new Date(b.published) - new Date(a.published)
  );
  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-3 ">
        <div className="mb-2 md:md-0 md:col-start-1 md:col-end-3 ">
          <Video data={data} key={data._id} />
        </div>
        <div className="xl:col-start-3 xl:col-end-6 bg-white rounded-lg shadow-lg md:overflow-auto">
          {!sorted
            ? null
            : sorted.map((video) => (
                <Videos data={video} key={video._id} id={id} />
              ))}
        </div>
      </div>
    </>
  );
};
