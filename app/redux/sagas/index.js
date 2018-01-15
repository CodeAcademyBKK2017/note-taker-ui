import ApiNotes from '../../api';
import StorageUtil from './../../utils/StorageUtil';
import TransformerUtil from './../../utils/TransformerUtil';
import {Alert} from 'react-native';
import {call, put, select, takeLatest} from 'redux-saga/effects';

const notesKey = 'notes';

function* loadNotes () {
  let notes;
  try {
    notes = yield call(ApiNotes.getNotes);
  } catch (error) {
    const value = yield call(StorageUtil.getItem, notesKey);
    notes = value ? value : [];
  }
  return notes;
}

function* fetchNoteHandler () {
  yield put({
    type: 'SHOW_LOADER'
  });
  const notes = yield call(loadNotes);

  yield put({
    type: 'POPULATE_NOTES',
    payload: notes
  });

  yield put({
    type: 'HIDE_LOADER'
  });
}

function* saveNote (note) {
  try {
    const response = yield call(ApiNotes.addNote, note);

    const oldNotes = yield select((storeState) => storeState.notes);
    const newNotes = [...oldNotes];
    newNotes.push(response);
    
    yield call(StorageUtil.setItem, notesKey, newNotes);

    yield put({
      type: 'ADD_NOTE',
      payload: response
    });
  } catch (error) {
    Alert.alert(
      'Save Failed',
      String(error),
      [
        {text: 'OK'}
      ],
      {
        cancelable: false
      }
    );
  }
}

function* saveNoteHandler (action) {
  yield put({
    type: 'SHOW_LOADER'
  });
  
  const note = action.payload;
  yield call(saveNote, note);

  yield put({
    type: 'HIDE_LOADER'
  });
}

function* deleteRequestNote (id) {
  try {
    yield call(ApiNotes.deleteNote, id);

    const oldNotes = yield select((storeState) => storeState.notes);
    const filteredNotes = TransformerUtil.removeNote(oldNotes, id);
    yield call(StorageUtil.setItem, notesKey, filteredNotes);

    yield put({
      type: 'DELETE_NOTE',
      payload: id
    });
  } catch (error) {
    Alert.alert(
      'Delete Failed',
      String(error),
      null,
      {
        cancelable: false
      }
    );
  }
}

function* deleteRequestNoteHandler (action) {
  yield put({
    type: 'SHOW_LOADER'
  });
  
  const id = action.payload;
  yield call(deleteRequestNote, id);

  yield put({
    type: 'HIDE_LOADER'
  });
}

function* notesSaga () {
  yield takeLatest('FETCH_NOTES', fetchNoteHandler);
  yield takeLatest('SAVE_NOTE', saveNoteHandler);
  yield takeLatest('DELETE_REQUEST_NOTE', deleteRequestNoteHandler);
}

export default notesSaga;
