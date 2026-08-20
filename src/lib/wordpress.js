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
              content
              featuredImage {
                node {
                  sourceUrl
                  altText
                }
              }
              categories {
                nodes {
                  name
                  uri
                }
              }
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

export async function getPostById(id) {
    const response = await fetch(WORDPRESS_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query: `
          query GetPost($id: ID!) {
            post(id: $id, idType: ID) {
              id
              title
              uri
              date
              excerpt
              content
              featuredImage {
                node {
                  sourceUrl
                  altText
                }
              }
              categories {
                nodes {
                  name
                  uri
                }
              }
            }
          }
        `,
        variables: {
          id
        }
      })
    });
  
    if (!response.ok) {
      throw new Error(`WordPress API error: ${response.status}`);
    }
  
    const { data } = await response.json();
  
    return data.post;
  }