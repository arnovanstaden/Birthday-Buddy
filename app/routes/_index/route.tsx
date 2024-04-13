import BirthdayCard from '@components/content/BirthdayCard/BirthdayCard';
import Heading from '@components/ui/display/Heading/Heading';
import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import styles from './index.module.css';
import { getBirthdays } from 'app/lib/birthdays';
import { json, useLoaderData } from '@remix-run/react';
import { isBirthdayToday } from 'app/utils/time';

export const meta: MetaFunction = () => {
  return [
    { title: "Birthday Buddy" },
    { name: "description", content: "Birthday Buddy" },
  ];
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const birthdays = await getBirthdays(request);
  return json({ birthdays });
};

const Home = () => {
  const { birthdays } = useLoaderData<typeof loader>();
  const todaysBirthdays = birthdays.filter((birthday) => isBirthdayToday(birthday.day, birthday.month));
  const upcomingBirthdays = birthdays.filter((birthday) => !isBirthdayToday(birthday.day, birthday.month));

  return (
    <div className={styles.Home}>
      {todaysBirthdays.length > 0 && (
        <div className={styles.today}>
          <Heading
            title='Today’s Birthdays'
            subtitle='Ready to celebrate?'
          />
          {todaysBirthdays.map((birthday) => (
            <BirthdayCard
              key={birthday.id}
              {...birthday}
            />
          ))}
        </div>
      )}
      <Heading
        title='Upcoming Birthdays'
        subtitle='Who’s next?'
      />
      <div className={styles.list}>
        {upcomingBirthdays.map((birthday) => (
          <BirthdayCard
            key={birthday.id}
            {...birthday}
          />
        ))}
      </div>
    </div>
  );
}

export default Home;