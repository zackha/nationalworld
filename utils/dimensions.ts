import { Dimensions } from 'react-native';

export const screenWidth = Dimensions.get('window').width;
export const screenHeight = Dimensions.get('window').height;

export const wp = (percentage: number) => (screenWidth * percentage) / 100;
export const hp = (percentage: number) => (screenHeight * percentage) / 100;
