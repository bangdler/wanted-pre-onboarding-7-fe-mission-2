import Link from 'next/link';
import axios from 'axios';

export interface User {
  id: string;
  username: string;
  profile_picture: string;
  first_name: string;
  last_name: string;
  email: string;
  company: string;
  job_title: string;
}

export async function getServerSideProps() {
  const { data } = await axios.get(`${process.env.API_ENDPOINT}/api/04/users`);

  return {
    props: {
      users: data,
    },
  };
}

function UsersPage({ users }: { users: User[] }) {
  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>
          <Link href={`/users/${user.username}`} passHref>
            {user.username}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default UsersPage;
