const WORDPRESS_API_URL = 'https://susanta.com/graphql';

async function wpFetch(query, variables = {}) {
  const response = await fetch(WORDPRESS_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      query,
      variables
    })
  });

  if (!response.ok) {
    throw new Error(`WordPress API error: ${response.status}`);
  }

  const result = await response.json();

  if (result.errors) {
    throw new Error(result.errors[0].message);
  }

  return result.data;
}


/* Get the URLs of all posts */

export async function getAllPostUris() {
  const data = await wpFetch(`
    {
      posts(first: 100) {
        nodes {
          uri
        }
      }
    }
  `);

  return data.posts.nodes
    .filter((post) => post.uri)
    .map((post) => post.uri);
}


/* Get one complete post by its URI */

export async function getPostByURI(uri) {
  const data = await wpFetch(
    `
      query GetPostByURI($uri: String!) {
        nodeByUri(uri: $uri) {
          __typename

          ... on Post {
            id
            title
            date
            uri
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
    `,
    { uri }
  );

  return data.nodeByUri;
}


/* Get the latest posts for the homepage */

export async function getPosts() {
  const data = await wpFetch(`
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
  `);

  return data.posts.nodes;
}