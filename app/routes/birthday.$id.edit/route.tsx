import Heading from '@components/ui/display/Heading/Heading';
import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import styles from './birthday.edit.module.css';
import PhotoPicker from '@components/content/PhotoPicker/PhotoPicker';
import Icon from '@components/ui/display/Icon/Icon';
import DatePicker from '@components/content/DatePicker/DatePicker';
import Input from '@components/ui/input/Input/Input';
import Button from '@components/ui/input/Button/Button';
import TextArea from '@components/ui/input/TextArea/TextArea';
import { json, useLoaderData } from '@remix-run/react';
import { getBirthday } from 'app/lib/birthdays';
import { SubmitHandler, useForm } from 'react-hook-form';

export const meta: MetaFunction = () => {
  return [
    { title: "Edit Birthday | Birthday Buddy" },
    { name: "description", content: "Birthday Buddy" },
  ];
};

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const birthday = await getBirthday(request, params.id as string);
  if (!birthday) return;
  return json({ birthday });
};


interface EditBirthdayForm {
  name: string;
  date: string;
  notes: string;
}

const BirthdayEdit = () => {
  const { birthday } = useLoaderData<typeof loader>();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EditBirthdayForm>()

  const onSubmit: SubmitHandler<EditBirthdayForm> = (data: EditBirthdayForm) => {
    console.log(data)
  }


  return (
    <div className={styles.BirthdayEdit}>
      <Heading
        title="Edit Birthday"
        subtitle="Want to change something?"
      />
      <form onSubmit={handleSubmit(onSubmit)}>
        <PhotoPicker defaultImage={birthday.avatar} />
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
          <DatePicker
            day={birthday.day}
            month={birthday.month}
            year={birthday.year}
          />
        </div>
        <div className={styles.row}>
          <Icon name='description' />
          <TextArea
            placeholder='Birthday gifts, party ideas, etc.'
            value={birthday.notes}
          />
        </div>
        <Button>
          Save Birthday
        </Button>
      </form>
    </div>
  );
}

export default BirthdayEdit;