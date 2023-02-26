// @flow
import React, { useState } from 'react';
import type { Node } from 'react';
import {
  Modal, Text, TouchableOpacity, View,
} from 'react-native';
import { Link, useNavigate } from 'react-router-native';
import { useDispatch, useSelector } from 'react-redux';
import CodePush from 'react-native-code-push';
import { secondsToMilliseconds } from 'date-fns';
import { isEmpty, isEqual } from 'lodash';
import useLocale from '../../../locales';
import Alert from '../../elements/misc/Alert';
import Info from '../../../assets/icons/Info';
import { deviceInfo } from '../../../utils';
import { useLocationInfo, useTeleport } from '../../../utils/hooks';
import { codepush } from '../../../tokens';
import { actions, selectors } from '../../../store/globalStore';
import navigationStyle from '../../../styles/navigation';
import mainStyle from '../../../styles/main';
import colors from '../../../styles/colors';
import type { ReduxState } from '../../../types';

function Navigation(): Node {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useLocale();
  const { teleport } = useTeleport();
  const locationInfo = useLocationInfo();
  const developerMode: boolean = useSelector((state: ReduxState) => state.global.developerMode, isEqual);
  const { scales, showLegend } = useSelector((state: ReduxState) => ({
    scales: selectors.getScales(state),
    showLegend: state.global.showLegend,
  }), isEqual);
  const codepushEnvironment = useSelector(selectors.getCodepushEnvironment, isEqual);
  const [codepushSyncing, setCodepushSyncing] = useState(false);
  const isProduction = codepushEnvironment === 'Production';

  const handleAlert = (e) => {
    if (isEmpty(scales)) {
      e.preventDefault();
      teleport(
        <Alert clearDelayMS={secondsToMilliseconds(5)}>
          <Text style={mainStyle.alertText}>{t('alert.no_key')}</Text>
        </Alert>,
      );
    }
  };

  const handleAppEnvironment = () => {
    const key = isProduction ? codepush[deviceInfo.isApple ? 'ios' : 'android'].staging : codepush[deviceInfo.isApple ? 'ios' : 'android'].production;

    setCodepushSyncing(true);
    CodePush.clearUpdates();
    CodePush.sync({
      deploymentKey: key,
      installMode: CodePush.InstallMode.IMMEDIATE,
    });
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
      {developerMode && (
        <TouchableOpacity style={navigationStyle.appEnvironment} activeOpacity={0.8} onPress={handleAppEnvironment}>
          <Text style={navigationStyle.appEnvironmentText}>{codepushEnvironment}</Text>
        </TouchableOpacity>
      )}
      <TouchableOpacity onPress={() => dispatch(actions.showLegend(!showLegend))} onLongPress={handleAdminRedirect}>
        <Info style={navigationStyle.info} />
      </TouchableOpacity>

      <Modal animationType="fade" visible={codepushSyncing} statusBarTranslucent transparent>
        <Alert>
          <Text style={[mainStyle.alertText, { fontSize: 14 }]}>
            {t('alert.codepush_syncing.text_1')}
            {t('alert.codepush_syncing.' + codepushEnvironment)}
            {t('alert.codepush_syncing.text_2')}
          </Text>
        </Alert>
      </Modal>
    </View>
  );
}

export default Navigation;
