import Icon from '@components/ui/display/Icon/Icon';
import styles from './PhotoPicker.module.css';
import { PhotoPickerProps } from './PhotoPicker.types';

const PhotoPicker: React.FC<PhotoPickerProps> = (props) => {
  return (
    <div className={styles.PhotoPicker}>
      <input
        accept="image/*"
        {...props.inputProps}
        {...props.register}
      />
      {
        props.defaultImage ?
          <img
            src={props.defaultImage}
            alt="Preview"
            width={150}
            height={150}
          />
          :
          <Icon
            name="account_circle"
            className={styles.icon}
            size={150}
          />
      }
    </div>
  );
};

export default PhotoPicker;
