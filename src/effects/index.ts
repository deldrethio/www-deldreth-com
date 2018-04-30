import { Effect, EffectParams } from 'redux-effex';

import { StartAction, Types } from 'app/actions';

async function start ( { action, dispatch }: EffectParams<StartAction> ): Promise<any> {
  return null;
}

export default [
  { action: Types.START, effect: start },
];
