import { useQuery } from "react-query";
import { getComments } from "../../api/video";
import Comment from "./Comment";
import { useState } from "react";
export const ShowComment = ({ id }) => {
  const { data } = useQuery(["video", id], () => getComments(id));
  const [view, setView] = useState(false);

  const sorted = data.comments.sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  return (
    <>
      {data.comments.length === 0 ? null : !view ? (
        <button
          className="p-5 underline text-gray-500 hover:text-gray-700"
          onClick={() => setView(true)}
        >
          View all {data.comments.length} comments
        </button>
      ) : (
        <>
          <button
            onClick={() => setView(false)}
            className="underline px-5 text-gray-500 hover:text-gray-700"
          >
            Hide {data.comments.length} comments
          </button>
          {sorted.map((comment) => (
            <Comment data={comment} />
          ))}
        </>
      )}
    </>
  );
};
