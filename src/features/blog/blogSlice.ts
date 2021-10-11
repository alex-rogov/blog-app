import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import AppError from "../../models/AppError.type";
import IPost from "../../models/IPost";
import { createSelector } from "reselect";
import IComment from "../../models/IComment";

export type State = Readonly<{
  posts: { [id: number]: IPost };
  error?: AppError;
}>;

export const initialState: State = {
  posts: {},
};

const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    postsReceive: () => {},
    postsReceived: (state, { payload }: PayloadAction<IPost[]>) => {
      delete state.error;
      const normalizedPosts = payload.reduce((prev, curr) => {
        const { id } = curr;
        return { ...prev, [id]: curr };
      }, {});
      state.posts = normalizedPosts;
    },
    postCreate: (
      state,
      { payload }: PayloadAction<Pick<IPost, "title" | "body">>
    ) => {},
    postCreated: {
      prepare: (post: IPost) => {
        return { payload: { ...post, comments: [] } };
      },
      reducer: (state, { payload }: PayloadAction<IPost>) => {
        delete state.error;
        const { id: newPostId } = payload;
        state.posts[newPostId] = payload;
      },
    },
    postUpdate: (
      state,
      { payload }: PayloadAction<Omit<IPost, "comments">>
    ) => {},
    postUpdated: (state, { payload }: PayloadAction<IPost>) => {
      delete state.error;
      const { id: postId } = payload;
      state.posts[postId] = { ...state.posts[postId], ...payload };
    },
    postDelete: (state, { payload }: PayloadAction<Pick<IPost, "id">>) => {},
    postDeleted: (state, { payload }: PayloadAction<Pick<IPost, "id">>) => {
      delete state.error;
      const { id: postId } = payload;
      delete state.posts[postId];
    },
    commentCreate: (
      state,
      { payload }: PayloadAction<Omit<IComment, "id">>
    ) => {},
    commentCreated: (state, { payload }: PayloadAction<IComment>) => {
      delete state.error;
      const { postId } = payload;
      state.posts[postId].comments.push(payload);
    },
    errorReceived: (state, { payload }: PayloadAction<AppError>) => {
      state.error = payload;
    },
  },
});

export const {
  postsReceive,
  postsReceived,
  postCreate,
  postCreated,
  postUpdate,
  postUpdated,
  postDelete,
  postDeleted,
  commentCreate,
  commentCreated,
  errorReceived,
} = blogSlice.actions;

export const selectPosts = (state: RootState) => {
  return state.blog.posts;
};

export const selectPostById = (id: number) =>
  createSelector(selectPosts, (posts) => (id in posts ? posts[id] : null));

export default blogSlice.reducer;
