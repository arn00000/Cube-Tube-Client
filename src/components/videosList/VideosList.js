import React from "react";
import { useQuery } from "react-query";
import { getAllVideos } from "../../api/video";
// import { searchVideo } from "../../api/video";
import Video from "./Video";
import SearchVideo from "./SearchVideo";
import Loadingicon from "../../images/cubetubeicon.webp";
import { useState } from "react";

export const VideosList = () => {
  const { data, error, isLoading, isError } = useQuery("videos", getAllVideos);
  const [search, setSearch] = useState("");

  const {
    data: data2,
    isLoading: isLoading2,
    isError: isError2,
  } = useQuery(["searchvideo", search], () =>
    fetch(`${process.env.REACT_APP_API_SERVER}/video/search`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        search,
      }),
    }).then((res) => res.json())
  );

  const onSubmitHandler = (e) => {
    e.preventDefault();
    setSearch(e.target[0].value);
  };

  if (!data) {
    return null;
  }

  if (isLoading || isLoading2) {
    return (
      <div className="flex justify-center items-center h-96">
        <img src={Loadingicon} alt="" className="animate-spin w-16" />
      </div>
    );
  }

  if (isError || isError2) {
    return <h1>Error: {error.msg}</h1>;
  }

  const sorted = data.sort(
    (a, b) => new Date(b.published) - new Date(a.published)
  );

  return (
    <>
      <div className="w-full px-2 py-2">
        <div className="max-w-2xl mx-auto">
          <form
            className="flex items-center rounded-2xl"
            onSubmit={onSubmitHandler}
          >
            <div className="relative w-full">
              <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                <svg
                  aria-hidden="true"
                  className="w-5 h-5 text-gray-500 dark:text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </div>
              <input
                type="text"
                name="search"
                id="simple-search"
                className="bg-orange-100 text-gray-900 text-sm rounded-2xl focus:outline-none block w-full pl-10 p-2.5"
                placeholder="Search"
                required=""
              />
            </div>
            <button className="px-2.5 py-2.5 sm:py-2.5 sm:px-5 ml-2 text-sm font-medium text-white bg-orange-600 rounded-2xl hover:bg-orange-800 focus:ring-0 focus:outline-none">
              Search
            </button>
          </form>
        </div>
      </div>
      {search ? (
        data2.length === 0 ? (
          <>
            <form
              onSubmit={onSubmitHandler}
              className="flex justify-center items-center space-x-2 mt-10"
            >
              <h1 className="text-2xl text-orange-500">
                Sorry, no result found!
              </h1>
              <button className="text-white bg-orange-500 py-2 px-3 rounded-lg">
                Go Back
              </button>
            </form>
          </>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-x-2 gap-y-8 p-2 justify-items-center">
              {data2.map((video) => (
                <SearchVideo data={video} key={video._id} />
              ))}
            </div>
          </>
        )
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-x-2 gap-y-8 p-2 justify-items-center">
          {!sorted
            ? null
            : sorted.map((video) => <Video data={video} key={video._id} />)}
        </div>
      )}
    </>
  );
};
