import Setting from '@components/content/Setting/Setting';
import Avatar from '@components/ui/display/Avatar/Avatar';
import Heading from '@components/ui/display/Heading/Heading';
import Typography from '@components/ui/display/Typography/Typography';
import type { MetaFunction } from "@remix-run/node";
import styles from './profile.module.css';
import { Link } from '@remix-run/react';
import IconButton from '@components/ui/input/IconButton/IconButton';

export const meta: MetaFunction = () => {
  return [
    { title: "Profile | Birthday Buddy" },
    { name: "description", content: "Birthday Buddy" },
  ];
};

const Profile = () => {
  return (
    <div className={styles.Profile}>
      <Heading
        title="Your Profile"
        subtitle="About you"
        action={(
          <Link to="/profile/edit">
            <IconButton name="edit" variant="icon" />
          </Link>
        )}
      />
      <div className={styles.bio}>
        <Avatar
          size={150}
          src='https://www.tandem.net/_next/image?url=https%3A%2F%2Fimages.ctfassets.net%2F0uov5tlk8deu%2F3EhMdZzYvroc6S5lN9ntZD%2F32df91b1dc1522ccacbdf1a9aaf5e235%2Farno.jpg&w=767&q=100'
        />
        <Typography
          variant='h4'
          weight={500}
          className={styles.name}
        >
          Arno van Staden
        </Typography>
        <Typography
          color='green'
        >
          Monday 24 January 2022
        </Typography>
        <Typography
          color='secondary'
          variant='small'
        >
          Turns 29
        </Typography>
      </div>
      <div className={styles.settings}>
        <Setting
          title='Notifications'
          subtitle='When notifications are turned off, you won’t be able to receive reminders about birthdays. We suggest keeping this on'
          toggled={false}
          onToggle={() => { }}
        />
        <Setting
          title='Report a bug'
          link='/report-bug'
        />
        <Setting
          title='Request a feature'
          link='/request-feature'
        />
        <Setting
          title='Logout'
          onClick={() => { }}
        />
      </div>
    </div>
  );
}

export default Profile;