'use client';

import React, { useState } from 'react';

import { comment, replyComment, getComments, likeComment } from '@/components/textEditor/api/commentApi';
import { getReview, createArticle, deleteReview, likeReview } from '@/components/textEditor/api/reviewApi';

interface Description {
  [key: string]: string;
}

interface ReviewData {
  user_id: number;
  profile_img_url: string | null;
  nickname: string;
  is_editable: boolean;
  article_id: number;
  review_id: number;
  title: string | null;
  representative_img_url: string | undefined;
  description: Description;
  created_at: string;
  is_like: boolean;
  like_count: number;
}

const articleData = {
  title: '일본여행',
  location: [
    {
      place_id: '1',
      address: '2',
      city: '3'
    }
  ],
  start_at: '2024-06-21',
  end_at: '2024-06-25',
  expense: 'string',
  travel_companion: '혼자서',
  style: ['호캉스', '맛집 탐방']
};

function Page() {
  const [data, setData] = useState<ReviewData | null>(null);

  const handleGetReview = async () => {
    try {
      const response = await getReview(1);
      console.log('Response:', response);
      const serializedValues = JSON.parse(response.description);
      console.log('Serialized Values:', serializedValues);
      response.description = serializedValues;
      setData(response);
    } catch (error) {
      console.error('Failed to get review:', error);
    }
  };

  const handleCreateArticle = async () => {
    try {
      const response = await createArticle(articleData);
      console.log(response);
    } catch (error) {
      console.error('Failed to create article:', error);
    }
  };

  const handleDeleteReview = async () => {
    try {
      const response = await deleteReview(4);
      console.log(response);
    } catch (error) {
      console.error('Failed to delete review:', error);
    }
  };

  const handleLikeReview = async () => {
    try {
      const response = await likeReview(2);
      console.log(response);
    } catch (error) {
      console.error('Failed to like review:', error);
    }
  };

  const handleComment = async () => {
    try {
      const response = await comment({
        review_id: 3,
        reply_comment: '그냥 댓글'
      });
      console.log(response);
    } catch (error) {
      console.error('Failed to comment:', error);
    }
  };

  const handleReplyComment = async () => {
    try {
      const response = await replyComment(
        {
          reply_comment: '리플라이 댓글'
        },
        5
      );
      console.log(response);
    } catch (error) {
      console.error('Failed to comment:', error);
    }
  };

  const handleGetComments = async () => {
    try {
      const response = await getComments(3);
      console.log(response);
    } catch (error) {
      console.error('Failed to get comments:', error);
    }
  };

  const handleLikeComment = async () => {
    try {
      const response = await likeComment(5);
      console.log(response);
    } catch (error) {
      console.error('Failed to like comment:', error);
    }
  };

  return (
    <div>
      <div className="flex flex-row flex-wrap gap-10 p-10">
        <button type="button" className="rounded-xl bg-blue-200 p-4" onClick={handleCreateArticle}>
          Create Article
        </button>
        <button type="button" className="rounded-xl bg-blue-200 p-4">
          Post Review
        </button>
        <button type="button" className="rounded-xl bg-blue-200 p-4" onClick={handleGetReview}>
          Get Review
        </button>
        <button type="button" onClick={handleDeleteReview} className="rounded-xl bg-blue-200 p-4">
          Delete Review
        </button>
        <button type="button" className="rounded-xl bg-blue-200 p-4" onClick={handleLikeReview}>
          Like Review
        </button>
        <button type="button" className="rounded-xl bg-blue-200 p-4" onClick={handleComment}>
          Comment
        </button>
        <button type="button" className="rounded-xl bg-blue-200 p-4" onClick={handleReplyComment}>
          Edit Comment
        </button>
        <button type="button" className="rounded-xl bg-blue-200 p-4" onClick={handleLikeComment}>
          Like Comment
        </button>
        <button type="button" className="rounded-xl bg-blue-200 p-4" onClick={handleGetComments}>
          Get Comments
        </button>
      </div>
      <div className="pb-[30px]">{data && <pre>{JSON.stringify(data, null, 2)}</pre>}</div>
      {data?.representative_img_url && (
        <img src={data.representative_img_url} alt="profile" className="h-[370px] w-full object-cover" />
      )}
      <div className="flex flex-col gap-20 px-[270px]">
        <div className="w-full text-[32px] font-bold ">{data?.title}</div>
        <div>Profile</div>
        <div>
          {data && (
            <div>
              {Object.keys(data.description).map((key) => (
                <div key={key}>
                  <h3>Day {key}</h3>
                  <div dangerouslySetInnerHTML={{ __html: data.description[key] }} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Page;
