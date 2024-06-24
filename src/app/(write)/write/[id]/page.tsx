/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */

'use client';

import React, { useEffect, useRef, useState, ChangeEvent } from 'react';

import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { Descendant } from 'slate';

import { postReview, getSchedule } from '@/components/textEditor/api/reviewApi';
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

interface Schedule {
  visited_date: string;
  place_names: { place_name: string }[];
}

export default function Page() {
  const router = useRouter();
  const params = useParams();
  const articleId = Number(params.id);

  const [days, setDays] = useState<number>(99);
  const [activeDay, setActiveDay] = useState<number>(1);
  const [editorValues, setEditorValues] = useState<Descendant[][]>(
    Array(days).fill([{ type: 'paragraph', children: [{ text: '' }] }])
  );
  const editorRefs = useRef<(SlateEditorRef | null)[]>(Array(days).fill(null));
  const [representativeImage, setRepresentativeImage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [title, setTitle] = useState<string>('');
  const [reviewData, setReviewData] = useState<ReviewData>({
    article_id: articleId,
    title: '',
    representative_img_url: undefined,
    description: '',
    status: 'ACTIVE'
  });
  const [schedules, setSchedules] = useState<Schedule[]>([]);

  const handleGetPlaces = async () => {
    try {
      setLoading(true);
      const response = await getSchedule(articleId);
      console.log('Response:', response);
      setDays(response.total_days);
      setSchedules(response.schedules);
    } catch (error) {
      console.error('Failed to get places:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleGetPlaces();
  }, []);

  useEffect(() => {
    setEditorValues(Array(days).fill([{ type: 'paragraph', children: [{ text: '' }] }]));
    editorRefs.current = Array(days).fill(null);
  }, [days]);

  const handleDayButtonClick = (day: number) => {
    setActiveDay(day);
  };

  const handleEditorChange = (index: number, value: Descendant[]) => {
    const newValues = [...editorValues];
    newValues[index] = value;
    setEditorValues(newValues);
  };

  const handleButtonClick = () => {
    const allSerializedValues = editorRefs.current.map((ref) => {
      const serializedValue = ref?.getSerializedValue() || '';
      return serializedValue;
    });

    const combinedData = schedules.reduce(
      (acc, schedule, index) => {
        const dayKey = `Day ${index + 1}`;
        const places = schedule.place_names.map((place) => place.place_name).join(' > ');
        acc[dayKey] = {
          schedule: places,
          description: allSerializedValues[index]
        };
        return acc;
      },
      {} as { [key: string]: { schedule: string; description: string } }
    );

    setReviewData((prev) => ({
      ...prev,
      description: JSON.stringify(combinedData)
    }));

    console.log('Review Data:', reviewData);
  };

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    setReviewData((prev) => ({
      ...prev,
      title: e.target.value
    }));
  };

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

  const handleImageRemove = () => {
    setRepresentativeImage(null);
    setReviewData((prev) => ({
      ...prev,
      representative_img_url: undefined
    }));
  };

  const handlePostReview = async () => {
    try {
      const response = await postReview(reviewData);
      console.log('Response:', response);
    } catch (error) {
      console.error('Failed to post review:', error);
    }
  };

  if (loading) {
    return <LoadingComponent />;
  }

  return (
    <div>
      <div className="relative flex flex-col gap-10">
        <div className={`border-b-500 absolute ${representativeImage ? 'top-[70px]' : 'top-[200px]'} w-full`}>
          <div className="flex flex-col gap-[20px]">
            <div className="relative w-full text-end">
              {representativeImage && (
                <div>
                  <Image
                    src={representativeImage}
                    alt="Representative"
                    width={700}
                    height={400}
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
              {[...Array(days)].map((_, index) => (
                <div
                  className={`w-full rounded-xl bg-gray-200 px-[32px] py-[24px] text-[16px] ${
                    activeDay === index + 1 ? 'block' : 'hidden'
                  }`}
                >
                  {schedules[index]?.place_names.map((place, placeIndex) => (
                    <span>
                      {place.place_name}
                      {placeIndex < schedules[index].place_names.length - 1 && ' > '}
                    </span>
                  ))}
                </div>
              ))}
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
            onClick={handlePostReview}
            className="rounded bg-blue-500 p-2 text-slate-50 hover:bg-blue-700"
          >
            발행하기
          </button>
        </div>
      </div>
    </div>
  );
}
