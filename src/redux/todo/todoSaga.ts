import { RootState } from "@/redux/store.ts";
import { Todo } from "@/types/todo.ts";
import { delay, select, takeLatest } from "redux-saga/effects";
import store from "store2";

const SAVE_TODO = "SAVE_TODO";
const LOAD_TODO = "LOAD_TODO";

function* save() {
  const rootState: RootState = yield select();
  const state: Todo[] = rootState.todo;
  delay(1000);
  store.namespace("todo").set("todo", JSON.stringify(state));
}

function* load() {
  const rootState: RootState = yield select();
  const state: Todo[] = rootState.todo;

  let y;
  if (state.length === 0) y = true;
  else y = confirm("unsaved todo will be lost");

  if (y) return JSON.stringify(store.namespace("todo").get("todo"));
}

function* todoSaga() {
  yield takeLatest(SAVE_TODO, save);
  yield takeLatest(LOAD_TODO, load);
}

export default todoSaga;
