import Heading from '@components/ui/display/Heading/Heading';
import Typography from '@components/ui/display/Typography/Typography';
import Button from '@components/ui/input/Button/Button';
import IconButton from '@components/ui/input/IconButton/IconButton';
import Input from '@components/ui/input/Input/Input';
import type { MetaFunction } from "@remix-run/node";
import styles from './login.module.css';
import { Link } from '@remix-run/react';
import { SubmitHandler, useForm } from 'react-hook-form';

interface LoginForm {
  email: string;
  password: string;
}

export const meta: MetaFunction = () => {
  return [
    { title: "Login | Birthday Buddy" },
    { name: "description", content: "Birthday Buddy" },
  ];
};

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>()

  const onSubmit: SubmitHandler<LoginForm> = (data: LoginForm) => {
    console.log(data)
  }

  return (
    <div className={styles.Login}>
      <Heading
        title="Sign In"
        subtitle="Welcome"
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
              autoComplete: 'password',
              placeholder: 'Password',
            }}
            name='password'
            register={{ ...register('password', { required: true }) }}
            error={errors.password?.type === 'required' ? 'Password is required' : undefined}
          />
          <Button colour="secondary">Sign in </Button>
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
        <Link to="/auth/signup">
          <Typography color="green">
            Sign Up
          </Typography>
        </Link>
      </div>
    </div>
  );
}

export default Login;