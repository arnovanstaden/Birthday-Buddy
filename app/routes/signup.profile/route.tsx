import Heading from '@components/ui/display/Heading/Heading';
import Button from '@components/ui/input/Button/Button';
import Input from '@components/ui/input/Input/Input';
import type { MetaFunction } from "@remix-run/node";
import styles from './signUpProfile.module.css';
import PhotoPicker from '@components/content/PhotoPicker/PhotoPicker';
import Icon from '@components/ui/display/Icon/Icon';
import DatePicker from '@components/content/DatePicker/DatePicker';

export const meta: MetaFunction = () => {
  return [
    { title: "Sign Up | Birthday Buddy" },
    { name: "description", content: "Birthday Buddy" },
  ];
};

const SignUpProfile = () => {
  return (
    <div className={styles.SignUpProfile}>
      <Heading
        title="Your Profile"
        subtitle="Almost there!"
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
          Finish Sign Up
        </Button>
      </form>
    </div>
  );
}

export default SignUpProfile;
