// @flow
import { createContext } from 'react';
import type { Context, Node } from 'react';

export type PortalProps = {
  teleport: Function,
  close: Function,
}

export const PortalContext: Context<PortalProps> = createContext({
  teleport: (element: Node) => element,
  close: () => null,
});
