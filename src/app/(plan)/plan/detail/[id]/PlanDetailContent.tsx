/* eslint-disable max-len */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
/* eslint-disable no-undef */
/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
/* eslint-disable no-new */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable array-callback-return */

'use client';

import React, { useEffect, useState } from 'react';

import dynamic from 'next/dynamic';
import { useParams, useRouter } from 'next/navigation';

import {
  useDeleteSchedules,
  usePatchSchedulesPrivacy,
  usePutSchedules,
  usePutSchedulesCoverImage
} from '@/apis/useScheduleService/useService';
import Button from '@/components/common/button/Button';
import Chip from '@/components/common/button/Chip';
import Dropdown from '@/components/common/Dropdown';
import ImageBox from '@/components/common/ImageBox';
import ResizableComponent, { Position } from '@/components/common/ResizableComponent';
import DragAndDrop from '@/components/dragAndDrop/DragAndDrop';
import { Coordinate } from '@/components/map/type';
import modalList from '@/components/modal/modalList/modalList';
import KebabSvg from '@/icons/kebab.svg';
import PenEditSvg from '@/icons/pen-edit.svg';
import ShareSvg from '@/icons/share.svg';
import DefaultCoverImage from '@/images/planDetailMockImage.png';
import { PAGE_MAP_STYLE, PAGE_MAP_STYLE_MOBILE } from '@/libs/constants/mapStyle';
import useDropdownEdit from '@/libs/hooks/useDropdownEdit';
import useGoogleMapsApi from '@/libs/hooks/useGoogleMapsApi';
import useMediaQuery from '@/libs/hooks/useMediaQuery';
import useModal from '@/libs/hooks/useModal';
import useResizeSize from '@/libs/hooks/useResizeSize';
import { Category } from '@/libs/types/commonPlanType';
import { PlanDetail, Schedule, ScheduleList } from '@/libs/types/dragAndDropType';
import { TAB } from '@/libs/types/planDetailType';
import { getDateFromDayNum, getDayNum } from '@/libs/utils/dateChanger';

const Map = dynamic(() => import('@/components/map/Map'), { ssr: false });

const TAB_LIST: { tab: TAB; name: string }[] = [
  { tab: 'plan', name: '일정' },
  { tab: 'budget', name: '비용' }
];

type DropdownList = '비공개' | '편집하기' | '후기 작성하기' | '후기 보러가기' | '삭제하기';
const DROPDONW_LIST: DropdownList[] = ['비공개', '편집하기', '후기 작성하기', '후기 보러가기', '삭제하기'];

function ToggleButton({ isOn, onClick }: { isOn: boolean } & { onClick: React.MouseEventHandler<HTMLDivElement> }) {
  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions, jsx-a11y/interactive-supports-focus
    <div className="flex-row-center" onClick={onClick} role="button">
      <div
        className={`flex h-5 w-8 items-center rounded-full p-1 transition-colors duration-300 ${isOn ? 'bg-[#4F80FF]' : 'bg-[#DDE2E9]'}`}
      >
        <div
          className={`bg-white size-4 transform rounded-full bg-white-01 transition-transform duration-300 ${isOn ? 'translate-x-[0.625rem]' : 'translate-x-[-0.125rem]'}`}
        />
      </div>
    </div>
  );
}

interface PlanDetailContentProps {
  className?: string;
  planDetail: PlanDetail;
  initList: ScheduleList;
}

