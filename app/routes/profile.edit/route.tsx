import Heading from '@components/ui/display/Heading/Heading';
import type { MetaFunction } from "@remix-run/node";
import styles from './profile.edit.module.css';
import PhotoPicker from '@components/content/PhotoPicker/PhotoPicker';
import Icon from '@components/ui/display/Icon/Icon';
import DatePicker from '@components/content/DatePicker/DatePicker';
import Input from '@components/ui/input/Input/Input';
import Button from '@components/ui/input/Button/Button';

export const meta: MetaFunction = () => {
  return [
    { title: "Edit Profile | Birthday Buddy" },
    { name: "description", content: "Birthday Buddy" },
  ];
};

const ProfileEdit = () => {
  return (
    <div className={styles.ProfileEdit}>
      <Heading
        title="Edit Profile"
        subtitle="Want to change something?"
      />
      <form action="">
        <PhotoPicker />
        <div className={styles.row}>
          <Icon name='person' />
          <Input
            placeholder='Name'
            type='text'
          />
        </div>
        <div className={styles.row}>
          <Icon name='event' />
          <DatePicker />
        </div>
        <Button >
          Save Profile
        </Button>
      </form>
    </div>
  );
}

export default ProfileEdit;