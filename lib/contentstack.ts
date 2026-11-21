import contentstack from "@contentstack/delivery-sdk";
import ContentstackLivePreview, { IStackSdk } from "@contentstack/live-preview-utils";
import { GraphQLHeaders, Page } from "./types";
import { GraphQLClient } from "graphql-request";
import { graphql } from "../gql";
import { getContentstackEndpoint, type ContentstackEndpoints } from "@contentstack/utils";

const apiKey = process.env.NEXT_PUBLIC_CONTENTSTACK_API_KEY;
const deliveryToken = process.env.NEXT_PUBLIC_CONTENTSTACK_DELIVERY_TOKEN;
const environment = process.env.NEXT_PUBLIC_CONTENTSTACK_ENVIRONMENT;

export const isPreview = process.env.NEXT_PUBLIC_CONTENTSTACK_PREVIEW === "true";

const endpoints = getContentstackEndpoint(
  process.env.NEXT_PUBLIC_CONTENTSTACK_REGION || "EU",
  "",
  true
) as ContentstackEndpoints;

export const stack = contentstack.stack({
  apiKey: apiKey || "not-configured",
  deliveryToken: deliveryToken || "not-configured",
  environment: environment || "preview",
  region: process.env.NEXT_PUBLIC_CONTENTSTACK_REGION as any,
  host:
    process.env.NEXT_PUBLIC_CONTENTSTACK_CONTENT_DELIVERY ||
    (endpoints.contentDelivery as string),
  live_preview: {
    enable: isPreview && Boolean(apiKey),
    preview_token: process.env.NEXT_PUBLIC_CONTENTSTACK_PREVIEW_TOKEN,
    host:
      process.env.NEXT_PUBLIC_CONTENTSTACK_PREVIEW_HOST ||
      (endpoints.preview as string),
  },
});

export function initLivePreview() {
  ContentstackLivePreview.init({
    ssr: false,
    enable: isPreview,
    mode: "builder",
    stackSdk: stack.config as IStackSdk,
    stackDetails: {
      apiKey: apiKey as string,
      environment: environment as string,
    },
    clientUrlParams: {
      host:
        process.env.NEXT_PUBLIC_CONTENTSTACK_CONTENT_APPLICATION ||
        (endpoints.application as string),
    },
    editButton: {
      enable: true,
      exclude: ["outsideLivePreviewPortal"],
    },
  });
}

export async function getPage(url: string, previewTimestamp?: string) {
  if (!apiKey || !deliveryToken || !environment) {
    return undefined;
  }

  const previewToken = process.env.NEXT_PUBLIC_CONTENTSTACK_PREVIEW_TOKEN as string;
  const hash = ContentstackLivePreview.hash;
  const graphqlUrl =
    process.env.NEXT_PUBLIC_CONTENTSTACK_CONTENT_DELIVERY ||
    endpoints.graphqlDelivery;
  const graphqlPreviewUrl =
    process.env.NEXT_PUBLIC_CONTENTSTACK_PREVIEW_HOST ||
    endpoints.graphqlPreview;
  const baseURL = isPreview && hash ? graphqlPreviewUrl : graphqlUrl;

  const headers: GraphQLHeaders = {
    access_token: deliveryToken,
  };

  if (hash) {
    headers.live_preview = hash;
    headers.preview_token = previewToken;
    headers.preview_timestamp = previewTimestamp;
  }

  const gqEndpoint = `https://${baseURL}/stacks/${apiKey}?environment=${environment}`;
  const graphQLClient = new GraphQLClient(gqEndpoint, { headers });

  const query = graphql(`
    query Page($url: String!) {
      all_page(where: {url: $url}) {
        items {
          system {
            uid
            content_type_uid
          }
          description
          rich_text
          title
          url
          imageConnection {
            edges {
              node {
                url
                title
              }
            }
          }
          blocks {
            ... on PageBlocksBlock {
              __typename
              block {
                copy
                imageConnection {
                  edges {
                    node {
                      url
                      title
                    }
                  }
                }
                layout
                title
              }
            }
          }
        }
      }
    }
  `);

  const res = await graphQLClient.request(query, { url: url || "/" });
  const fullPage = res?.all_page?.items?.[0];

  const fixedEntryForEditableTags = fullPage && {
    ...fullPage,
    image:
      fullPage.imageConnection?.edges?.[0]?.node,
    blocks:
      fullPage.blocks?.map((block) => ({
        ...block,
        block: {
          ...block?.block,
          image:
            block?.block?.imageConnection?.edges?.[0]?.node || null,
        },
      })),
    uid: fullPage.system?.uid,
    _content_type_uid: fullPage.system?.content_type_uid,
  };

  if (isPreview && fixedEntryForEditableTags) {
    contentstack.Utils.addEditableTags(
      fixedEntryForEditableTags as Page,
      "page",
      true
    );
  }

  return fixedEntryForEditableTags as Page | undefined;
}