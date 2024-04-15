import Heading from '@components/ui/display/Heading/Heading';
import type { MetaFunction } from "@remix-run/node";
import styles from './profile.edit.module.css';
import PhotoPicker from '@components/content/PhotoPicker/PhotoPicker';
import Icon from '@components/ui/display/Icon/Icon';
import DatePicker from '@components/content/DatePicker/DatePicker';
import Input from '@components/ui/input/Input/Input';
import Button from '@components/ui/input/Button/Button';
import { SubmitHandler, useForm } from 'react-hook-form';

export const meta: MetaFunction = () => {
  return [
    { title: "Edit Profile | Birthday Buddy" },
    { name: "description", content: "Birthday Buddy" },
  ];
};

interface EditProfileForm {
  name: string;
  email: string;
  avatar: File;
}

const ProfileEdit = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EditProfileForm>()

  const onSubmit: SubmitHandler<EditProfileForm> = (data: EditProfileForm) => {
    console.log(data)
  }

  return (
    <div className={styles.ProfileEdit}>
      <Heading
        title="Edit Profile"
        subtitle="Want to change something?"
      />
      <form onSubmit={handleSubmit(onSubmit)}>
        <PhotoPicker
          // defaultImage={birthday.avatar}
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
          <Icon name='email' />
          <Input
            inputProps={{
              type: 'email',
              autoComplete: 'email',
              placeholder: 'Email',
            }}
            name='email'
            register={{ ...register('email', { required: true }) }}
            error={errors.email?.type === 'required' ? 'Email is required' : undefined}
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