import BirthdayCard from '@components/content/BirthdayCard/BirthdayCard';
import Heading from '@components/ui/display/Heading/Heading';
import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Birthday Buddy" },
    { name: "description", content: "Birthday Buddy" },
  ];
};

export default function Index() {
  return (
    <div>
      <Heading
        title='Upcoming Birthdays'
        subtitle='Who’s next?'
      />
      <BirthdayCard

      />
    </div>
  );
}
