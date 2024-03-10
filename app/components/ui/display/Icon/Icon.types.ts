import { MaterialSymbolName } from './MaterialSymbolNames';

export interface IconProps extends CommonProps {
  /**
* The name of the Material Symbol
*/
  name: MaterialSymbolName;
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
