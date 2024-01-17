import { createContext } from 'react';
import type { ReactNode } from 'react';

export const PortalContext = createContext({
  teleport: (element: ReactNode) => element,
  close: () => null,
});
