import { getVideo } from "../../api/video";
import { useQuery } from "react-query";
import HoverVideoPlayer from "react-hover-video-player";
// import Loadingicon from "../../images/cubetubeicon.webp";
import moment from "moment";
import { AiOutlineExclamationCircle } from "react-icons/ai";

export const Videos = ({ videoId, data2 }) => {
  const { data, isLoading, isError } = useQuery(["video", videoId], () =>
    getVideo(videoId)
  );

  //   if (isLoading) {
  //     return (
  //       <div className="flex justify-center items-center h-96">
  //         <img src={Loadingicon} alt="" className="animate-spin w-16" />
  //       </div>
  //     );
  //   }

  if (isError || isLoading) {
    return (
      <>
        <HoverVideoPlayer
          className="w-full sm:w-72 lg:w-32 xl:w-48"
          videoSrc=""
          controls
        />
        <div>
          <h5 className="flex items-center text-sm sm:text-xl lg:text-xl font-bold tracking-tight text-gray-900 text-start">
            <AiOutlineExclamationCircle className="text-xl sm:text-3xl" />
            Video Unavailable
          </h5>
          <p className="mb-2 text-sm sm:text-lg lg:text-sm font-normal text-gray-500 text-start">
            This video has been removed by the user
          </p>
        </div>
      </>
    );
  }
  const time = moment(data.published).fromNow();

  return (
    <>
      {!data ? null : (
        <>
          <div style={{ borderRadius: "8px" }} className="relative">
            <HoverVideoPlayer
              className="w-full sm:w-72 lg:w-32 xl:w-48"
              videoStyle={{ borderRadius: "8px" }}
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
          </div>

          <div className="">
            <h5 className="text-sm sm:text-xl lg:text-xl font-bold tracking-tight text-gray-900 text-start">
              {data.title}
            </h5>
            <p className="mb-2 text-sm sm:text-lg lg:text-sm font-normal text-gray-500 text-start">
              {data.description.length > 30
                ? data.description.slice(0, 30) + "..."
                : data.description}
            </p>
            <div className="flex ">
              <span className="bg-gray-100 text-gray-800 text-xs font-medium rounded px-2">
                {time}
              </span>
            </div>
          </div>
        </>
      )}
    </>
  );
};
