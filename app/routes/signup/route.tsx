import Heading from '@components/ui/display/Heading/Heading';
import Typography from '@components/ui/display/Typography/Typography';
import Button from '@components/ui/input/Button/Button';
import IconButton from '@components/ui/input/IconButton/IconButton';
import Input from '@components/ui/input/Input/Input';
import type { MetaFunction } from "@remix-run/node";
import styles from './signup.module.css';
import { Link } from '@remix-run/react';

export const meta: MetaFunction = () => {
  return [
    { title: "Sign Up | Birthday Buddy" },
    { name: "description", content: "Birthday Buddy" },
  ];
};

const SignUp = () => {
  return (
    <div className={styles.SignUp}>
      <Heading
        title="Sign Up"
        subtitle="Let's get started"
      />
      <div className={styles.content}>
        <form>
          <Input
            type='name'
            placeholder='Full Name'
            name='name'
          />
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
          <Input
            type='password'
            placeholder='Confirm Password'
            name='confirm password'
          />
          {/* Add your birthday here */}
          <Button colour="secondary">Sign in </Button>
        </form>
        <Typography
          color="secondary"
          variant="p"
          className={styles.divider}
        >
          OR
        </Typography>        <div className={styles.social}>
          <IconButton name="login" />
          <IconButton name="login" />
        </div>
      </div>
      <div className={styles.bottom}>
        <Typography>
          Don't have an account yet?

        </Typography>
        <Link to="/login">
          <Typography color="green">
            Sign In
          </Typography>
        </Link>
      </div>
    </div>
  );
}

export default SignUp;
