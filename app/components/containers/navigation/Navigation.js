// @flow
import React from 'react';
import type { Node } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Link } from 'react-router-native';
import { useDispatch, useSelector } from 'react-redux';
import { secondsToMilliseconds } from 'date-fns';
import { isEmpty, isEqual } from 'lodash';
import useLocale from '../../../locales';
import { useLocationInfo, useTeleport } from '../../../utils/hooks';
import Alert from '../../elements/misc/Alert';
import Info from '../../../assets/icons/Info';
import { actions, selectors } from '../../../store/globalStore';
import navigationStyle from '../../../styles/navigation';
import colors from '../../../styles/colors';
import type { ReduxState } from '../../../types';

function Navigation(): Node {
  const dispatch = useDispatch();
  const { t } = useLocale();
  const { teleport } = useTeleport();
  const locationInfo = useLocationInfo();
  const { scales, showLegend } = useSelector((state: ReduxState) => ({
    scales: selectors.getScales(state),
    showLegend: state.global.showLegend,
  }), isEqual);
  const path = locationInfo.isScales ? '/chords' : '/';

  const handleAlert = (e) => {
    if (isEmpty(scales)) {
      e.preventDefault();
      teleport(
        <Alert clearDelayMS={secondsToMilliseconds(5)}>
          {t('alert.no_key')}
        </Alert>,
      );
    }
  };

  if (locationInfo.isInfo || locationInfo.isRewarded) return null;

  return (
    <View style={navigationStyle.navigation}>
      <Link
        to={path}
        onPress={(e) => handleAlert(e)}
        underlayColor={colors.lightBlue}
        style={navigationStyle.switch}
      >
        <Text style={navigationStyle.switchText}>
          {t(locationInfo.isScales ? 'links.scales' : 'links.chords')}
        </Text>
      </Link>
      <TouchableOpacity onPress={() => dispatch(actions.showLegend(!showLegend))}>
        <Info style={navigationStyle.info} />
      </TouchableOpacity>
    </View>
  );
}

export default Navigation;
