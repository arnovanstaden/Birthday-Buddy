import Heading from '@components/ui/display/Heading/Heading';
import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Share Birthdays | Birthday Buddy" },
    { name: "description", content: "Birthday Buddy" },
  ];
};

const ShareBirthday = () => {
  return (
    <div>
      <Heading
        title="Share Birthdays"
        subtitle="Lets get sharing!"
      />
    </div>
  );
}
export default ShareBirthday;