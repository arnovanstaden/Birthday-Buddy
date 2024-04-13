import { MaterialSymbolName } from './MaterialSymbolNames';

type CustomIcon = 'apple' | 'google';

export interface IconProps extends CommonProps {
  /**
* The name of the Material Symbol or custom icon to display.
*/
  name: MaterialSymbolName | CustomIcon;
  /**
  * the font-size of the icon.
  * Default to 24px;
  */
  size?: number;
  /**
   * The font colour to apply. Defaults to primary
   */
  colour?: 'gray' | 'green',
}
