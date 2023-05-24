import { takeLatest, put, spawn, call } from "redux-saga/effects";
import {
  sendRequestToReceiveServices,
  sendRequestToReceiveDetails,
  exposeError,
  receiptServicesSuccess,
  receiptDetailsSuccess,
} from "../slices/servicesSlice";
import { getServicesList, getServiceDetails } from "../../api";

function* handleServicesListSaga() {
  try {
    const data = yield call(getServicesList);
    yield put(receiptServicesSuccess(data));
  } catch (e) {
    yield put(exposeError(e));
  }
}

function* handleServiceDetailsSaga(action) {
  try {
    const data = yield call(getServiceDetails, action.payload);
    yield put(receiptDetailsSuccess(data));
  } catch (e) {
    yield put(exposeError(e));
  }
}

function* watchServicesListSaga() {
  yield takeLatest(sendRequestToReceiveServices.type, handleServicesListSaga);
}

function* watchServiceDetailsSaga() {
  yield takeLatest(sendRequestToReceiveDetails.type, handleServiceDetailsSaga);
}

export default function* saga() {
  yield spawn(watchServicesListSaga);
  yield spawn(watchServiceDetailsSaga);
}
