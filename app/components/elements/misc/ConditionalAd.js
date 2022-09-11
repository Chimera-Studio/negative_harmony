// @flow
import type { Node } from 'react';
import { useSelector } from 'react-redux';
import { get, isEqual } from 'lodash';
import { selectors } from '../../../store/cmsStore';

type Props = {
  children: Node,
};

function ConditionalAd(props: Props): any {
  const cms = useSelector(selectors.getCMS, isEqual);
  const displayAds = get(cms, 'master.ads', false);

  if (!displayAds) return null;

  return props.children;
}

export default ConditionalAd;
