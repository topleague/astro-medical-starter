const WORDPRESS_API_URL = 'https://susanta.com/graphql';

export async function getPosts() {
  const response = await fetch(WORDPRESS_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      query: `
        {
          posts(first: 10) {
            nodes {
              id
              title
              uri
              date
              excerpt
            }
          }
        }
      `
    })
  });

  if (!response.ok) {
    throw new Error(`WordPress API error: ${response.status}`);
  }

  const { data } = await response.json();

  return data.posts.nodes;
}