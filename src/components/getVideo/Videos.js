import HoverVideoPlayer from "react-hover-video-player";
import { Link } from "react-router-dom";
import { getUserById } from "../../api/users";
import { useQuery } from "react-query";
import moment from "moment";
const Videos = ({ data, id }) => {
  const {
    data: data2,
    isLoading,
    isError,
  } = useQuery(["userId", data.publisher_id], () =>
    getUserById(data.publisher_id)
  );
  const time = moment(data.published).fromNow();
  if (isLoading) {
    return (
      <div role="status" className="md:p-5 w-full animate-pulse flex space-x-2">
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
    );
  }

  if (isError) {
    return <h1>Error</h1>;
  }
  return (
    <>
      {id !== data._id ? (
        <div className="mt-3 p-2 flex flex-col sm:flex-row lg:items-center space-x-2 w-full">
          <Link to={`/getVideo/${data._id}`} className="relative">
            <HoverVideoPlayer
              videoStyle={{ borderRadius: "8px" }}
              className="w-full sm:w-72 lg:w-32 xl:w-52"
              videoSrc={process.env.REACT_APP_API_SERVER + data.video}
              pausedOverlay={
                <>
                  <img
                    src={process.env.REACT_APP_API_SERVER + data.thumbnail}
                    alt=""
                    style={{
                      // Make the image expand to cover the video's dimensions
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      borderRadius: "8px",
                    }}
                  />
                  {/* <div className="absolute top-0 left-0 text-white w-full h-full flex items-center justify-center">
                    <p className="drop-shadow-2xl shadow-orange-600">
                      Hover to play
                    </p>
                  </div> */}
                </>
              }
            />
            <div
              id="duration"
              className="text-xs bg-slate-800 text-white px-3 py-1 absolute z-50 bottom-3 right-1 rounded-lg flex items-center"
            >
              <svg
                aria-hidden="true"
                class="mr-1 w-4 h-4"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                  clip-rule="evenodd"
                ></path>
              </svg>

              {data.duration}
            </div>
          </Link>
          <div className="w-full">
            <Link
              to={`/uservideo/${data2._id}`}
              className="flex items-center space-x-2"
            >
              {data2.profile_pic ? (
                <img
                  src={process.env.REACT_APP_API_SERVER + data2.profile_pic}
                  alt=""
                  className="w-10 h-10 sm:w-16 sm:h-16 lg:w-10 lg:h-10 rounded-full"
                />
              ) : (
                <div className="">
                  <h1
                    style={{ backgroundColor: data2.color }}
                    className="tracking-tight w-full text-center rounded-full px-3 py-1 text-white uppercase text-xl"
                  >
                    {data2.name.substring(0, 1)}
                  </h1>
                </div>
              )}
              <h1 className="tracking-tight text-sm sm:text-2xl lg:text-sm">
                {data2.name}
              </h1>
            </Link>

            <h5 className="text-sm sm:text-xl lg:text-sm font-bold tracking-tight text-gray-900">
              {data.title}
            </h5>
            <p className="mb-2 text-sm sm:text-lg lg:text-sm font-normal text-gray-500 ">
              {data.description.length > 30
                ? data.description.slice(0, 30) + "..."
                : data.description}
            </p>

            <div className="w-full">
              <span class="bg-gray-100 text-gray-800 text-xs font-medium inline-flex items-center rounded px-2">
                {time}
              </span>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};
export default Videos;
