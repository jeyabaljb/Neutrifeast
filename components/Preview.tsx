// Client-side component directive for Next.js
"use client";

// Importing React hooks for state management and side effects
import { useState, useEffect, useCallback } from "react";
// Importing Next.js hook to access URL search parameters
import { useSearchParams } from "next/navigation";
// Importing Contentstack Live Preview utilities for real-time content updates
import ContentstackLivePreview from "@contentstack/live-preview-utils";
// Importing functions to fetch page data and initialize live preview
import { getPage, initLivePreview } from "@/lib/contentstack";
// Importing Page type definition with alias to avoid naming conflicts
import type { Page as PageProps } from "@/lib/types";
// Importing the Page component to render the content
import Page from "./Page";
import Neutrifeast from "./Neutrifeast";

// Loading state component displayed while content is being fetched
const LoadingState = () => (
  <div className="flex flex-col items-center justify-center h-screen">
    <p>Loading...</p>
  </div>
);

// Preview component that handles live preview functionality for Contentstack
export default function Preview({ path }: { path: string }) {
  // Get search parameters from the current URL
  const searchParams = useSearchParams();
  // Extract preview_timestamp query parameter
  const previewTimestamp = searchParams.get("preview_timestamp");

  // State to store the fetched page data
  const [page, setPage] = useState<PageProps>();

  // Memoized function to fetch content data based on the current path
  // useCallback prevents unnecessary re-renders when path doesn't change
  const getContent = useCallback(async () => {
    const data = await getPage(path, previewTimestamp || undefined); // Fetch page data from Contentstack
    setPage(data); // Update state with fetched data
  }, [path, previewTimestamp]); // Re-fetch when the URL preview timestamp changes

  // Effect hook to initialize live preview and set up content change listener
  useEffect(() => {
    initLivePreview();
    getContent();
    ContentstackLivePreview.onEntryChange(getContent);
  }, [getContent]);

  // Show the branded fallback while page data is loading.
  if (!page) {
    return <Neutrifeast />;
  }

  const isKickstartEntry =
    page.title?.toLowerCase().includes("contentstack kickstart") ||
    page.description?.toLowerCase().includes("kickstart");

  if (isKickstartEntry) {
    return <Neutrifeast />;
  }

  // Render the Page component with the fetched page data
  return <Page page={page as PageProps} />;
}
