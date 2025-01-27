import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Link, useNavigate } from 'react-router-native';
import Info from '@assets/icons/Info';
import Alert from '@components/elements/misc/Alert';
import useLocale from '@locales';
import { actions, selectors } from '@store/globalStore';
import colors from '@styles/colors';
import mainStyle from '@styles/main';
import navigationStyle from '@styles/navigation';
import {
  useAppDispatch, useAppSelector, useLocationInfo, useTeleport,
} from '@utils/hooks';
import { secondsToMilliseconds } from 'date-fns';
import { isEmpty, isEqual } from 'lodash';

function Navigation() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { t } = useLocale();
  const { teleport } = useTeleport();
  const locationInfo = useLocationInfo();
  const developerMode: boolean = useAppSelector((state) => state.global.developerMode, isEqual);
  const { scales, showLegend } = useAppSelector((state) => ({
    scales: selectors.getScales(state),
    showLegend: state.global.showLegend,
  }), isEqual);

  const handleAlert = (e: any) => {
    if (isEmpty(scales)) {
      e.preventDefault();
      teleport(
        <Alert clearDelayMS={secondsToMilliseconds(5)}>
          <Text style={mainStyle.alertText}>{t('alert.no_key')}</Text>
        </Alert>,
      );
    }
  };

  const handleAdminRedirect = () => {
    if (developerMode) {
      navigate('/state-tree');

      return;
    }

    dispatch(actions.showLegend(!showLegend));
  };

  if (!locationInfo.isScales && !locationInfo.isChords) return null;

  return (
    <View style={navigationStyle.navigation}>
      <Link
        to={locationInfo.isScales ? '/chords' : '/'}
        onPress={(e) => handleAlert(e)}
        underlayColor={colors.lightBlue}
        style={navigationStyle.switch}
      >
        <Text style={navigationStyle.switchText}>
          {t(locationInfo.isScales ? 'links.scales' : 'links.chords')}
        </Text>
      </Link>
      <TouchableOpacity
        onPress={() => dispatch(actions.showLegend(!showLegend))}
        onLongPress={handleAdminRedirect}
      >
        <Info style={navigationStyle.info} />
      </TouchableOpacity>
    </View>
  );
}

export default Navigation;
