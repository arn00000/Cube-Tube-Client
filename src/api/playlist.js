export const getAllPlaylist = async () => {
  try {
    const res = await fetch(`${process.env.REACT_APP_API_SERVER}/playlist`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": localStorage.getItem("token"),
      },
    });
    const data = await res.json();
    if (res.ok) {
      return data;
    } else {
      throw new Error(data.msg);
    }
  } catch (e) {
    throw e.msg;
  }
};

export const getPlaylistVideo = async (id) => {
  try {
    const res = await fetch(
      `${process.env.REACT_APP_API_SERVER}/playlist/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": localStorage.getItem("token"),
        },
      }
    );
    const data = await res.json();
    if (res.ok) {
      return data;
    } else {
      throw new Error(data.msg);
    }
  } catch (e) {
    throw e.msg;
  }
};

export const getOnePlaylistVideo = async ({ playlistId, videoId }) => {
  try {
    const res = await fetch(
      `${process.env.REACT_APP_API_SERVER}/playlist/video/${playlistId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify({ videoId }),
      }
    );
    const data = await res.json();
    console.log(data);
    if (res.ok) {
      return data;
    } else {
      throw new Error(data.msg);
    }
  } catch (e) {
    throw e.message;
  }
};

export const createPlaylist = async (playlist) => {
  try {
    const res = await fetch(`${process.env.REACT_APP_API_SERVER}/playlist`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify(playlist),
    });

    const data = await res.json();
    if (res.ok) {
      return data;
    } else {
      throw new Error(data.msg);
    }
  } catch (e) {
    throw e.message;
  }
};

export const editPlaylist = async (id, title) => {
  try {
    const res = await fetch(
      `${process.env.REACT_APP_API_SERVER}/playlist/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify(title),
      }
    );

    const data = await res.json();
    if (res.ok) {
      return data;
    } else {
      throw new Error(data.msg);
    }
  } catch (e) {
    throw e.msg;
  }
};

export const deletePlaylist = async (id) => {
  try {
    const res = await fetch(
      `${process.env.REACT_APP_API_SERVER}/playlist/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": localStorage.getItem("token"),
        },
      }
    );
    const data = await res.json();
    if (res.ok) {
      return data;
    } else {
      throw new Error(data.msg);
    }
  } catch (e) {
    throw e.msg;
  }
};

export const addVideo = async (playlistId, videoId) => {
  try {
    const res = await fetch(
      `${process.env.REACT_APP_API_SERVER}/playlist/add/${playlistId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify({ videoId }),
      }
    );
    const data = await res.json();
    console.log(data);
    if (res.ok) {
      return data;
    } else {
      throw new Error(data.msg);
    }
  } catch (e) {
    throw e.msg;
  }
};
