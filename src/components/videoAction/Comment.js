import { getUser } from "../../api/users";
import { useQuery } from "react-query";
import { commentVideo } from "../../api/video";
import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import EmojiPicker from "emoji-picker-react";

export const Comment = ({ id }) => {
  const user = localStorage.getItem("token");

  const { data, isLoading, isError } = useQuery(["user", user], () =>
    getUser(user)
  );
  const [error, setError] = useState();

  const onEmojiClick = (event, emojiObject) => {
    console.log(emojiObject);
    setComment((prevInput) => prevInput + event.emoji);
  };

  const queryClient = useQueryClient();

  const [comment, setComment] = useState("");

  const [emoji, setEmoji] = useState(false);

  const mutation = useMutation(async (comment) => commentVideo(id, comment), {
    onSuccess: (e) => {
      queryClient.invalidateQueries(["video"]);
    },
    onError: (error) => {
      setError(error);
    },
  });

  const onChangeHandler = (e) => {
    setComment(e.target.value);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    mutation.mutate(comment);
    e.target.reset();
    setComment("");
    setError(null);
  };

  const notify = () =>
    toast.warning("Login to access this feature", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  if (!user) {
    return (
      <div>
        <div className="mb-4 w-full bg-gray-50 rounded-xl">
          <div className="py-2 px-4 bg-white rounded-t-lg">
            <textarea
              rows="1"
              className="px-0 w-full text-sm text-gray-900 bg-white border-0 focus:ring-0 focus:outline-none cursor-not-allowed"
              placeholder="Write a comment..."
              required=""
              disabled
            ></textarea>
          </div>
          <div className="flex justify-between items-center py-2 px-3 border-t dark:border-gray-600">
            <div className="flex pl-0 space-x-1 sm:pl-2"></div>
            <button
              onClick={notify}
              className="inline-flex items-center py-2.5 px-4 text-xs md:text-sm font-medium text-center text-white bg-orange-600 rounded-lg focus:ring-0 focus:outeline-none"
            >
              Comment
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (isLoading || isError) {
    return (
      <div>
        <div className="mb-4 w-full bg-gray-50 rounded-xl">
          <div className="py-2 px-4 bg-white rounded-t-lg">
            <textarea
              rows="1"
              className="px-0 w-full text-sm text-gray-900 bg-white border-0 focus:ring-0 focus:outline-none cursor-not-allowed"
              placeholder="Write a comment..."
              required=""
              disabled
            ></textarea>
          </div>
          <div className="flex justify-between items-center py-2 px-3 border-t dark:border-gray-600">
            <div className="flex pl-0 space-x-1 sm:pl-2"></div>
            <button
              onClick={notify}
              className="inline-flex items-center py-2.5 px-4 text-xs md:text-sm font-medium text-center text-white bg-orange-600 rounded-lg focus:ring-0 focus:outeline-none"
            >
              Comment
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <form onSubmit={onSubmitHandler}>
        <div className="mb-4 w-full bg-gray-50 rounded-xl">
          <div className="py-2 px-4 bg-white rounded-t-lg">
            {error ? (
              <div className="flex">
                <svg
                  aria-hidden="true"
                  className="flex-shrink-0 w-5 h-5 text-red-700 dark:text-red-800"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <span className="sr-only">Info</span>
                <div className="ml-3 text-sm font-medium text-red-700 dark:text-red-800">
                  {error}
                </div>
              </div>
            ) : null}
            <textarea
              name="comment"
              rows="1"
              className="px-0 w-full text-sm text-gray-900 bg-white border-0 focus:ring-0 focus:outline-none"
              placeholder="Write a comment..."
              required=""
              type="text"
              value={comment}
              onChange={onChangeHandler}
            ></textarea>
          </div>
          <div className="flex justify-between items-center py-2 px-3 border-t dark:border-gray-600">
            <div className="flex items-center pl-0 space-x-1 sm:pl-2">
              {data.profile_pic ? (
                <img
                  src={process.env.REACT_APP_API_SERVER + data.profile_pic}
                  alt=""
                  className="w-10 h-10 rounded-full"
                />
              ) : (
                <div className="">
                  <h1
                    style={{ backgroundColor: data.color }}
                    className="tracking-tight w-full text-center rounded-full px-4 py-2 text-white uppercase text-xl"
                  >
                    {data.name.substring(0, 1)}
                  </h1>
                </div>
              )}

              <h1>{data.name}</h1>
            </div>
            <div className="flex items-center">
              <button
                type="button"
                onClick={() => setEmoji((val) => !val)}
                className="p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100"
              >
                <svg
                  aria-hidden="true"
                  className="w-8 h-8"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 100-2 1 1 0 000 2zm7-1a1 1 0 11-2 0 1 1 0 012 0zm-.464 5.535a1 1 0 10-1.415-1.414 3 3 0 01-4.242 0 1 1 0 00-1.415 1.414 5 5 0 007.072 0z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <span class="sr-only">Add emoji</span>
              </button>
              <button className="inline-flex items-center py-2.5 px-4 text-xs md:text-sm font-medium text-center text-white bg-orange-600 rounded-lg focus:ring-0 focus:outeline-none hover:bg-orange-800">
                Comment
              </button>
            </div>
          </div>
          {emoji && (
            <EmojiPicker
              onEmojiClick={onEmojiClick}
              width="100%"
              searchDisabled={true}
              skinTonesDisabled={true}
              height="350px"
              // onEmojiClick={(e) => setComment((comment) => (comment += e.emoji))}
            />
          )}
        </div>
      </form>
    </>
  );
};
