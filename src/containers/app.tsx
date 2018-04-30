import { hot } from 'react-hot-loader';

import CssBaseline from 'material-ui/CssBaseline';
import React from 'react';
import { connect } from 'react-redux';
import { firebaseConnect, isEmpty, isLoaded } from 'react-redux-firebase';
import { bindActionCreators, compose, Dispatch } from 'redux';
import styled from 'styled-components';

import { Creators } from 'app/actions';
import Header from 'app/components/header';
import Posts from 'app/containers/posts';
import { RootState } from 'app/reducers';

import { createMuiTheme, MuiThemeProvider } from 'material-ui/styles';
const theme = createMuiTheme( {
  palette: {
    primary: {
      main: '#8e24aa',
      light: '#c158dc',
      dark: '#5c007a',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#ffab00',
      light: '#ffdd4b',
      dark: '#c67c00',
      contrastText: '#000000',
    },
  },
} );

export interface Props {
  loaded: boolean;
}

class App extends React.Component<Props & typeof Creators> {
  render () {
    return (
      <MuiThemeProvider theme={ theme }>
        <AppWrapper>
          <CssBaseline />

          <Header />

          <Posts />
        </AppWrapper>
      </MuiThemeProvider>
    );
  }
}

const AppWrapper = styled.div`

`;

export default hot( module )(
  connect(
    ( state: RootState ): Props => ( {
      loaded: state.app.loaded,
    } ),
    ( dispatch: Dispatch<RootState> ): typeof Creators => bindActionCreators( Creators, dispatch ),
  )( App ),
);
