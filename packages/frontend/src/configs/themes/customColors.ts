import type { CSSProperties } from 'react';
import type { AppColorType } from '@/types';

const customColors: Record<AppColorType, CSSProperties['color']> = {
  /* color name reference: https://colors.artyclick.com/color-name-finder/ */
  white: '#FFFFFF',
  brightBlue: '#0070F3',
  daySkyBlue: '#8ABDF9',
  treeGreen: '#00791B',
  blackEel: '#434343',
  dirtyOrange: '#C57600',
  scarletRed: '#B90002',
  alabaster: '#E9E9EB',
  whiteSmoke: '#F5F5F5',
  bluishCyan: '#F1F3F4',
  lightGrey: '#D9D9D9',
  paleSky: '#70757a', //
  moonMist: '#DBDBDB',
  titanWhite: '#E6F1FE',
  chipTealishBlue: '#7986cb',
};

export default customColors;
