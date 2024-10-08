import { request, gql } from "graphql-request";

const graphqlAPI = process.env.GRAPHCMS_ENDPOINT;

export const getPosts = async () => {
  try {
    const query = gql`
      query GetPosts {
        postsConnection(first: 100, orderBy: createdAt_DESC) {
          edges {
            node {
              author {
                bio
                name
                id
                photo {
                  url
                }
              }
              createdAt
              slug
              title
              excerpt
              featuredImage {
                url
              }
              categories {
                name
                slug
              }
            }
          }
        }
      }
    `;
    const result = await request(graphqlAPI, query);
    return result.postsConnection.edges;
  } catch (error) {
    console.error("Failed to fetch posts:", error);
    return [];
  }
};

export const getRecentPosts = async () => {
  const query = gql`
    query GetPostDetails() {
      posts(
        orderBy: createdAt_ASC
        last: 5
      ) {
        title
        featuredImage {
          url
        }
        createdAt
        slug
      }
    }
  `;

  try {
    const result = await request(graphqlAPI, query);
    return result.posts;
  } catch (error) {
    // Handle or log the error as needed
    console.error("Failed to fetch recent posts:", error);
    throw new Error("Error fetching recent posts");
  }
};

export const getSimilarPosts = async (categories, slug) => {
  const query = gql`
    query GetPostDetails($slug: String!, $categories: [String!]) {
      posts(
        where: {
          slug_not: $slug
          AND: { categories_some: { slug_in: $categories } }
        }
        orderBy: createdAt_DESC
        first: 5
      ) {
        title
        featuredImage {
          url
        }
        createdAt
        slug
      }
    }
  `;

  try {
    const result = await request(graphqlAPI, query, { slug, categories });
    return result.posts;
  } catch (error) {
    // Handle or log the error as needed
    console.error("Failed to fetch similar posts:", error);
    throw new Error("Error fetching similar posts");
  }
};

export const getCategories = async () => {
  const query = gql`
    query GetCategories {
      categories {
        name
        slug
      }
    }
  `;

  const result = await request(graphqlAPI, query);
  return result.categories;
};

export const getSubCategories = async (slug) => {
  const query = gql`
    query GetSubCategories($slug: String!) {
      categories(where: { slug: $slug }) {
        subcategories {
          name
          slug
        }
      }
    }
  `;

  const result = await request(graphqlAPI, query, { slug });
  return result.categories;
};

export const getPostDetails = async (slug) => {
  const query = gql`
    query GetPostDetails($slug: String!) {
      post(where: { slug: $slug }) {
        title
        excerpt
        featuredImage {
          url
        }
        author {
          name
          bio
          photo {
            url
          }
        }
        createdAt
        slug
        content {
          raw
        }
        categories {
          name
          slug
        }
      }
    }
  `;

  const result = await request(graphqlAPI, query, { slug });

  return result.post;
};

export const getSubCategoryData = async (slug) => {
  const query = gql`
    query GetSubCategoryData($slug: String!) {
      categoriesConnection(where: { slug: $slug }) {
        edges {
          cursor
          node {
            subcategories {
              name
              id
              subImage {
                url
              }
              description
              posts(first: 3, orderBy: createdAt_DESC) {
                featuredImage {
                  url
                }
                title
                slug
                excerpt
                createdAt
                author {
                  name
                  photo {
                    url
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

  try {
    const result = await request(graphqlAPI, query, { slug });
    return result.categoriesConnection.edges.map(
      (edge) => edge.node.subcategories
    );
  } catch (error) {
    console.error("Failed to fetch subcategory data:", error);
    throw error; // Or handle the error as appropriate for your application
  }
};

export const getSubCategoryPost = async (slug) => {
  try {
    const query = gql`
      query GetSubCategoryPost($slug: String!) {
        postsConnection(
          where: { subcategories_some: { slug: $slug } }
          first: 100
          orderBy: createdAt_DESC
        ) {
          edges {
            node {
              author {
                bio
                name
                id
                photo {
                  url
                }
              }
              createdAt
              slug
              title
              excerpt
              featuredImage {
                url
              }
              categories {
                name
                slug
              }
            }
          }
        }
      }
    `;
    const result = await request(graphqlAPI, query, { slug });
    if (!result || !result.postsConnection || !result.postsConnection.edges) {
      throw new Error("Invalid response structure");
    }
    return result.postsConnection.edges;
  } catch (error) {
    console.error("Failed to fetch subcategory posts:", error);
    return [];
  }
};

export const getSimilarSubPosts = async (subcategories, slug) => {
  const query = gql`
    query GetPostDetails($slug: String!, $categories: [String!]) {
      posts(
        where: {
          slug_not: $slug
          AND: { subcategories_some: { slug_in: $subcategories } }
        }
        orderBy: createdAt_DESC
        first: 5
      ) {
        title
        featuredImage {
          url
        }
        createdAt
        slug
      }
    }
  `;

  try {
    const result = await request(graphqlAPI, query, { slug, subcategories });
    return result.posts;
  } catch (error) {
    // Handle or log the error as needed
    console.error("Failed to fetch similar posts:", error);
    throw new Error("Error fetching similar posts");
  }
};

export const getProductDetails = async (slug) => {
  const query = gql`
    query GetProductDetails($slug: String!) {
      product(where: { slug: $slug }) {
        name
        price
        link
        description {
          raw
        }
        image {
          url
        }
      }
    }
  `;

  try {
    const result = await request(graphqlAPI, query, { slug });
    return result.product;
  } catch (error) {
    console.error("Failed to fetch product details:", error);
    throw error;
  }
};

export const getPodcasts = async () => {
  const query = gql`
    query GetPodcasts {
      podcastsConnection(first: 100, orderBy: createdAt_DESC) {
        edges {
          node {
            createdAt
            id
            excerpt
            image {
              url
            }
            title
            slug
          }
        }
      }
    }
  `;

  try {
    const result = await request(graphqlAPI, query);
    return result.podcastsConnection.edges;
  } catch (error) {
    console.error("Failed to fetch podcasts:", error);
    return [];
  }
};

export const getPodcastDetails = async (slug) => {
  const query = gql`
    query getSinglePodcast($slug: String!) {
      podcast(where: { slug: $slug }) {
        createdAt
        excerpt
        image {
          url
        }
        id
        slug
        title
        content {
          raw
        }
      }
    }
  `;

  try {
    const result = await request(graphqlAPI, query, { slug });
    return result.podcast;
  } catch (error) {
    console.error("Failed to fetch podcast details:", error);
    throw error;
  }
};
