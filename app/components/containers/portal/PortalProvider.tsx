// @flow
import React, { useState } from 'react';
import type { Node } from 'react';
import { PortalContext } from '../../../context';

type Props = {
  children: Node,
}

function PortalProvider({ children }: Props): Node {
  const [component, setComponent] = useState(null);

  const teleport = (element: Node) => setComponent(element);
  const close = () => setComponent(null);

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <PortalContext.Provider value={{ teleport, close }}>
      {component}
      {children}
    </PortalContext.Provider>
  );
}

export default PortalProvider;
