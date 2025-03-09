import { Middleware } from '@floating-ui/dom';
import { AlignedPlacement, Side } from '@floating-ui/utils';

export * from '@floating-ui/dom';

export type Placement = Side | AlignedPlacement
export type MiddlewareList = Array<Middleware | null | undefined | false>;
