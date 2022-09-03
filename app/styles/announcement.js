// @flow
import { StyleSheet } from 'react-native';
import colors from './colors';

type AnnouncementStyle = {
  ...Object
};

const announcementStyle: AnnouncementStyle = StyleSheet.create({
  title: {
    color: colors.black,
    fontFamily: 'NegativeHarmony-Bold',
    fontSize: 24,
    marginBottom: 40,
    marginTop: 40,
    textAlign: 'center',
  },

  text: {
    color: colors.black,
    fontFamily: 'NegativeHarmony',
    fontSize: 16,
  },

  list: {
    flexDirection: 'column',
  },

  listItem: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 10,
  },

  listCount: {
    alignSelf: 'center',
    color: colors.blue,
    fontFamily: 'NegativeHarmony-Bold',
    fontSize: 15,
    marginRight: 6,
  },

  listBullet: {
    backgroundColor: colors.blue,
    borderRadius: 4,
    height: 8,
    marginTop: 6,
    marginRight: 6,
    width: 8,
  },

  button: {
    backgroundColor: colors.blue,
    borderRadius: 30,
    marginBottom: 60,
    marginVertical: 60,
    paddingHorizontal: 20,
    paddingVertical: 15,
  },

  buttonText: {
    color: colors.white,
    fontFamily: 'NegativeHarmony-Bold',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default announcementStyle;
