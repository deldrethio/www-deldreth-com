import { StartAction, Types } from 'app/actions';
import { mongucer } from 'app/utils';

interface App {
  loaded: boolean;
}

export type AppState = Readonly<App>;

export const initialState: AppState = {
  loaded: false,
};

function start ( state: AppState = initialState, action: StartAction ): AppState {
  return {
    ...state,
    loaded: true,
  };
}

const handlers = {
  [ Types.START ]: start,
};

export default mongucer( initialState, handlers );
