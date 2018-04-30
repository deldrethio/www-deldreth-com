import { Action, ActionCreator } from 'redux';

export const enum Types {
  START = 'START',
}

export interface StartAction extends Action {
  type: Types.START;
  payload: {};
}

export const start = (): StartAction => ( {
  type: Types.START,
  payload: {},
} );

export const Creators = {
  start,
};
