import React from 'react';
import { connect } from 'react-redux';
import { firebaseConnect, isEmpty, isLoaded } from 'react-redux-firebase';
import { bindActionCreators, compose, Dispatch } from 'redux';
import styled from 'styled-components';

import { Creators } from 'app/actions';
import { RootState } from 'app/reducers';
import { Posts as PostsType } from 'app/types';

export interface Props {
  posts: PostsType;
}

class Posts extends React.Component<Props & typeof Creators> {
  renderPosts () {
    if ( this.props.posts ) {
      const keys = Object.keys( this.props.posts );

      return keys.map( key => (
        <div key={ key }>
          { key }: { this.props.posts[ key ] }
        </div>
      ) );
    }
  }
  render () {
    return (
      <PostsWrapper>
        { this.renderPosts() }
      </PostsWrapper>
    );
  }
}

const PostsWrapper = styled.div`
`;

const Connected = connect(
  ( state: RootState ): Props => ( {
    posts: state.firebase.data.posts,
  } ),
  ( dispatch: Dispatch<RootState> ): typeof Creators => bindActionCreators( Creators, dispatch ),
)( Posts );

export default compose(
  firebaseConnect( [
    'posts',
  ] ),
)( Connected );
