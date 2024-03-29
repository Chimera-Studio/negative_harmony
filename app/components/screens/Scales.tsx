import React, { useEffect, useRef, useState } from 'react';
import { Animated, Easing, View } from 'react-native';
import { isEqual, times } from 'lodash';
import useLocale from '../../locales';
import { actions, selectors } from '../../store/globalStore';
import scalesChordsStyle from '../../styles/scales_chords';
import {
  useAppDispatch, useAppSelector, useReview, useTeleport,
} from '../../utils/hooks';
import { musicScale, scaleList } from '../../utils/patterns';
import BottomScales from '../containers/bottom/BottomScales';
import Circle from '../containers/circle/Circle';
import Select from '../elements/inputs/Select';
import Legend from '../elements/misc/Legend';

export function Scales() {
  const { t } = useLocale();
  const dispatch = useAppDispatch();
  const { close } = useTeleport();
  const reviewApp = useReview();
  const global = useAppSelector(selectors.getGlobal, isEqual);
  const [openSelect, setOpenSelect] = useState(false);
  const screenOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const handleScreenAnimation = (to: any) => {
      Animated.timing(screenOpacity, {
        toValue: to,
        duration: 500,
        useNativeDriver: true,
        easing: Easing.linear,
      }).start();
    };

    handleScreenAnimation(1);

    return () => handleScreenAnimation(0);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const selectedScale = global.selectedScale || scaleList[0];
  const keys = {
    keyG1: 'G1',
    keyG2: 'G2',
    keyG3: 'G3',
    keyG4: 'G4',
    keyG5: 'G5',
    keyG6: 'G6',
    keyG7: 'G7',
    keyG8: 'G8',
    keyG9: 'G9',
    keyG10: 'G10',
    keyG11: 'G11',
    keyG12: 'G12',
  };

  const handleScales = (shift: any, scale: any) => {
    const positive: any = [];
    const negative: any = [];

    const clone = musicScale.slice();
    // @ts-ignore
    times(shift, () => clone.push(clone.shift()));

    const negativeClone = clone.slice();
    // @ts-ignore
    times(8, () => negativeClone.push(negativeClone.shift()));
    negativeClone.reverse();

    times(scale.value.length, (i) => {
      positive.push(clone[scale.value[i]]);
      negative.push(negativeClone[scale.value[i]]);
    });

    dispatch(
      actions.storeScales({
        positiveRange: clone,
        negativeRange: negativeClone,
        positive,
        negative,
      }),
    );
  };

  const handleSelect = (scale: any) => {
    dispatch(actions.storeSelectedScale(scale));
    if (global.scales) handleScales(global.activeKey.field, scale);
    setOpenSelect(false);
  };

  const handleKey = (key: string, value: number, angle: number) => {
    let x = 0;
    let y = 0;
    if (key === keys.keyG1) {
      x = -15;
      y = -30;
    } else if (key === keys.keyG2) {
      x = -30;
      y = -20;
    } else if (key === keys.keyG3) {
      x = -30;
      y = 0;
    } else if (key === keys.keyG4) {
      x = -30;
      y = 15;
    } else if (key === keys.keyG5) {
      x = -20;
      y = 30;
    } else if (key === keys.keyG6) {
      x = 0;
      y = 30;
    } else if (key === keys.keyG7) {
      x = 15;
      y = 30;
    } else if (key === keys.keyG8) {
      x = 30;
      y = 20;
    } else if (key === keys.keyG9) {
      x = 30;
      y = 0;
    } else if (key === keys.keyG10) {
      x = 30;
      y = -15;
    } else if (key === keys.keyG11) {
      x = 20;
      y = -30;
    } else if (key === keys.keyG12) {
      x = 0;
      y = -30;
    }

    dispatch(actions.storeAxis({ status: true, angle }));
    dispatch(actions.storeActiveKey({
      x, y, group: key, field: value,
    }));

    handleScales(value, selectedScale);
    reviewApp();
    close();
  };

  return (
    <Animated.View
      style={[scalesChordsStyle.wrapper, { opacity: screenOpacity }]}
    >
      <View style={scalesChordsStyle.selectWrapper}>
        {global.showLegend ? (
          <Legend style={scalesChordsStyle.legend} />
        ) : (
          <Select
            title={t('select.scales')}
            value={selectedScale}
            options={scaleList}
            isOpen={openSelect}
            onSelect={handleSelect}
            onOpen={() => setOpenSelect(true)}
            onClose={() => setOpenSelect(false)}
            unlocked
          />
        )}
      </View>
      <Circle
        axis={global.axis}
        activeKey={global.activeKey}
        keys={keys}
        handleKey={handleKey}
      />
      <BottomScales data={global.scales} />
    </Animated.View>
  );
}

export default Scales;
