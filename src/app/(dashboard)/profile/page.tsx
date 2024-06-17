'use client';

import React, { useState, useEffect } from 'react';

import useGetProfile from '@/apis/useTestService/useGetProfile';

export default function ProfilePage() {
  const { data, error, isLoading } = useGetProfile();
  const [activeTab, setActiveTab] = useState('여행 계획');
  const [isEditing, setIsEditing] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [name, setName] = useState('트래블');
  const [introduce, setIntroduce] = useState('한줄소개가 없습니다.');

  useEffect(() => {
    if (data) {
      setProfileImage(data.profile_img_url || '/icons/profile-default.svg');
      setName(data.name);
      setIntroduce(data.introduce || '한줄소개가 없습니다.');
    }
  }, [data]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setProfileImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case '여행 계획':
        return <div>여행 계획 내용</div>;
      case '여행 후기':
        return <div>여행 후기 내용</div>;
      case '북마크':
        return <div>북마크 내용</div>;
      default:
        return null;
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="container mx-auto p-4">
      <div className="flex">
        <aside className="w-1/4 rounded-lg bg-gray-100 p-4">
          <div className="flex flex-col items-center">
            {isEditing ? (
              <>
                <input type="file" accept="image/*" onChange={handleImageChange} className="mb-4" />
                {profileImage && (
                  <img src={profileImage} alt="Profile" className="mb-4 h-24 w-24 rounded-full object-cover" />
                )}
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mb-2 w-full rounded border px-2 py-1"
                />
                <input
                  type="text"
                  value={introduce}
                  onChange={(e) => setIntroduce(e.target.value)}
                  className="mb-4 w-full rounded border px-2 py-1"
                />
                <button type="button" className="btn-primary btn-md" onClick={handleSaveClick}>
                  확인
                </button>
              </>
            ) : (
              <>
                <img
                  src={profileImage || '/icons/profile-default.svg'}
                  alt="Profile"
                  className="mb-4 h-24 w-24 rounded-full object-cover"
                />
                <h2 className="text-xl font-semibold">{name}</h2>
                <p className="text-gray-500">{introduce}</p>
                <button type="button" className="btn-solid btn-md mt-4" onClick={handleEditClick}>
                  편집하기
                </button>
              </>
            )}
          </div>
        </aside>
        <main className="w-3/4 p-4">
          <div className="mb-4 flex space-x-4">
            <button
              type="button"
              className={`px-4 py-2 ${activeTab === '여행 계획' ? 'border-black border-b-2' : 'text-gray-500'}`}
              onClick={() => setActiveTab('여행 계획')}
            >
              여행 계획
            </button>
            <button
              type="button"
              className={`px-4 py-2 ${activeTab === '여행 후기' ? 'border-black border-b-2' : 'text-gray-500'}`}
              onClick={() => setActiveTab('여행 후기')}
            >
              여행 후기
            </button>
            <button
              type="button"
              className={`px-4 py-2 ${activeTab === '북마크' ? 'border-black border-b-2' : 'text-gray-500'}`}
              onClick={() => setActiveTab('북마크')}
            >
              북마크
            </button>
          </div>
          <div>{renderTabContent()}</div>
        </main>
      </div>
    </div>
  );
}
