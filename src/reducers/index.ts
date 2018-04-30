import { firebaseReducer as FirebaseReducer } from 'react-redux-firebase';
import { combineReducers } from 'redux';

import AppReducer, { AppState } from 'app/reducers/app';
import { Posts } from 'app/types';

export interface RootState {
  firebase: {
    data: {
      posts: Posts,
    },
  };
  app: AppState;
}

export default combineReducers( {
  firebase: FirebaseReducer,
  app: AppReducer,
} );
