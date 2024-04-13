import Heading from '@components/ui/display/Heading/Heading';
import type { MetaFunction } from "@remix-run/node";
import styles from './birthday.edit.module.css';
import PhotoPicker from '@components/content/PhotoPicker/PhotoPicker';
import Icon from '@components/ui/display/Icon/Icon';
import DatePicker from '@components/content/DatePicker/DatePicker';
import Input from '@components/ui/input/Input/Input';
import Button from '@components/ui/input/Button/Button';
import TextArea from '@components/ui/input/TextArea/TextArea';

export const meta: MetaFunction = () => {
  return [
    { title: "Edit Birthday | Birthday Buddy" },
    { name: "description", content: "Birthday Buddy" },
  ];
};

const BirthdayEdit = () => {
  return (
    <div className={styles.BirthdayEdit}>
      <Heading
        title="Edit Birthday"
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
        <div className={styles.row}>
          <Icon name='description' />
          <TextArea
            placeholder='Birthday gifts, party ideas, etc.'
            label='Notes'
          />
        </div>
        <Button >
          Save Birthday
        </Button>
      </form>
    </div>
  );
}

export default BirthdayEdit;