import { RootState } from "@/redux/store.ts";
import { select, takeLatest } from "redux-saga/effects";

function* log() {
  const state: RootState = yield select();
  console.log(state.todo);
}

function* todoSaga() {
  yield takeLatest("*", log);
}

export default todoSaga;
