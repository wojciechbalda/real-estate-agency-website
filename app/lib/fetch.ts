import {
  AdvertisementQuery,
  AgentQuery,
  AgentsQuery,
  BlogPostCountQuery,
  BlogPostQuery,
  BlogPostsQuery,
  DistrictsQuery,
  HomepageQuery,
  RealEstatesQuery,
} from "@/gen-types";
import { gql, request } from "graphql-request";
import { unstable_noStore as noStore } from "next/cache";
import { MAX_PRICE, MAX_SQUARE_FOOTAGE, MIN_PRICE, MIN_SQUARE_FOOTAGE } from "../variables/variables";

const endpoint = process.env.HYGRAPH_ENDPOINT as string;

export async function getBlogPosts(page: number) {
  noStore();
  const skip = (page - 1) * 12;
  const query = gql`
    query BlogPosts($skip: Int!) {
      blogPosts(skip: $skip, last: 12) {
        slug
        title
        excerpt
        coverImage {
          alt
          url
        }
      }
    }
  `;
  return await request<BlogPostsQuery>(endpoint, query, { skip });
}

export async function getBlogPost(slug: string) {
  const query = gql`
    query BlogPost($slug: String!) {
      blogPosts(where: { slug: $slug }) {
        title
        content {
          html
        }
        coverImage {
          url
          alt
        }
        relatedBlogPosts {
          slug
          excerpt
          title
          coverImage {
            url
            alt
          }
        }
      }
    }
  `;

  return await request<BlogPostQuery>(endpoint, query, { slug });
}

export async function getBlogPostCount() {
  const query = gql`
    query BlogPostCount {
      blogPostsConnection {
        aggregate {
          count
        }
      }
    }
  `;

  return await request<BlogPostCountQuery>(endpoint, query);
}

export async function getRealEstates(
  searchParams: { [key: string]: undefined | string[] | string }
) {
  let locations: string[];
  const districtsData = await getDistricts();
  const districts = districtsData.__type?.enumValues?.map(district => district.name)
  if (typeof searchParams.location === 'string')
  {
    locations = searchParams.location.split(',')
  }
  else 
  {
    locations = districts || []
  }
  const currentPage = Number(searchParams.page) || 1
  
  const variables = {
    minPrice: Number(searchParams.minPrice) || MIN_PRICE,
    maxPrice: Number(searchParams.maxPrice) || MAX_PRICE,
    minSquareFootage: Number(searchParams.minSquareFootage) || MIN_SQUARE_FOOTAGE,
    maxSquareFootage: Number(searchParams.maxSquareFootage) || MAX_SQUARE_FOOTAGE,
    locations,
    transaction: (typeof searchParams.transaction === 'string' && searchParams.transaction.split(',') ) || ['sale', 'rent'],
    skip: (currentPage-1) * 12
  }

  const query = gql`
  query RealEstates($minSquareFootage: Int!, $maxSquareFootage: Int!, $transaction: [Transaction]!, $maxPrice: Int!, $minPrice: Int!, $locations: [Districts]!, $skip: Int!) {
    realEstates(
      where: {transaction_in: $transaction, squareFootage_lte: $maxSquareFootage, squareFootage_gte: $minSquareFootage, price_lte: $maxPrice, price_gte: $minPrice, districtName_in: $locations}
      skip: $skip
      last: 12
      ) {
      districtName
      price
      squareFootage
      slug
      realEstateImage {
        url
        alt
      }
    }
    realEstatesConnection(where: {transaction_in: $transaction, squareFootage_lte: $maxSquareFootage, squareFootage_gte: $minSquareFootage, price_lte: $maxPrice, price_gte: $minPrice, districtName_in: $locations}) {
      aggregate {
        count
      }
    }
  }
  `;

  return await request<RealEstatesQuery>(endpoint, query, variables)
}

export async function getRealEstate(slug: string) {
  const query = gql`
    query Advertisement($slug: String!) {
      realEstate(where: { slug: $slug }) {
        districtName
        numberOfRooms
        price
        yearOfConstruction
        transaction
        squareFootage
        description {
          html
        }
        agent {
          email
          firstName
          phoneNumber
          agentImage {
            url
          }
          lastName
          slug
        }
        realEstateImage {
          url
          alt
        }
      }
    }
  `;
  return await request<AdvertisementQuery>(endpoint, query, { slug });
}

export async function getDistricts()
{
  const query = gql`
  query Districts {
    __type(name: "Districts") {
      enumValues {
        name
      }
    }
  }
  `
  return await request<DistrictsQuery>(endpoint, query)
}

export async function getRealEstateAgents() {
  const query = gql`
    query Agents {
      agents {
        agentImage {
          url
        }
        email
        firstName
        lastName
        slug
        phoneNumber
      }
    }
  `;
  return await request<AgentsQuery>(endpoint, query);
}

export async function getRealEstateAgent(slug: string) {
  const query = gql`
    query Agent($slug: String!) {
      agent(where: { slug: $slug }) {
        email
        firstName
        lastName
        phoneNumber
        description {
          html
        }
        agentImage {
          url
        }
        realEstate {
          districtName
          price
          squareFootage
          slug
          realEstateImage {
            alt
            url
          }
        }
      }
    }
  `;
  return await request<AgentQuery>(endpoint, query, { slug });
}

export async function getHomepageData() {
  const query = gql`
    query Homepage {
      realEstates(last: 3) {
        districtName
        price
        squareFootage
        slug
        realEstateImage {
          alt
          url
        }
      }
      blogPosts(last: 3) {
        coverImage {
          url
          alt
        }
        slug
        title
        excerpt
      }
    }
  `;
  return await request<HomepageQuery>(endpoint, query);
}
