import { call, put, takeLatest } from 'redux-saga/effects';

//import { shopItemActionTypes } from './shop-item.types';
// import {
//   fetchCollectionsSuccess,
//   fetchCollectionsFailure,
// } from './shop-item.actions';
import {
  fetchCollections,
  fetchCollectionsSuccess,
  fetchCollectionsFailure,
} from './shop-item.reducer';

import {
  firestore,
  convertCollectionsSnapshotToMap,
} from '../../firebase/firebase.utils';

export function* fetchCollectionsAsync() {
  try {
    const collectionRef = firestore.collection('collections');
    const snapshot = yield collectionRef.get();
    const collectionsMap = yield call(
      convertCollectionsSnapshotToMap,
      snapshot
    );

    yield put(fetchCollectionsSuccess(collectionsMap));
  } catch (error) {
    yield put(fetchCollectionsFailure());
  }
}

//only listen to the start action then trigger the following
export function* fetchCollectionsStart() {
  yield takeLatest(fetchCollections.type, fetchCollectionsAsync);
}
