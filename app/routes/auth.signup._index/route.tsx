import Heading from '@components/ui/display/Heading/Heading';
import Typography from '@components/ui/display/Typography/Typography';
import Button from '@components/ui/input/Button/Button';
import IconButton from '@components/ui/input/IconButton/IconButton';
import Input from '@components/ui/input/Input/Input';
import type { MetaFunction } from "@remix-run/node";
import styles from './signup.module.css';
import { Link } from '@remix-run/react';
import { SubmitHandler, useForm } from 'react-hook-form';

export const meta: MetaFunction = () => {
  return [
    { title: "Sign Up | Birthday Buddy" },
    { name: "description", content: "Birthday Buddy" },
  ];
};

interface SignUpForm {
  email: string;
  password: string;
  confirmPassword: string;
}

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpForm>()

  const onSubmit: SubmitHandler<SignUpForm> = (data: SignUpForm) => {
    console.log(data)
  }

  return (
    <div className={styles.SignUp}>
      <Heading
        title="Sign Up"
        subtitle="Let's get started"
      />
      <div className={styles.content}>
        <form onSubmit={handleSubmit(onSubmit)}>
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
          <Input
            inputProps={{
              type: 'password',
              placeholder: 'Password',
            }}
            name='password'
            register={{ ...register('password', { required: true }) }}
            error={errors.password?.type === 'required' ? 'Password is required' : undefined}
          />
          <Input
            inputProps={{
              type: 'password',
              placeholder: 'Password',
            }}
            name='confirmPassword'
            register={{ ...register('confirmPassword', { required: true }) }}
            error={errors.password?.type === 'required' ? 'Confirming Password is required' : undefined}
          />
          <Button colour="secondary">Sign Up</Button>
        </form>
        <Typography
          color="secondary"
          variant="p"
          className={styles.divider}
        >
          OR
        </Typography>
        <div className={styles.social}>
          <IconButton name="apple" />
          <IconButton name="google" />
        </div>
      </div>
      <div className={styles.bottom}>
        <Typography>
          Don't have an account yet?
        </Typography>
        <Link to="/auth/login">
          <Typography color="green">
            Sign In
          </Typography>
        </Link>
      </div>
    </div >
  );
}

export default SignUp;
