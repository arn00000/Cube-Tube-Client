import { deleteVideo } from "../../api/video";
import { useQueryClient, useMutation } from "react-query";
import Swal from "sweetalert2";

export const DelMyVideo = ({ videoId }) => {
  const queryClient = useQueryClient();
  const delMutation = useMutation((videoId) => deleteVideo(videoId), {
    onSuccess: () => {
      queryClient.invalidateQueries(["uservideo"]);
    },
  });

  const deleteHandler = (videoId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      showCancelButton: true,
      confirmButtonColor: "#f97316",
      cancelButtonColor: "#9ca3af",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        delMutation.mutate(videoId);
        Swal.fire("Deleted!", "Your video has been deleted.", "success");
      }
    });
  };
  return (
    <>
      <button
        onClick={() => deleteHandler(videoId)}
        className="text-lg text-orange-600"
      >
        <i class="fa-regular fa-trash-can"></i> Delete
      </button>
    </>
  );
};
