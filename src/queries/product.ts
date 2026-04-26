export const productQuery = `#graphql
query ProductQuery($handle: String) {
  product(handle: $handle) {
    id
    title
    handle
    description
    tags
    totalInventory
    variants(first: 1) {
      nodes {
        price {
          amount
          currencyCode
        }
      }
    }
    images(first: 5) {
      edges {
        node {
          id
          altText
          url
        }
      }
    }
  }
}`;

export const getProducts = `#graphql
query getProducts($first: Int) {
    products(first: $first, reverse: true, query: "available_for_sale:true") {
      pageInfo {
        hasNextPage
        startCursor
        endCursor
      }
      edges {
        cursor
        node {
          id
          title
          handle
          seo {
            description
            title
          }
          images(first: 1) {
            edges {
              node {
                id
                altText
                url
                thumbhash
              }
            }
          }
          totalInventory
          tags
          description
        }
      }
    }
  }
`;
