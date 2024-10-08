// pages/api/getProductsBySubcategory.js

import { request, gql } from "graphql-request";

const graphqlAPI = process.env.GRAPHCMS_ENDPOINT;

export default async function handler(req, res) {
  const { slug } = req.query;

  const query = gql`
    query MyQuery($slug: String!) {
      productsSubcategory(where: { slug: $slug }) {
        products {
          brand
          createdAt
          id
          name
          price
          slug
          image {
            url
          }
        }
      }
    }
  `;

  try {
    const result = await request(graphqlAPI, query, { slug });
    res.status(200).json(result.productsSubcategory.products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Error fetching products" });
  }
}
