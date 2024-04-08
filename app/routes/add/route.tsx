import Heading from '@components/ui/display/Heading/Heading';
import Input from '@components/ui/input/Input/Input';
import type { MetaFunction } from "@remix-run/node";
import styles from './add.module.css';
import Icon from '@components/ui/display/Icon/Icon';
import TextArea from '@components/ui/input/TextArea/TextArea';
import Button from '@components/ui/input/Button/Button';

export const meta: MetaFunction = () => {
  return [
    { title: "Add Birthdays | Birthday Buddy" },
    { name: "description", content: "Birthday Buddy" },
  ];
};

const AddBirthday = () => {
  return (
    <div className={styles.Add}>
      <Heading
        title="Add a Birthday"
        subtitle="Don't forget again!"
      />
      <form action="">
        <div className={styles.row}>
          <Icon name='person' />
          <Input
            placeholder='Name'
            label='Full Name'
            type='text'
          />
        </div>
        <div className={styles.row}>
          <Icon name='event' />
          <Input
            placeholder='Date'
            label='Full Name'
            type='date'
          />
          <Input
            placeholder='Date'
            label='Full Name'
            type='date'
            disabled
          />
        </div>
        <div className={styles.row}>
          <Icon name='description' />
          <TextArea
            placeholder='Birthday gifts, party ideas, etc.'
            label='Notes'
          />
        </div>
        <Button >
          Add Birthday
        </Button>
      </form>
    </div>
  );
}

export default AddBirthday;