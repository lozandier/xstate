import { ActorRefFrom, AnyStateMachine, ActorOptions, StateFrom } from 'xstate';
import { useActor } from './useActor.ts';

/**
 * @alias useActor
 */
export function useMachine<TMachine extends AnyStateMachine>(
  machine: TMachine,
  options: ActorOptions<TMachine> = {}
): [
  StateFrom<TMachine>,
  ActorRefFrom<TMachine>['send'],
  ActorRefFrom<TMachine>
] {
  return useActor(machine as any, options as any) as any;
}
