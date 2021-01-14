import { useState, useEffect } from 'react';
import axios from 'axios';
import Head from 'next/head';

import { Post } from '../types';
// import { GetServerSideProps } from 'next';

import PostCard from '../components/PostCard';

export default function Home() {
  // Client side rendering of posts
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    axios
      .get('/posts')
      .then((res) => setPosts(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="pt-12">
      <Head>
        <title>readit: the front page of the internet</title>
      </Head>

      <div className="container flex pt-4">
        {/* Posts feed */}
        <div className="w-160">
          {posts.map((post) => (
            <PostCard post={post} key={post.identifier} />
          ))}
        </div>

        {/* Sidebar */}
      </div>
    </div>
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
