import { Platform, UIManager } from 'react-native';

export const enableLayoutAnimation = () => {
  try {
    if (
      Platform.OS === 'android' &&
      UIManager.setLayoutAnimationEnabledExperimental
    ) {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  } catch (e) {
    // ignore
  }
};