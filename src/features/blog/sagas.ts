import { PayloadAction } from "@reduxjs/toolkit";
import { call, put, takeLeading } from "redux-saga/effects";
import * as api from "../../api";
import * as blogSlice from "./blogSlice";
import IComment from "../../models/IComment";
import IPost from "../../models/IPost";

function* fetchAllPosts() {
  try {
    const posts: IPost[] = yield call(api.fetchPosts);
    yield put(blogSlice.postsReceived(posts));
  } catch (err: any) {
    yield put(blogSlice.errorReceived(err.message));
  }
}

function* createPost({
  payload,
}: PayloadAction<Pick<IPost, "title" | "body">>) {
  try {
    const post: IPost = yield call(api.createPost, payload);
    yield put(blogSlice.postCreated(post));
  } catch (err: any) {
    yield put(blogSlice.errorReceived(err.message));
  }
}

function* updatePost({ payload }: PayloadAction<IPost>) {
  try {
    const post: IPost = yield call(api.updatePost, payload);
    yield put(blogSlice.postUpdated(post));
  } catch (err: any) {
    yield put(blogSlice.errorReceived(err.message));
  }
}

function* deletePost({ payload }: PayloadAction<Pick<IPost, "id">>) {
  try {
    yield call(api.deletePost, payload);
    yield put(blogSlice.postDeleted(payload));
  } catch (err: any) {
    yield put(blogSlice.errorReceived(err.message));
  }
}

function* createComment({ payload }: PayloadAction<Omit<IComment, "id">>) {
  try {
    const comment: IComment = yield call(api.createComment, payload);
    yield put(blogSlice.commentCreated(comment));
  } catch (err: any) {
    yield put(blogSlice.errorReceived(err.message));
  }
}

function* watchFetchPosts() {
  yield takeLeading(blogSlice.postsReceive, fetchAllPosts);
}

function* watchCreatePost() {
  yield takeLeading(blogSlice.postCreate, createPost);
}

function* watchUpdatePost() {
  yield takeLeading(blogSlice.postUpdate, updatePost);
}

function* watchDeletePost() {
  yield takeLeading(blogSlice.postDelete, deletePost);
}

function* watchCreateComment() {
  yield takeLeading(blogSlice.commentCreate, createComment);
}

export {
  fetchAllPosts,
  createPost,
  updatePost,
  deletePost,
  createComment,
  watchFetchPosts,
  watchCreatePost,
  watchUpdatePost,
  watchDeletePost,
  watchCreateComment,
};
