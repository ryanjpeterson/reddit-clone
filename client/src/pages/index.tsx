import { Fragment } from 'react';
import Head from 'next/head';
import useSWR from 'swr';

import { Post, Sub } from '../types';

import PostCard from '../components/PostCard';
import Image from 'next/image';
import Link from 'next/link';
import { useAuthState } from '../context/auth';

// import { GetServerSideProps } from 'next';

export default function Home() {
  // Client side rendering of posts
  // const [posts, setPosts] = useState<Post[]>([]);

  // Axios has been replaced with useSWR call
  // useEffect(() => {
  //   axios
  //     .get('/posts')
  //     .then((res) => setPosts(res.data))
  //     .catch((err) => console.log(err));
  // }, []);

  const { data: posts } = useSWR<Post[]>('/posts');
  const { data: topSubs } = useSWR<Sub[]>('/misc/top-subs');

  const { authenticated } = useAuthState();

  return (
    <Fragment>
      <Head>
        <title>readit: the front page of the internet</title>
      </Head>

      <div className="container flex pt-4">
        {/* Posts feed */}
        <div className="w-full md:w-160">
          {posts?.map((post) => (
            <PostCard post={post} key={post.identifier} />
          ))}
        </div>

        {/* Sidebar */}
        <div className="hidden px-4 ml-6 md:block w-80 md:p-0">
          <div className="bg-white rounded">
            <div className="p-4 border-b-2">
              <p className="text-lg font-semibold text-center">
                Top Communities
              </p>
            </div>
            <div className="">
              {topSubs?.map((sub) => (
                <div
                  key={sub.name}
                  className="flex items-center px-4 py-2 text-xs border-b"
                >
                  <Link href={`/r/${sub.name}`}>
                    <a>
                      <Image
                        src={sub.imageUrl}
                        alt="Sub"
                        width={(6 * 16) / 4}
                        height={(6 * 16) / 4}
                        className="overflow-hidden rounded-full cursor-pointer"
                      />
                    </a>
                  </Link>
                  <Link href={`/r/${sub.name}`}>
                    <a className="ml-2 font-bold hover:cursor-pointer">
                      /r/{sub.name}
                    </a>
                  </Link>
                  <p className="ml-auto font-med">{sub.postCount}</p>
                </div>
              ))}
            </div>
            {authenticated && (
              <div className="p-4 border-t-2">
                <Link href="/subs/create">
                  <a className="w-full px-2 py-1 blue button">
                    Create Community
                  </a>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </Fragment>
  );
}

// Server side rendering of posts - requires posts to be destructured from props
// export const getServerSideProps: GetServerSideProps = async (context) => {
//   try {
//     const res = await axios.get('/posts');

//     return { props: { posts: res.data } };
//   } catch (err) {
//     return { props: { error: 'Something went wrong!' } };
//   }
// };
