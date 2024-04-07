import Heading from '@components/ui/display/Heading/Heading';
import Typography from '@components/ui/display/Typography/Typography';
import Button from '@components/ui/input/Button/Button';
import IconButton from '@components/ui/input/IconButton/IconButton';
import Input from '@components/ui/input/Input/Input';
import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Sign Up | Birthday Buddy" },
    { name: "description", content: "Birthday Buddy" },
  ];
};

const SignUp = () => {
  return (
    <div>
      <Heading
        title="Sign Up"
        subtitle="Let's get started"
      />
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
      <Button colour="secondary">Sign in </Button>
      <Typography color="secondary" variant="small">OR</Typography>
      <IconButton name="login" />
      <IconButton name="login" />
      <Typography>
        Already have an account?
        <a href="/">
          <Typography color="green">
            Sign In
          </Typography>
        </a>
      </Typography>
    </div>
  );
}

export default SignUp;
