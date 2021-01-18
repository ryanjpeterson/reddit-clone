import { Fragment } from 'react';
import Head from 'next/head';
import useSWR from 'swr';

import { Post } from '../types';

import PostCard from '../components/PostCard';

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

  const { data: posts } = useSWR('/posts');

  return (
    <Fragment>
      <Head>
        <title>readit: the front page of the internet</title>
      </Head>

      <div className="container flex pt-4">
        {/* Posts feed */}
        <div className="w-160">
          {posts?.map((post) => (
            <PostCard post={post} key={post.identifier} />
          ))}
        </div>

        {/* Sidebar */}
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
