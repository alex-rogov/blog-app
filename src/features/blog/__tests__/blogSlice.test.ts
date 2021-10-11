import { PayloadAction } from "@reduxjs/toolkit";
import { expectSaga } from "redux-saga-test-plan";
import * as matchers from "redux-saga-test-plan/matchers";
import IPost from "../../../models/IPost";
import reducer, * as blogSlice from "../blogSlice";
import * as api from "../../../api";
import * as saga from "../sagas";
import IComment from "../../../models/IComment";

describe("Blog", () => {
  describe("state", () => {
    it("should init with initial state", () => {
      expect(
        reducer(blogSlice.initialState, { type: undefined })
      ).toMatchObject(blogSlice.initialState);
    });
  });

  describe("posts", () => {
    it("should update the existing post", () => {
      const post: IPost = {
        id: 1,
        title: "title",
        body: "body",
        comments: [],
      };
      const expectedState: blogSlice.State = reducer(
        blogSlice.initialState,
        blogSlice.postUpdated(post)
      );

      return expectSaga(saga.updatePost, { type: "", payload: post })
        .withReducer(reducer)
        .provide([[matchers.call.fn(api.updatePost), post]])
        .put(blogSlice.postUpdated(post))
        .hasFinalState(expectedState)
        .run();
    });
  });
  describe("comments", () => {
    it("should add a new comment", () => {
      const post: IPost = {
        id: 1,
        title: "title",
        body: "body",
        comments: [],
      };
      const comment: IComment = {
        id: 1,
        postId: 1,
        body: "body",
      };
      const stateWithPost: blogSlice.State = reducer(
        blogSlice.initialState,
        blogSlice.postUpdated(post)
      );
      const expectedState: blogSlice.State = reducer(
        stateWithPost,
        blogSlice.commentCreated(comment)
      );

      return expectSaga(saga.createComment, { type: "", payload: comment })
        .withReducer(reducer)
        .withState(stateWithPost)
        .provide([[matchers.call.fn(api.createComment), comment]])
        .put(blogSlice.commentCreated(comment))
        .hasFinalState(expectedState)
        .run();
    });
  });
});