export default function PlanDetailContent({ className, planDetail, initList }: PlanDetailContentProps) {
  const [position, setPosition] = useState<Position>('left'); // 창 위치; left/bottom
  const isDt = useMediaQuery('(min-width: 1280px)'); // 미디어 쿼리; desktop
  const { isLoaded } = useGoogleMapsApi(); // 구글맵 api
  const { openModal, closeModal } = useModal(); // 모달
  const [selectedTab, setSelectedTab] = useState<TAB>('plan'); // 탭; 일정/비용
  const [scheduleList, setScheduleList] = useState<ScheduleList>(initList); // 전체 일정 상세 객체
  const [dayList, setDayList] = useState<number[]>([]);
  const [selectedDay, setSelectedDay] = useState(1);
  const [coordinateList, setCoordinateList] = useState<(Coordinate | undefined)[]>();
  const [markerCategoryList, setMarkerCategoryList] = useState<(Category | undefined)[]>([]);
  const [isEdit, setIsEdit] = useState(false); // 편집 모드
  const [isPrivate, setIsPrivate] = useState(planDetail.is_private); // 비공개 여부
  const { ref, isDropdownOpened, handleDropdownToggle, handleDropdownClose } = useDropdownEdit('articleDetailDropdown');
  const { divRef, divHeight } = useResizeSize();
  const [coverImage, setCoverImage] = useState(planDetail.cover_image || DefaultCoverImage);
  const [coverImageFile, setCoverImageFile] = useState<File | null>(null);

  console.log('planDetail', planDetail);
  console.log('initList', initList);

  const router = useRouter();
  const params = useParams();
  const articleId = Number(params.id);

  const { mutate: apiPutSchedules } = usePutSchedules(articleId, { schedules: scheduleList.schedules });
  const { mutate: apiDeleteSchedules } = useDeleteSchedules(articleId);
  const { mutate: apiPatchSchedulesPrivacy } = usePatchSchedulesPrivacy(articleId, { is_private: !isPrivate });
  const {
    mutate: apiPutSchedulesCoverImage,
    data: apiCoverImage,
    isPending: apiIsImageLoading
  } = usePutSchedulesCoverImage(articleId, {
    coverImage: coverImageFile
  });

  // 리스트 업데이트
  const handleUpdateScheduleList = (updatedList: Schedule[]) => {
    setScheduleList((prev) => ({ ...prev, schedules: updatedList }));
  };

  // 커버 이미지 변경
  const handleChangeCoverImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; // File
    if (!file) return;

    setCoverImageFile(file);
  };

  useEffect(() => {
    if (!coverImageFile) return;
    apiPutSchedulesCoverImage(undefined);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [coverImageFile]);

  useEffect(() => {
    const newCoverImage = apiCoverImage?.cover_image_url;
    if (!newCoverImage) return;
    setCoverImage(newCoverImage);
  }, [apiCoverImage]);

  // 링크 공유
  const handleShareButtonClick = () => {
    openModal(
      modalList.ShareLink({
        className: 'h-[100vh] md:w-[36.875rem] max-md:rounded-none md:h-auto',
        imageUrl: planDetail?.cover_image,
        onSubmit: () => closeModal()
      })
    );
  };

  // 비공개 토글
  const handleTogglePrivate = () => {
    apiPatchSchedulesPrivacy(undefined, { onSuccess: () => setIsPrivate(!isPrivate) });
  };

  // 여행 계획 삭제
  const handleDeletePlan = () => {
    openModal(
      modalList.SubmitModal({
        className: 'h-auto w-[20rem] md:w-[25rem] ',
        text: '일정을 삭제하시겠습니까?',
        submitText: '삭제하기',
        negative: true,
        sameMdPadding: true,
        onCancel: () => closeModal(),
        onSubmit: () => {
          // 삭제 후 홈페이지로 이동
          apiDeleteSchedules(undefined, { onSuccess: () => router.push('/') });
          closeModal();
        }
      })
    );
  };

  // 여행 계획 편집 페이지로 이동
  const handleEditPlanPage = () => {
    router.push(`/plan/initial/${articleId}`);
  };

  // 드롭다운 선택
  const handleDropdownSelect = (e: any) => {
    const selectedMenu: DropdownList = e.target.textContent;

    if (selectedMenu === '비공개') {
      handleTogglePrivate();
      return;
    }

    if (selectedMenu === '편집하기') {
      setIsEdit(true);
    }

    if (selectedMenu === '후기 작성하기') {
      // 페이지 이동
      console.log('후가 작성 페이지 이동');
    }

    if (selectedMenu === '후기 보러가기') {
      // 페이지 이동
      console.log('후기 보러가기 페이지 이동');
    }

    if (selectedMenu === '삭제하기') {
      handleDeletePlan();
    }

    handleDropdownClose();
  };

  // 수정한 일정 상세 제출
  const handleEditSubmit = () => {
    apiPutSchedules(undefined, { onSuccess: () => setIsEdit(false) });
  };

  useEffect(() => {
    if (isDt) setPosition('left');
    else setPosition('bottom');
  }, [isDt]);

  // Day N 초기화
  useEffect(() => {
    const lastDayNum = getDayNum(planDetail.end_at, planDetail.start_at, planDetail.end_at);
    if (lastDayNum <= 0) return;
    setDayList(Array.from({ length: lastDayNum }, (_, i) => i + 1));
  }, [planDetail]);

  useEffect(() => {
    const handleUpdateCoordinateList = () => {
      const { schedules } = scheduleList;
      if (!schedules) return;

      const currentDate = getDateFromDayNum(selectedDay, planDetail.start_at, planDetail.end_at);
      const currentSchedules = schedules.map((schedule) => {
        if (schedule.visited_date !== currentDate) return;
        return schedule;
      });
      const filteredSchedules = currentSchedules.filter((schedule) => schedule !== undefined);

      const newCoordinateList = filteredSchedules.map((schedule) => {
        if (!schedule) return;
        if (schedule.dtype === 'GENERAL') {
          const lat = schedule.schedule_general?.google_map_latitude;
          const lng = schedule.schedule_general?.google_map_longitude;
          if (!lat || !lng) return;
          return { lat, lng };
        }
        if (schedule.dtype === 'TRANSPORT') {
          const lat = schedule.schedule_transport?.google_map_start_latitude;
          const lng = schedule.schedule_transport?.google_map_start_longitude;
          if (!lat || !lng) return;
          return { lat, lng };
        }
      });

      const newMarkerCategoryList = filteredSchedules.map((schedule) => {
        if (!schedule) return;
        return schedule.category;
      });

      setCoordinateList(newCoordinateList);
      setMarkerCategoryList(newMarkerCategoryList);
    };

    handleUpdateCoordinateList();
  }, [scheduleList, selectedDay]);

  // 일정 헤더
  const Header = (
    <>
      <div className="relative w-full p-5 md:p-7 xl:p-10 xl:pb-5">
        <div className=" flex-row-center absolute right-5 top-5 w-full justify-end gap-5 md:right-7 md:top-7 xl:right-10 xl:top-10">
          <Button onClick={handleShareButtonClick}>
            <ShareSvg width={24} height={24} />
          </Button>
          <div ref={divRef}>
            <Button onClick={(e: any) => handleDropdownToggle(e)}>
              <KebabSvg width={24} height={24} />
            </Button>
          </div>
          {isDropdownOpened && (
            <Dropdown
              className="scrollbar-custom  absolute right-0 top-0 z-10 overflow-auto px-0 py-[0.625rem]"
              style={{ top: `${divHeight + 8}px` }}
              ref={ref}
            >
              {DROPDONW_LIST.map((item) => {
                if (
                  !scheduleList.is_editable &&
                  (item === '비공개' || item === '편집하기' || item === '후기 작성하기' || item === '삭제하기')
                )
                  return;
                if (item === '편집하기' && isEdit) return;
                if (item === '후기 작성하기' && scheduleList.review_id) return;
                if (item === '후기 보러가기' && !scheduleList.review_id) return;

                return (
                  <Button
                    className="modal-dropdown flex-row-center w-full cursor-pointer justify-between whitespace-nowrap py-2 pl-5 pr-8 hover:bg-primary-02"
                    key={item}
                    onClick={handleDropdownSelect}
                  >
                    <p className={`font-btn-text ${item === '삭제하기' && 'text-red-01'}`}>{item}</p>
                    {item === '비공개' && (
                      <ToggleButton
                        isOn={isPrivate}
                        onClick={(e: any) => {
                          e.stopPropagation();
                          handleTogglePrivate();
                        }}
                      />
                    )}
                  </Button>
                );
              })}
            </Dropdown>
          )}
        </div>
        <div className="flex-row-center mb-2 justify-between">
          <p className="font-caption-1 text-black-03">
            {planDetail.start_at.replace(/-/g, '.')} ~ {planDetail.end_at.replace(/-/g, '.')}
          </p>
        </div>
        <div className="flex-row-center gap-4">
          <p className="font-title-2">{planDetail.name}</p>
          {!isEdit && (
            <Button onClick={handleEditPlanPage}>
              <PenEditSvg width={24} height={24} />
            </Button>
          )}
        </div>
      </div>
      <div className="mx-10 hidden border-b border-gray-02 xl:block" />
    </>
  );

  // 외부 콘텐츠 -> 이미지 업데이트
  const bgChildren = (
    <div className="relative">
      {!isDt && (
        <>
          {isEdit && (
            <>
              <input
                id="cover-image-input"
                className="hidden"
                type="file"
                accept="image/*"
                onChange={handleChangeCoverImage}
              />
              <label
                htmlFor="cover-image-input"
                className="font-caption-3 absolute right-5 top-[128px] h-8 w-32 cursor-pointer rounded-[0.3125rem] border border-solid border-gray-02 bg-white-01 py-[0.375rem] text-center hover:bg-gray-02 md:right-7 md:top-[188px]"
              >
                커버 이미지 변경
              </label>
            </>
          )}
          <ImageBox
            className="h-[11.25rem] w-full md:h-[15rem]"
            src={coverImage}
            placeholderClassName="bg-gray-02"
            alt="cover"
            width={768}
            height={180}
            priority
          />
          {apiIsImageLoading && (
            <div className="font-title-4 absolute left-1/2 top-1/4 -translate-x-1/2 -translate-y-1/2 text-white-01">
              로딩 중 ...
            </div>
          )}
          {Header}
        </>
      )}
      <div className="h-24 w-full">
        {isLoaded && (
          <div className="lg:absolute lg:right-0">
            <Map
              mapContainerStyle={isDt ? PAGE_MAP_STYLE : PAGE_MAP_STYLE_MOBILE}
              coordinateList={coordinateList}
              markerCategoryList={markerCategoryList}
              alwaysRender
            />
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className={className}>
      <ResizableComponent
        className="absolute bottom-0 left-0 h-full w-full"
        position={position}
        initialSize="50%"
        minSize={isDt ? '380px' : '10%'}
        maxSize="90%"
        bgChildren={bgChildren}
      >
        {/* 헤더 */}

        {isDt && (
          <div className="relative">
            {isEdit && (
              <>
                <input
                  id="cover-image-input"
                  className="hidden"
                  type="file"
                  accept="image/*"
                  onChange={handleChangeCoverImage}
                />
                <label
                  htmlFor="cover-image-input"
                  className="font-caption-3 absolute right-10 top-[11.75rem] h-8 w-32 cursor-pointer rounded-[0.3125rem] border border-solid border-gray-02 bg-white-01 py-[0.375rem] text-center hover:bg-gray-02"
                >
                  커버 이미지 변경
                </label>
              </>
            )}
            <ImageBox
              className="w-full md:h-[15rem]"
              src={coverImage}
              placeholderClassName="bg-gray-02"
              alt="cover"
              width={768}
              height={180}
              priority
            />
            {apiIsImageLoading && (
              <div className="font-title-4 absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 text-white-01">
                로딩 중 ...
              </div>
            )}
            {Header}
          </div>
        )}
        <div>
          {/* 탭 */}
          <div className="flex-row-center justify-between">
            <div className="font-title-3 mx-5 mb-5 mt-7 flex flex-row items-start gap-7 text-gray-01 md:mx-7 md:mt-12 xl:mx-10 xl:my-5 ">
              {TAB_LIST.map((item) => (
                <Button
                  key={item.tab}
                  className={`flex-col-center w-[3.125rem] gap-1 ${selectedTab === item.tab && 'text-black-01'}`}
                  onClick={() => setSelectedTab(item.tab)}
                >
                  {item.name}
                  {selectedTab === item.tab && <div className="ml-[2px] h-[0.125rem] w-12 bg-black-01" />}
                </Button>
              ))}
            </div>
            {isEdit && (
              <Button
                className="btn-solid font-btn-2 mr-5 h-10 w-20 gap-x-2.5 rounded-md md:mr-7 xl:mr-10"
                onClick={handleEditSubmit}
              >
                완료하기
              </Button>
            )}
          </div>
          {/* Day N 바로가기 버튼 -> 나중에 추가 / intersectionObserver 사용해야 할 듯 */}
          <div className="mx-5 mb-5 w-[calc(100%-5rem)] overflow-hidden md:mx-7 md:mb-7 xl:mx-10 xl:mb-9">
            <div className="flex-row-center scrollbar-custom w-full gap-2 overflow-x-auto">
              {dayList.map((day) => (
                <Chip
                  key={day}
                  className="mb-3 flex-shrink-0"
                  variant="day"
                  selected={day === selectedDay}
                  onClick={() => setSelectedDay(day)}
                >
                  Day {day}
                </Chip>
              ))}
            </div>
          </div>
          {/* Day 1~N 콘텐츠 */}
          <DragAndDrop
            initList={scheduleList.schedules}
            startAt={planDetail.start_at}
            endAt={planDetail.end_at}
            selectedTab={selectedTab}
            updateList={handleUpdateScheduleList}
            isLoaded={isLoaded}
            isEdit={isEdit}
          />
        </div>
      </ResizableComponent>
    </div>
  );
}
