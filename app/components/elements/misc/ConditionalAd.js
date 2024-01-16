// @flow
import type { Node } from 'react';
import { config } from '../../../tokens';

type Props = {
  children: Node,
};

function ConditionalAd(props: Props): any {
  if (!config.ads) return null;

  return props.children;
}

export default ConditionalAd;
