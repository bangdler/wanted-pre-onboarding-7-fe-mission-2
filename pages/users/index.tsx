import Link from 'next/link';
import axios from 'axios';
import { useEffect, useState } from 'react';

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

// { users }: { users: User[] }
function UsersPage() {
  const [users, setUsers] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get(`/api/04/users`);
      setLoading(false);
      setUsers(data);
    };
    getData();
  }, []);

  return loading ? (
    <div>...loading</div>
  ) : (
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
