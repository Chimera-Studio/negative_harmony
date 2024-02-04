/* eslint-disable react/jsx-no-constructed-context-values */
import React, { useState } from 'react';
import type { ReactNode } from 'react';
import { PortalContext } from '../../../context';

type Props = {
  children: ReactNode,
};

function PortalProvider({ children }: Props) {
  const [component, setComponent] = useState<ReactNode | null>(null);

  const teleport = (element: ReactNode) => setComponent(element);
  const close = () => setComponent(null);

  return (
    // @ts-ignore
    <PortalContext.Provider value={{ teleport, close }}>
      {component}
      {children}
    </PortalContext.Provider>
  );
}

export default PortalProvider;
