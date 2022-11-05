import moment from "moment";

const Comment = ({ data }) => {
  const time = moment(data.date).fromNow(true);
  return (
    <>
      <div className="flex items-center space-x-2 p-5">
        {data.userImage ? (
          <img
            src={process.env.REACT_APP_API_SERVER + data.userImage}
            alt=""
            className="w-14 h-14 rounded-full"
          />
        ) : (
          <div className="">
            <h1 className="tracking-tight w-full text-center bg-orange-700 rounded-full px-5 py-3 text-white uppercase text-xl">
              {data.userName.substring(0, 1)}
            </h1>
          </div>
        )}

        <div>
          <div className="flex items-center space-x-2">
            <h1 className="font-semibold">{data.userName}</h1>
            <p className="text-xs text-gray-500">{time}</p>
          </div>
          <div>
            <p>{data.comment}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Comment;
