import HoverVideoPlayer from "react-hover-video-player";
import moment from "moment";
import { DelMyVideo } from "./DelMyVideo";
import { EditMyVideo } from "./EditMyVideo";
import { Link } from "react-router-dom";
const Library = ({
  data: { title, description, video, published, _id, thumbnail, duration },
}) => {
  const time = moment(published).fromNow(true);
  return (
    <>
      <div className="w-full max-w-md ">
        <Link to={`/getvideo/${_id}`} className="md:h-38 xl:h-40">
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
              className="text-xs bg-slate-800 text-white px-3 py-1 absolute z-50 bottom-0 right-0 m-3 xl:m-1 rounded-lg flex items-center"
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

              {duration}
            </div>
          </div>
        </Link>

        <div className=" rounded-lg">
          <div className="flex justify-end px-3">
            <span class="bg-gray-200 text-gray-800 text-xs font-medium inline-flex items-center rounded px-2 mt-1">
              {time}
            </span>
          </div>

          <div className="px-3">
            <h5 className="text-xs md:text-lg font-bold tracking-tight text-gray-900">
              {title}
            </h5>
            <p className="text-xs md:text-md font-normal text-gray-700 tracking-tight">
              {description.length > 40
                ? description.slice(0, 40) + "..."
                : description}
            </p>
          </div>
          <div className="px-3 py-2 flex items-center justify-center bg-slate-100 rounded-lg mt-1">
            <EditMyVideo
              title={title}
              description={description}
              video={video}
              thumbnail={thumbnail}
              id={_id}
            />
            <span className="text-xl text-orange-600 px-2">|</span>
            <DelMyVideo videoId={_id} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Library;
