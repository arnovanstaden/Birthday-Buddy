import Heading from '@components/ui/display/Heading/Heading';
import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Add Birthdays | Birthday Buddy" },
    { name: "description", content: "Birthday Buddy" },
  ];
};

const AddBirthday = () => {
  return (
    <div>
      <Heading
        title="Add a Birthday"
        subtitle="Don't forget again!"
      />
    </div>
  );
}

export default AddBirthday;