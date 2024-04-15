import Heading from '@components/ui/display/Heading/Heading';
import Button from '@components/ui/input/Button/Button';
import Input from '@components/ui/input/Input/Input';
import type { MetaFunction } from "@remix-run/node";
import styles from './signUpProfile.module.css';
import PhotoPicker from '@components/content/PhotoPicker/PhotoPicker';
import Icon from '@components/ui/display/Icon/Icon';
import DatePicker from '@components/content/DatePicker/DatePicker';
import { SubmitHandler, useForm } from 'react-hook-form';

interface SignUpProfileForm {
  name: string;
  avatar: File;
}

export const meta: MetaFunction = () => {
  return [
    { title: "Sign Up | Birthday Buddy" },
    { name: "description", content: "Birthday Buddy" },
  ];
};

const SignUpProfile = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpProfileForm>()

  const onSubmit: SubmitHandler<SignUpProfileForm> = (data: SignUpProfileForm) => {
    console.log(data)
  }

  return (
    <div className={styles.SignUpProfile}>
      <Heading
        title="Your Profile"
        subtitle="Almost there!"
      />
      <form onSubmit={handleSubmit(onSubmit)}>
        <PhotoPicker
          inputProps={{
            type: 'file',
          }}
          name='avatar'
          register={{ ...register('avatar', { required: true }) }}
        />
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
        <Button >
          Finish Sign Up
        </Button>
      </form>
    </div>
  );
}

export default SignUpProfile;
