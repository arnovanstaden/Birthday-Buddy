import Heading from '@components/ui/display/Heading/Heading';
import styles from './birthday.module.css';
import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import Avatar from '@components/ui/display/Avatar/Avatar';
import Typography from '@components/ui/display/Typography/Typography';
import IconButton from '@components/ui/input/IconButton/IconButton';
import { Link, json, useLoaderData } from '@remix-run/react';
import CountdownTimer from '@components/content/CountdownTimer/CountdownTimer';
import { getBirthday } from 'app/lib/birthdays';
import { formatBirthday } from 'app/utils/time';

export const meta: MetaFunction = () => {
  return [
    { title: "Arno's Birthday | Birthday Buddy" },
    { name: "description", content: "Birthday Buddy" },
  ];
};


export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const birthday = await getBirthday(request, params.id as string);
  if (!birthday) return;
  return json({ birthday });
};


const BirthdayView: React.FC = () => {
  const { birthday } = useLoaderData<typeof loader>();

  return (
    <div className={styles.BirthdayView}>
      <Heading
        title="Birthday"
        subtitle="Don't forget again!"
        action={(
          <Link to={`/birthday/${birthday.id}/edit`}>
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
          {birthday.name}
        </Typography>
        <Typography
          color='green'
        >
          {formatBirthday(birthday.date)}
        </Typography>
        {birthday.age && (
          <Typography
            color='secondary'
            variant='small'
          >
            Turns {birthday.age}
          </Typography>
        )}
      </div>
      <CountdownTimer date={new Date(1994, 3, 14)} />
    </div>
  );
};

export default BirthdayView;
