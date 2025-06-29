import Link from 'next/link'

export async function getStaticProps() {
  const res = await fetch('http://localhost/your-wp-backend/wp-json/wp/v2/posts')
  const posts = await res.json()

  return {
    props: {
      posts,
    },
    revalidate: 10,
  }
}

export default function Home({ posts }) {
  return (
    <main style={{ padding: '2rem' }}>
      <h1>Headless WordPress with Next.js</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <Link href={`/posts/${post.slug}`}>
              <h2>{post.title.rendered}</h2>
            </Link>
            <div dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }} />
          </li>
        ))}
      </ul>
    </main>
  )
}