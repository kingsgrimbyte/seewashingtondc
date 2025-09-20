import { NextPage } from 'next';

declare module 'next' {
  export interface PageParams {
    categorySlug?: string;
    placeSlug?: string;
  }

  export interface PageProps<P = PageParams> {
    params: Promise<P>;
    searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
  }
}

export {}; 