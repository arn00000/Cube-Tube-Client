import { addVideo } from "../../../api/playlist";
import { useMutation, useQueryClient } from "react-query";
import toast2 from "react-hot-toast";

const Playlist = ({ data, videoId, data2 }) => {
  // console.log(data.videos);
  const queryClient = useQueryClient();

  const mutationAdd = useMutation(({ id, videoId }) => addVideo(id, videoId), {
    onSuccess: () => {
      queryClient.invalidateQueries(["playlists"]);
      toast2(`Added to ${data.title}`, {
        style: {
          // border: "1px solid #f97316",
          padding: "16px",
          color: "#f97316",
        },
        iconTheme: {
          primary: "#f97316",
          secondary: "#f97316",
        },
      });
    },
  });

  const addHandler = (playlistId, videoId) => {
    mutationAdd.mutate({ id: playlistId, videoId });
  };

  const mutationRemove = useMutation(
    ({ id, videoId }) => addVideo(id, videoId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["playlists"]);
        toast2(`Removed from ${data.title}`, {
          style: {
            // border: "1px solid #f97316",
            padding: "16px",
            color: "#f97316",
          },
          iconTheme: {
            primary: "#f97316",
            secondary: "#f97316",
          },
        });
      },
    }
  );

  const removeHandler = (playlistId, videoId) => {
    mutationRemove.mutate({ id: playlistId, videoId });
  };
  return (
    <>
      {/* <button onClick={() => addHandler(data._id, videoId)}>
        {data.title}
      </button> */}
      {data.videos.find((x) => x.videoId === videoId) ? (
        <>
          <li>
            <input
              type="radio"
              id={data._id}
              name="hosting"
              value={data._id}
              class="hidden peer"
              required=""
              onClick={() => removeHandler(data._id, videoId)}
            />
            <label
              for={data._id}
              class="inline-flex justify-between items-center p-5 w-full text-orange-500 bg-white rounded-lg border-2 border-orange-600 cursor-pointer peer-checked:border-orange-600 peer-checked:text-orange-600 hover:bg-gray-100"
            >
              <div class="block">
                <div class="w-full text-lg font-semibold">{data.title}</div>
                <div class="w-full">Remove</div>
              </div>
            </label>
          </li>
        </>
      ) : (
        <>
          <li>
            <input
              type="radio"
              id={data._id}
              name="hosting"
              value={data._id}
              class="hidden peer"
              required=""
              onClick={() => addHandler(data._id, videoId)}
            />
            <label
              for={data._id}
              class="inline-flex justify-between items-center p-5 w-full text-gray-500 bg-white rounded-lg border-2 border-gray-200 cursor-pointer  hover:text-gray-600 hover:bg-gray-100"
            >
              <div class="block">
                <div class="w-full text-lg font-semibold">{data.title}</div>
                <div class="w-full">Add</div>
              </div>
            </label>
          </li>
        </>
      )}
    </>
  );
};

export default Playlist;
