'use client';

import React from 'react';

import BannerArticleList from '@/components/BannerArticleList';

export default function Page() {
  return (
    <div className="container mx-auto">
      <h1 className="my-4 text-2xl font-bold">Banner Articles</h1>
      <BannerArticleList />
    </div>
  );
}