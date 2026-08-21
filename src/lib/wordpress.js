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


/* Get one complete post/page/category/tag by URI */

export async function getNodeByURI(uri) {
  const data = await wpFetch(
    `
      query GetNodeByURI($uri: String!) {
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

            tags {
              nodes {
                name
                uri
              }
            }
          }

          ... on Page {
            id
            title
            date
            uri
            content
          }

          ... on Category {
            id
            name
            uri

            posts(first: 100) {
              nodes {
                id
                title
                date
                uri
                excerpt

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

          ... on Tag {
            id
            name
            uri

            posts(first: 100) {
              nodes {
                id
                title
                date
                uri
                excerpt

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
        }
      }
    `,
    { uri }
  );

  return data.nodeByUri;
}


/* Get URLs of all posts, pages, categories and tags */

export async function getAllContentUris() {
  const data = await wpFetch(`
    {
      posts(first: 100) {
        nodes {
          uri
        }
      }

      pages(first: 100) {
        nodes {
          uri
        }
      }

      categories(first: 100) {
        nodes {
          uri
        }
      }

      tags(first: 100) {
        nodes {
          uri
        }
      }
    }
  `);

  return [
    ...data.posts.nodes,
    ...data.pages.nodes,
    ...data.categories.nodes,
    ...data.tags.nodes
  ]
    .filter((node) => node.uri)
    .map((node) => node.uri);
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

          tags {
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


/* Get a WordPress navigation menu by its slug */

export async function getNavigationMenu(slug) {
  const response = await fetch(
    `https://susanta.com/wp-json/wp/v2/navigation?slug=${slug}`
  );

  if (!response.ok) {
    throw new Error(`WordPress navigation API error: ${response.status}`);
  }

  const menus = await response.json();

  if (!menus.length) {
    return [];
  }

  const html = menus[0].content?.rendered || '';

  const matches = [
    ...html.matchAll(
      /<a[^>]+href="([^"]+)"[^>]*>.*?<span[^>]*>(.*?)<\/span>/gs
    )
  ];

  return matches.map((match) => {
    const originalUrl = match[1];

    let url = originalUrl;

    /*
     * Convert WordPress internal URLs to Astro-relative URLs.
     *
     * Example:
     * https://susanta.com/category/seo/
     * becomes:
     * /category/seo/
     *
     * External URLs remain unchanged.
     */
    try {
      const parsedUrl = new URL(originalUrl);

      if (parsedUrl.hostname === 'susanta.com') {
        url = parsedUrl.pathname;

        if (parsedUrl.search) {
          url += parsedUrl.search;
        }

        if (parsedUrl.hash) {
          url += parsedUrl.hash;
        }

        if (!url.endsWith('/')) {
          url += '/';
        }
      }
    } catch {
      // Keep the original URL if it isn't a valid absolute URL.
    }

    return {
      label: match[2].replace(/<[^>]+>/g, '').trim(),
      url,
    };
  });
}