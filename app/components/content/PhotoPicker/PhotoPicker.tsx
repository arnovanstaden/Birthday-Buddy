import Icon from '@components/ui/display/Icon/Icon';
import styles from './PhotoPicker.module.css';
import { PhotoPickerProps } from './PhotoPicker.types';
import { useState } from 'react';

const PhotoPicker: React.FC<PhotoPickerProps> = (props) => {
  const [image, setImage] = useState<string>(props.defaultImage || '');

  const updateImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(URL.createObjectURL(file))
    }
  }

  return (
    <div className={styles.PhotoPicker}>
      <input
        type="file"
        accept="image/*"
        onChange={updateImage}
      />
      {
        image ?
          <img
            src={image}
            alt="Preview"
          />
          :
          <Icon
            name="account_circle"
            className={styles.icon}
            size={110}
          />
      }
    </div>
  );
};

export default PhotoPicker;
