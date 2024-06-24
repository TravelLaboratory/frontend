/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */

'use client';

import React, { useState, useEffect } from 'react';

import { useParams, useRouter } from 'next/navigation';

import { getReview, deleteReview as deleteReviewApi } from '@/components/textEditor/api/reviewApi';

interface ReviewData {
  user_id: number;
  profile_img_url: string | null;
  nickname: string;
  is_editable: boolean;
  article_id: number;
  review_id: number;
  title: string;
  representative_img_url: string | undefined;
  description: string;
  created_at: string;
  is_like: boolean;
  like_count: number;
}

interface Schedule {
  schedule: string;
  description: string;
}

export default function Page() {
  const params = useParams();
  const reviewId = Number(params.id);
  const [data, setData] = useState<ReviewData | null>(null);
  const [parsedDescription, setParsedDescription] = useState<{ [key: string]: Schedule } | null>(null);
  const handleGetReviewData = async () => {
    try {
      const response = await getReview(reviewId);
      setData(response);
      if (response.description) {
        setParsedDescription(JSON.parse(response.description));
      }
      console.log('Response:', response);
    } catch (error) {
      console.error('Failed to get review:', error);
    }
  };
  useEffect(() => {
    handleGetReviewData();
  }, []);

  const renderDescription = () => {
    if (!parsedDescription) return null;

    return (
      <>
        {Object.keys(parsedDescription).map((key, index) => (
          <div>
            <div className="flex w-full flex-col gap-[12px] rounded-xl bg-gray-200 px-[32px] py-[24px] text-[16px]">
              <h3 className="text-[20px] font-bold">{key}</h3>
              <p className="text-gray-400">{parsedDescription[key].schedule}</p>
            </div>
            <div className="pt-10" dangerouslySetInnerHTML={{ __html: parsedDescription[key].description }} />
          </div>
        ))}
      </>
    );
  };

  const handleDeleteReview = async () => {
    try {
      await deleteReviewApi(reviewId);
      console.log('Review deleted successfully');
    } catch (error) {
      console.error('Failed to delete review:', error);
    }
  };

  return (
    <div>
      {data?.representative_img_url && (
        <img src={data.representative_img_url} alt="profile" className="h-[370px] w-full object-cover" />
      )}
      <div className="pt-[20px]] flex flex-col px-[20px] md:px-[30px] xl:px-[280px]">
        <div className="flex flex-row justify-between">
          <div className="w-full text-[32px] font-bold">{data?.title}</div>
          <button type="button" onClick={handleDeleteReview} className="text-red-500">
            Delete
          </button>
        </div>

        <div className="flex flex-row items-center gap-4">
          {data?.profile_img_url && <img src={data.profile_img_url} alt="Profile" className="h-12 w-12 rounded-full" />}
          <div className="w-full border-b-2">{data?.nickname}</div>
        </div>
        <div className="flex flex-col gap-10 pt-[20px]">{renderDescription()}</div>
      </div>
    </div>
  );
}
