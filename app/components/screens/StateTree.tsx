import React from 'react';
import { ScrollView } from 'react-native';
import JSONTree from 'react-native-json-tree';
import { Link } from 'react-router-native';
import Exit from '@assets/icons/Exit';
import Main from '@components/containers/Main';
import colors from '@styles/colors';
import mainStyle from '@styles/main';
import * as utils from '@utils';
import { useAppSelector } from '@utils/hooks';
import { includes, isEqual } from 'lodash';

function StateTree() {
  const store = useAppSelector((state) => state, isEqual);

  const theme = {
    base00: colors.transparent, // BACKGROUND
    base01: '#303030', // ???
    base02: '#505050', // ???
    base03: colors.positiveText, // KEY_NUMBER_OPEN
    base04: '#d0d0d0', // ???
    base05: '#e0e0e0', // ???
    base06: '#f5f5f5', // ???
    base07: colors.black, // ???
    base08: colors.red, // NULL
    base09: colors.green, // NUMBERS & BOOLEAN
    base0A: colors.black, // ???
    base0B: colors.positiveText, // STRING & KEY_NUMBER_CLOSED
    base0C: '#76c7b7', // ???
    base0D: colors.black, // KEYS
    base0E: '#d381c3', // ???
    base0F: colors.black, // ???
  };

  const data = {
    deviceHeight: utils.deviceHeight,
    deviceWidth: utils.deviceWidth,
    deviceInfo: utils.deviceInfo,
    redux: store,
  };

  return (
    <Main style={mainStyle.container}>
      <Link to="/" style={mainStyle.exit} underlayColor={colors.transparent}>
        <Exit color={colors.blue} />
      </Link>
      <ScrollView
        style={{ flex: 1, marginTop: 60, overflow: 'hidden' }}
        contentContainerStyle={mainStyle.scrollDeviceContainer}
        showsVerticalScrollIndicator
      >
        <JSONTree
          data={data}
          theme={theme}
          invertTheme={false}
          shouldExpandNode={(key) => includes(key, 'deviceInfo')}
          hideRoot
        />
      </ScrollView>
    </Main>
  );
}

export default StateTree;
