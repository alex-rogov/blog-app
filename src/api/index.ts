import axios from "axios";
import IComment from "../models/IComment";
import IPost from "../models/IPost";

const api = axios.create({
  baseURL: "https://bloggy-api.herokuapp.com/",
  headers: { "Content-Type": "application/json" },
});

export const fetchPosts = (): Promise<IPost[]> => {
  return api
    .get<IPost[]>("/posts", {
      params: {
        _embed: "comments",
      },
    })
    .then(({ status, data, statusText }) => {
      if (status === 200) {
        return data;
      }
      throw new Error(
        `Error while fetching posts with a status code: ${status} and message ${statusText}`
      );
    })
    .catch((e) => {
      throw e;
    });
};

export const createPost = (
  post: Pick<IPost, "title" | "body">
): Promise<IPost> => {
  return api
    .post("/posts", post)
    .then(({ status, data, statusText }) => {
      if (status === 201) {
        return data as IPost;
      }
      throw new Error(
        `Error while creating a new post with a status code: ${status} and message ${statusText}`
      );
    })
    .catch((e) => {
      throw e;
    });
};

export const updatePost = (post: IPost): Promise<IPost> => {
  return api
    .put(`/posts/${post.id}`, post)
    .then(({ status, data, statusText }) => {
      if (status === 200) {
        return data as IPost;
      }
      throw new Error(
        `Error while updating the post with a status code: ${status} and message ${statusText}`
      );
    })
    .catch((e) => {
      throw e;
    });
};

export const deletePost = ({ id }: Pick<IPost, "id">): Promise<void> => {
  const bodyFormData = new FormData();
  bodyFormData.append("id", id.toString());

  return api
    .delete(`/posts/${id}`, { data: bodyFormData })
    .then(({ status, statusText }) => {
      if (status !== 200) {
        throw new Error(
          `Error while deleting the post with a status code: ${status} and message ${statusText}`
        );
      }
    })
    .catch((e) => {
      throw e;
    });
};

export const createComment = (
  comment: Pick<IComment, "postId" | "body">
): Promise<IComment> => {
  return api
    .post(`/comments`, comment)
    .then(({ status, data, statusText }) => {
      if (status === 201) {
        return data as IComment;
      }
      throw new Error(
        `Error while creating a new comment with a status code: ${status} and message ${statusText}`
      );
    })
    .catch((e) => {
      throw e;
    });
};
