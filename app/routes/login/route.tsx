import Heading from '@components/ui/display/Heading/Heading';
import Typography from '@components/ui/display/Typography/Typography';
import Button from '@components/ui/input/Button/Button';
import IconButton from '@components/ui/input/IconButton/IconButton';
import Input from '@components/ui/input/Input/Input';
import type { MetaFunction } from "@remix-run/node";
import styles from './login.module.css';
import { Link } from '@remix-run/react';

export const meta: MetaFunction = () => {
  return [
    { title: "Login | Birthday Buddy" },
    { name: "description", content: "Birthday Buddy" },
  ];
};

const Login = () => {
  return (
    <div className={styles.Login}>
      <Heading
        title="Sign In"
        subtitle="Welcome"
      />

      <div className={styles.content}>
        <form action="">
          <Input
            type='email'
            placeholder='Email'
            name='email'
          />
          <Input
            type='password'
            placeholder='Password'
            name='password'
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
          <IconButton name="login" />
          <IconButton name="login" />
        </div>
      </div>
      <div className={styles.bottom}>
        <Typography>
          Don't have an account yet?

        </Typography>
        <Link to="/signup">
          <Typography color="green">
            Sign Up
          </Typography>
        </Link>
      </div>
    </div>
  );
}

export default Login;