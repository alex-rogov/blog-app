import { all, call } from "redux-saga/effects";
import * as saga from "../features/blog/sagas";

export default function* rootSaga() {
  yield all([
    call(saga.watchFetchPosts),
    call(saga.watchCreatePost),
    call(saga.watchUpdatePost),
    call(saga.watchDeletePost),
    call(saga.watchCreateComment),
  ]);
}
