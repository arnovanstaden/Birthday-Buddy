import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Profile | Birthday Buddy" },
    { name: "description", content: "Birthday Buddy" },
  ];
};

export default function Index() {
  return (
    <div>
      Profile
    </div>
  );
}
