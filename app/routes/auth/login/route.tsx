import Heading from '@components/ui/display/Heading/Heading';
import Typography from '@components/ui/display/Typography/Typography';
import Button from '@components/ui/input/Button/Button';
import IconButton from '@components/ui/input/IconButton/IconButton';
import Input from '@components/ui/input/Input/Input';
import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Login | Birthday Buddy" },
    { name: "description", content: "Birthday Buddy" },
  ];
};

export default function Index() {
  return (
    <div>
      <Heading
        title="Sign In"
        subtitle="Welcome"
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
      <Button colour="secondary">Sign in </Button>
      <Typography color="secondary" variant="small">OR</Typography>
      <IconButton name="login" />
      <IconButton name="login" />
      <Typography>
        Don't have an account yet?
        <a href="/">
          <Typography color="green">

            Sign Up
          </Typography>
        </a>
      </Typography>
    </div>
  );
}
