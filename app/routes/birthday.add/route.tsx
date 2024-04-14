import Heading from '@components/ui/display/Heading/Heading';
import Input from '@components/ui/input/Input/Input';
import type { MetaFunction } from "@remix-run/node";
import styles from './add.module.css';
import Icon from '@components/ui/display/Icon/Icon';
import TextArea from '@components/ui/input/TextArea/TextArea';
import Button from '@components/ui/input/Button/Button';
import DatePicker from '@components/content/DatePicker/DatePicker';
import PhotoPicker from '@components/content/PhotoPicker/PhotoPicker';
import { SubmitHandler, useForm } from 'react-hook-form';

export const meta: MetaFunction = () => {
  return [
    { title: "Add Birthdays | Birthday Buddy" },
    { name: "description", content: "Birthday Buddy" },
  ];
};

interface AddBirthdayForm {
  name: string;
  date: string;
  notes: string;
}

const AddBirthday = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddBirthdayForm>()

  const onSubmit: SubmitHandler<AddBirthdayForm> = (data: AddBirthdayForm) => {
    console.log(data)
  }

  return (
    <div className={styles.Add}>
      <Heading
        title="Add a Birthday"
        subtitle="Don't forget again!"
      />
      <form onSubmit={handleSubmit(onSubmit)}>
        <PhotoPicker />
        <div className={styles.row}>
          <Icon name='person' />
          <Input
            inputProps={{
              type: 'text',
              autoComplete: 'name',
              placeholder: 'Name',
            }}
            name='name'
            register={{ ...register('name', { required: true }) }}
            error={errors.name?.type === 'required' ? 'Name is required' : undefined}
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