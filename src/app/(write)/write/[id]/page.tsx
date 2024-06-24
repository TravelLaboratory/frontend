/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */

'use client';

import React, { useRef, useState, ChangeEvent } from 'react';

import Image from 'next/image'; // Importing Image from next/image
import { useParams, useRouter } from 'next/navigation';
import { Descendant } from 'slate';

import { postReview } from '@/components/textEditor/api/reviewApi';
import DayButton from '@/components/textEditor/DayButton';
import LoadingComponent from '@/components/textEditor/LoadingComponent';
import SlateEditor, { SlateEditorRef } from '@/components/textEditor/SlateEditor';
import uploadImage from '@/components/textEditor/utils/uploadImage';

interface ReviewData {
  article_id: number;
  title: string;
  representative_img_url: string | undefined;
  description: string;
  status: string | 'ACTIVE';
}

export default function Page() {
  // Article ID 가져오기
  const router = useRouter();
  const params = useParams();
  const articleId = Number(params.id);

  // 임시 Days 넣기
  const days = 5;
  const [activeDay, setActiveDay] = useState<number>(1); // Default to the first day being active
  const [editorValues, setEditorValues] = useState<Descendant[][]>(
    Array(days).fill([{ type: 'paragraph', children: [{ text: '' }] }])
  );
  const editorRefs = useRef<(SlateEditorRef | null)[]>(Array(days).fill(null));
  const [serializedValues, setSerializedValues] = useState<string[]>(Array(days).fill(''));
  const [representativeImage, setRepresentativeImage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [title, setTitle] = useState<string>('');
  const [reviewData, setReviewData] = useState<ReviewData>({
    article_id: articleId, // Example article_id
    title: '',
    representative_img_url: undefined,
    description: '',
    status: 'ACTIVE'
  });

  // Day Button 클릭시에 activeDay 변경
  const handleDayButtonClick = (day: number) => {
    setActiveDay(day);
  };

  // Editor 변경시에 editorValues 변경
  const handleEditorChange = (index: number, value: Descendant[]) => {
    const newValues = [...editorValues];
    newValues[index] = value;
    setEditorValues(newValues);
  };

  // Button 클릭시에 editorValues를 serializedValues로 변경
  const handleButtonClick = () => {
    const allSerializedValues = editorRefs.current.map((ref) => {
      const serializedValue = ref?.getSerializedValue() || '';
      return serializedValue;
    });
    const serializedObject = allSerializedValues.reduce(
      (acc, value, index) => {
        acc[index + 1] = value;
        return acc;
      },
      {} as { [key: number]: string }
    );

    setSerializedValues(allSerializedValues);
    setReviewData((prev) => ({
      ...prev,
      description: JSON.stringify(serializedObject)
    }));
  };

  // Title 변경시에 title 변경
  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    setReviewData((prev) => ({
      ...prev,
      title: e.target.value
    }));
  };

  // Representative Image 변경시에 image 변경
  const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setLoading(true);
      try {
        console.log('Uploading image...');
        const url = await uploadImage(file);
        if (url) {
          console.log('Image URL:', url);
          setRepresentativeImage(url);
          setReviewData((prev) => ({
            ...prev,
            representative_img_url: url
          }));
        }
      } catch (error) {
        console.error('Error uploading image:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  // Representative Image 삭제시에 image 삭제
  const handleImageRemove = () => {
    setRepresentativeImage(null);
    setReviewData((prev) => ({
      ...prev,
      representative_img_url: undefined
    }));
  };

  // Review Upload
  const postReivew = async () => {
    try {
      const response = await postReview(reviewData);
      console.log('Response:', response);
    } catch (error) {
      console.error('Failed to post review:', error);
    }
  };

  return (
    <div>
      <div className="relative flex flex-col gap-10">
        <div className={`border-b-500 absolute ${representativeImage ? 'top-[70px]' : 'top-[200px]'} w-full`}>
          <div className="flex flex-col gap-[20px]">
            {loading && <LoadingComponent />}
            <div className="relative w-full text-end">
              {representativeImage && (
                <div>
                  <Image
                    src={representativeImage}
                    alt="Representative"
                    width={700} // Adjust width accordingly
                    height={400} // Adjust height accordingly
                    className="h-[370px] w-full rounded-md object-cover"
                  />
                </div>
              )}
              {representativeImage ? (
                <div
                  className="absolute bottom-[20px] right-[20px] z-10 inline-block cursor-pointer rounded bg-gray-200 px-3 py-1 md:right-[30px] xl:right-[280px]"
                  onClick={handleImageRemove}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      handleImageRemove();
                    }
                  }}
                >
                  대표 이미지 삭제
                </div>
              ) : (
                <>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                    ref={fileInputRef}
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute bottom-[20px] right-[20px] z-10 inline-block cursor-pointer rounded bg-gray-200 px-3 py-1 md:right-[30px] xl:right-[280px]"
                  >
                    대표이미지 추가
                  </button>
                </>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-20 px-[20px] md:px-[30px] xl:px-[270px]">
            <div className="border-b-2 pt-[20px]">
              <input
                className="w-full text-[32px] focus:outline-none"
                placeholder="제목을 입력하세요"
                value={title}
                onChange={handleTitleChange}
                type="text"
              />
            </div>

            {/* Day Button 과 스케줄 */}
            <div className="flex flex-col gap-[20px]">
              <div className="flex flex-wrap gap-[10px]">
                {[...Array(days)].map((_, index) => (
                  <DayButton activeDay={activeDay} day={index + 1} handleDayButtonClick={handleDayButtonClick} />
                ))}
              </div>
              <div className="w-full rounded-xl bg-gray-400 px-[32px] py-[24px] text-[16px]">
                후쿠오카공항 / 스시사카바 / 프린스 스마트 인 하카타 / 무이치몬 하카타점
              </div>
            </div>
          </div>
        </div>
        {[...Array(days)].map((_, index) => (
          <div className={activeDay === index + 1 ? 'block' : 'hidden'}>
            <SlateEditor
              ref={(el) => {
                editorRefs.current[index] = el;
              }}
              value={editorValues[index]}
              onChange={(value) => handleEditorChange(index, value)}
              representativeImage={representativeImage}
            />
          </div>
        ))}
      </div>
      <div className="flex flex-row place-content-evenly">
        <div className="flex w-full flex-row place-content-end gap-10 px-10">
          <button
            type="button"
            onClick={handleButtonClick}
            className="rounded bg-green-500 p-2 text-slate-50 hover:bg-blue-700"
          >
            저장하기
          </button>
          <button
            type="button"
            onClick={postReivew}
            className="rounded bg-blue-500 p-2 text-slate-50 hover:bg-blue-700"
          >
            발행하기
          </button>
        </div>
      </div>
    </div>
  );
}
