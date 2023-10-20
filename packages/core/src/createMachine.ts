import {
  MachineConfig,
  MachineContext,
  InternalMachineImplementations,
  ParameterizedObject,
  ProvidedActor,
  NonReducibleUnknown,
  Prop,
  AnyEventObject
} from './types.ts';
import {
  TypegenConstraint,
  ResolveTypegenMeta,
  TypegenDisabled
} from './typegenTypes.ts';
import { StateMachine } from './StateMachine.ts';

type StateMapper<T> = {
  [key: string]: any;
  states?: {
    [K in keyof T]: StateMapper<T[K]>;
  };
};

export type StateValueFrom2<T> =
  | keyof T
  | {
      [K in keyof T]?: StateValueFrom2<T[K]>;
    };

export function createMachine<
  TContext extends MachineContext,
  TEvent extends AnyEventObject, // TODO: consider using a stricter `EventObject` here
  TActor extends ProvidedActor,
  TAction extends ParameterizedObject,
  TGuard extends ParameterizedObject,
  TDelay extends string,
  TTag extends string,
  TInput,
  TOutput extends NonReducibleUnknown,
  TStateMapper,
  // it's important to have at least one default type parameter here
  // it allows us to benefit from contextual type instantiation as it makes us to pass the hasInferenceCandidatesOrDefault check in the compiler
  // we should be able to remove this when we start inferring TConfig, with it we'll always have an inference candidate
  TTypesMeta extends TypegenConstraint = TypegenDisabled
>(
  config: MachineConfig<
    TContext,
    TEvent,
    TActor,
    TAction,
    TGuard,
    TDelay,
    TTag,
    TInput,
    TOutput,
    TTypesMeta
  > &
    StateMapper<TStateMapper>,
  implementations?: InternalMachineImplementations<
    TContext,
    TEvent,
    TActor,
    TAction,
    TDelay,
    ResolveTypegenMeta<
      TTypesMeta,
      TEvent,
      TActor,
      TAction,
      TGuard,
      TDelay,
      TTag
    >
  >
): StateMachine<
  TContext,
  TEvent,
  TActor,
  TAction,
  TGuard,
  TDelay,
  Prop<
    ResolveTypegenMeta<
      TTypesMeta,
      TEvent,
      TActor,
      TAction,
      TGuard,
      TDelay,
      TTag
    >['resolved'],
    'tags'
  > &
    string,
  TInput,
  TOutput,
  TStateMapper,
  ResolveTypegenMeta<TTypesMeta, TEvent, TActor, TAction, TGuard, TDelay, TTag>
> {
  return new StateMachine<
    any,
    any,
    any,
    any,
    any,
    any,
    any,
    any,
    any,
    any,
    any
  >(config as any, implementations as any);
}