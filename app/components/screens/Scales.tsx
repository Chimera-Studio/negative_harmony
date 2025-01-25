import React, { useEffect, useRef, useState } from 'react';
import {
  Animated, Easing, Text, TouchableOpacity, View,
} from 'react-native';
import BottomScales from '@components/containers/bottom/BottomScales';
import Circle from '@components/containers/notes/Circle';
import Grid from '@components/containers/notes/Grid';
import Select from '@components/elements/inputs/Select';
import Legend from '@components/elements/misc/Legend';
import useLocale from '@locales';
import { InputType, actions, selectors } from '@store/globalStore';
import legendStyle from '@styles/legend';
import scalesStyle from '@styles/scales';
import selectStyle from '@styles/select';
import {
  useAppDispatch, useAppSelector, useReview, useTeleport,
} from '@utils/hooks';
import { ScaleKeys, musicScale, scaleList } from '@utils/patterns';
import { isEqual, times } from 'lodash';

export function Scales() {
  const { t } = useLocale();
  const { close } = useTeleport();
  const reviewApp = useReview();
  const dispatch = useAppDispatch();
  const global = useAppSelector(selectors.getGlobal, isEqual);
  const [openSelect, setOpenSelect] = useState(false);
  const screenOpacity = useRef(new Animated.Value(0)).current;
  const selectedScale = global.selectedScale || scaleList[0];

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

  const toggleInputType = () => {
    const type = global.inputType === InputType.circle ? InputType.grid : InputType.circle;
    dispatch(actions.switchInputType(type));
    dispatch(actions.showLegend(!global.showLegend));
  };

  const handleScales = (shiftBy: number | undefined, scale: any) => {
    const positive: any = [];
    const negative: any = [];

    const clone = musicScale.slice();
    // @ts-ignore
    times(shiftBy, () => clone.push(clone.shift()));

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

  const getKeyPosition = (key: ScaleKeys): [x: number, y: number] => {
    switch (key) {
      case ScaleKeys.keyG1:
        return [-15, -30];

      case ScaleKeys.keyG2:
        return [-30, -20];

      case ScaleKeys.keyG3:
        return [-30, 0];

      case ScaleKeys.keyG4:
        return [-30, 15];

      case ScaleKeys.keyG5:
        return [-20, 30];

      case ScaleKeys.keyG6:
        return [0, 30];

      case ScaleKeys.keyG7:
        return [15, 30];

      case ScaleKeys.keyG8:
        return [30, 20];

      case ScaleKeys.keyG9:
        return [30, 0];

      case ScaleKeys.keyG10:
        return [30, -15];

      case ScaleKeys.keyG11:
        return [20, -30];

      case ScaleKeys.keyG12:
        return [0, -30];

      default:
        return [0, 0];
    }
  };

  const handleKey = (group: ScaleKeys, noteIndex: number, angle: number) => {
    const [x, y] = getKeyPosition(group);

    dispatch(actions.storeAxis({ status: true, angle }));
    dispatch(actions.storeActiveKey({
      x, y, group, field: noteIndex,
    }));

    handleScales(noteIndex, selectedScale);
    reviewApp();
    close();
  };

  return (
    <Animated.View
      style={[scalesStyle.wrapper, { opacity: screenOpacity }]}
    >
      <View style={selectStyle.selectWrapper}>
        {global.showLegend ? (
          <View style={[legendStyle.legendContainer, legendStyle.legendContainerOffset]}>
            <Legend style={legendStyle.legend} />

            <TouchableOpacity style={legendStyle.legendSwitch} onPress={toggleInputType}>
              <Text style={legendStyle.legendSwitchText}>
                {global.inputType === InputType.circle
                  ? t('legend.switch_input.prompt')
                  : t('legend.switch_input.prompt_alt')}
              </Text>
              <Text style={legendStyle.legendSwitchCTA}>
                {t('legend.switch_input.cta')}
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <Select
            title={t('select.scales')}
            value={selectedScale}
            options={scaleList}
            isOpen={openSelect}
            onSelect={handleSelect}
            onOpen={() => setOpenSelect(true)}
            onClose={() => setOpenSelect(false)}
          />
        )}
      </View>
      {InputType.circle === global.inputType && (
        <Circle axis={global.axis} activeKey={global.activeKey} handleKey={handleKey} />
      )}
      {InputType.grid === global.inputType && (
        <Grid activeKey={global.activeKey} handleKey={handleKey} />
      )}
      <BottomScales data={global.scales} />
    </Animated.View>
  );
}

export default Scales;
