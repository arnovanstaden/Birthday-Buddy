import BirthdayCard from '@components/content/BirthdayCard/BirthdayCard';
import Heading from '@components/ui/display/Heading/Heading';
import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Birthday Buddy" },
    { name: "description", content: "Birthday Buddy" },
  ];
};

const Home = () => {
  return (
    <div>
      <Heading
        title='Upcoming Birthdays'
        subtitle='Who’s next?'
      />
      <BirthdayCard
        name='Arno van Staden'
        date={new Date('1994-01-24')}
        avatarSrc='https://www.tandem.net/_next/image?url=https%3A%2F%2Fimages.ctfassets.net%2F0uov5tlk8deu%2F3EhMdZzYvroc6S5lN9ntZD%2F32df91b1dc1522ccacbdf1a9aaf5e235%2Farno.jpg&w=767&q=100'
      />
      <BirthdayCard
        name='John Snow'
        date={new Date('1994-04-07')}
        avatarSrc='https://www.tandem.net/_next/image?url=https%3A%2F%2Fimages.ctfassets.net%2F0uov5tlk8deu%2F3EhMdZzYvroc6S5lN9ntZD%2F32df91b1dc1522ccacbdf1a9aaf5e235%2Farno.jpg&w=767&q=100'
      />
    </div>
  );
}

export default Home;