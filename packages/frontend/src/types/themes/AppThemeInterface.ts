import type { CSSProperties } from 'react';

import type { AppColorType } from './AppColorType';

export interface AppThemeInterface {
  app: {
    color: {
      [key in AppColorType]: CSSProperties['color'];
    };
  };
}
