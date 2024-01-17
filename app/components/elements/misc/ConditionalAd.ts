import type { ReactNode } from 'react';
import { config } from '../../../tokens';

type Props = {
  children: ReactNode,
};

function ConditionalAd(props: Props): any {
  if (!config.ads) return null;

  return props.children;
}

export default ConditionalAd;
