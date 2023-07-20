import { User } from '@/pages/users/index';
import Link from 'next/link';
import axios from 'axios';
import Image from 'next/image';

export async function getServerSideProps({ query }) {
  const { username } = query;
  try {
    const { data } = await axios.get(
      `${process.env.API_ENDPOINT}/api/04/users/${username}`,
      {
        headers: {
          Authorization: process.env.API_TOKEN,
        },
      },
    );
    const baseUrl = data.profile_picture;
    data.profile_picture = `${process.env.API_ENDPOINT}${baseUrl}`;
    return {
      props: {
        user: data,
      },
    };
  } catch (err) {
    console.error(err);
    return {
      notFound: true,
    };
  }
}

function UserPage({ user }: { user: User }) {
  return (
    <div>
      <div>
        <Link href="/" passHref>
          Back to home
        </Link>
      </div>
      <hr />
      <div style={{ display: 'flex' }}>
        <Image
          src={user.profile_picture}
          alt={user.username}
          width={150}
          height={150}
        />
        <div>
          <div>
            <b>Username:</b> {user.username}
          </div>
          <div>
            <b>Full name:</b> {user.first_name} {user.last_name}
          </div>
          <div>
            <b>Email:</b> {user.email}
          </div>
          <div>
            <b>Company:</b> {user.company}
          </div>
          <div>
            <b>Job title:</b> {user.job_title}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserPage;
