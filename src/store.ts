import firebase from 'firebase';
import { reactReduxFirebase } from 'react-redux-firebase';
import { applyMiddleware, compose, createStore, Middleware, Store } from 'redux';
import { effectsMiddleware } from 'redux-effex';

import effects from 'app/effects';
import rootReducer, { RootState } from 'app/reducers';

const firebaseConfig = {
  apiKey: 'AIzaSyD3ujR3j1VdjM3DbQmbg_pYhhHd6wLv0Y4',
  authDomain: 'deldreth-io.firebaseapp.com',
  databaseURL: 'https://deldreth-io.firebaseio.com',
  projectId: 'deldreth-io',
  storageBucket: 'deldreth-io.appspot.com',
  messagingSenderId: '971739521121',
};

const rrfConfig = {
  userProfile: 'users',
};

const middleware: Middleware[] = [];
middleware.push( effectsMiddleware( effects ) );
// middleware.push( );

export default function configureStore ( initialState?: RootState ): Store<RootState> {
  const windowIfDefined = typeof window === 'undefined' ? null : window as any;

  const enhance = [
    applyMiddleware( ...middleware ),
  ];

  let composition = compose;
  if ( process.env.NODE_ENV !== 'production' ) {
    composition = windowIfDefined.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  }

  firebase.initializeApp( firebaseConfig );

  const createStoreWithFirebase = composition(
    reactReduxFirebase( firebase, rrfConfig ),
    ...enhance,
  )( createStore ) as typeof createStore;

  const store = createStoreWithFirebase<RootState>( rootReducer as any );

  if ( module.hot ) {
    module.hot.accept( 'app/reducers', () => {
      const nextReducer = require( 'app/reducers' );
      store.replaceReducer( nextReducer );
    } );
  }

  return store;
}
