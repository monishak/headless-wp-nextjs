export async function getStaticPaths() {
  const res = await fetch('http://localhost/your-wp-backend/wp-json/wp/v2/posts')
  const posts = await res.json()

  const paths = posts.map((post) => ({
    params: { slug: post.slug },
  }))

  return { paths, fallback: 'blocking' }
}

export async function getStaticProps({ params }) {
  const res = await fetch(`http://localhost/your-wp-backend/wp-json/wp/v2/posts?slug=${params.slug}`)
  const posts = await res.json()
  const post = posts[0]

  if (!post) {
    return { notFound: true }
  }

  return {
    props: {
      post,
    },
    revalidate: 10,
  }
}

export default function Post({ post }) {
  return (
    <main style={{ padding: '2rem' }}>
      <h1>{post.title.rendered}</h1>
      <div dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
    </main>
  )
}