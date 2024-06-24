/* eslint-disable max-len */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
/* eslint-disable no-undef */
/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
/* eslint-disable no-new */

'use client';

import { useEffect, useState } from 'react';

import dynamic from 'next/dynamic';

import AddPlanButton from '@/components/common/button/AddPlan';
import Button from '@/components/common/button/Button';
import INIT_SCHEDULE_DATA from '@/components/dragAndDrop/constant';
import DayHeader from '@/components/dragAndDrop/DayHeader';
import ScheduleBlock from '@/components/dragAndDrop/ScheduleBlock';
import modalList from '@/components/modal/modalList/modalList';
import TrashSvg from '@/icons/trash.svg';
import useModal from '@/libs/hooks/useModal';
import { Schedule, ScheduleWithKey } from '@/libs/types/dragAndDropType';
import {
  EtcBlockDetailData,
  OnBlockDetailEdit,
  OnBudgetDetailEdit,
  OnEtcSelect,
  OnPlaceSelect,
  OnTransportSelect,
  PlaceBlockDetailData,
  TransportBlockDetailData
} from '@/libs/types/modalType';
import { TAB } from '@/libs/types/planDetailType.js';
import { getDateFromDayNum, getDayNum } from '@/libs/utils/dateChanger';

const Droppable = dynamic(() => import('@hello-pangea/dnd').then((mod) => mod.Droppable), { ssr: false });
const Draggable = dynamic(() => import('@hello-pangea/dnd').then((mod) => mod.Draggable), { ssr: false });
const DragDropContext = dynamic(() => import('@hello-pangea/dnd').then((mod) => mod.DragDropContext), { ssr: false });

interface DragAndDropProps {
  initList: Schedule[];
  startAt: string;
  endAt: string;
  selectedTab: TAB;
  updateList: (updatedList: Schedule[]) => void;
  isLoaded: boolean;
  isEdit: boolean;
  onClickAdd?: () => void;
  onClickDelete?: () => void;
}

// 컴포넌트
export default function DragAndDrop({
  initList,
  startAt,
  endAt,
  selectedTab,
  updateList,
  isLoaded,
  isEdit,
  onClickAdd = () => {},
  onClickDelete = () => {}
}: DragAndDropProps) {
  const [scheduleListWithKey, setScheduleListWithKey] = useState<ScheduleWithKey[][]>([]);
  const [columnKeyList, setColumnKeyList] = useState<string[]>([]);
  const { openModal, closeModal } = useModal(); // 모달

  const columnCount = getDayNum(endAt, startAt, endAt);

  // 아이템 재정렬
  const reorder = (list: ScheduleWithKey[], startIdx: number, endIdx: number): ScheduleWithKey[] => {
    const result = Array.from(list);
    const [removed] = result.splice(startIdx, 1);
    result.splice(endIdx, 0, removed);

    return result.map((item, index) => ({
      ...item,
      sort_order: index + 1
    }));
  };

  // 아이템 이동
  const move = (
    source: ScheduleWithKey[],
    destination: ScheduleWithKey[],
    droppableSource: any,
    droppableDestination: any
  ) => {
    const srcClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = srcClone.splice(droppableSource.index, 1);
    destClone.splice(droppableDestination.index, 0, removed);

    const updatedSource: ScheduleWithKey[] = srcClone.map((item, index) => ({
      ...item,
      sort_order: index + 1
    }));

    const newVisitedDate = getDateFromDayNum(+droppableDestination.droppableId + 1, startAt, endAt) || endAt;

    const updatedDestination: ScheduleWithKey[] = destClone.map((item, index) => ({
      ...item,
      sort_order: index + 1,
      visited_date: newVisitedDate
    }));

    const result: { [key: string]: ScheduleWithKey[] } = {};
    result[droppableSource.droppableId] = updatedSource;
    result[droppableDestination.droppableId] = updatedDestination;

    return result;
  };

  // 드래그 종료
  const handleDragEnd = (result: any) => {
    const { source, destination } = result;

    if (!destination) return;

    const srcIdx = +source.droppableId;
    const destIdx = +destination.droppableId;

    if (srcIdx === destIdx) {
      const reorderedList = reorder(scheduleListWithKey[srcIdx], source.index, destination.index);
      const newScheduleList = [...scheduleListWithKey];
      newScheduleList[srcIdx] = reorderedList;
      setScheduleListWithKey(newScheduleList);
    } else {
      const movedList = move(scheduleListWithKey[srcIdx], scheduleListWithKey[destIdx], source, destination);
      const newScheduleList = [...scheduleListWithKey];
      newScheduleList[srcIdx] = movedList[srcIdx];
      newScheduleList[destIdx] = movedList[destIdx];
      setScheduleListWithKey(newScheduleList);
    }
  };

  // 아이템 삭제
  const handleDeleteItem = (columnIdx: number, itemIdx: number) => {
    const newScheduleList = [...scheduleListWithKey];
    const deletedSchedule = newScheduleList[columnIdx].splice(itemIdx, 1)[0];

    const updatedColumn: ScheduleWithKey[] = newScheduleList[columnIdx].map((item, index) => ({
      ...item,
      sort_order: index + 1
    }));

    newScheduleList[columnIdx] = updatedColumn;

    setScheduleListWithKey(newScheduleList);
    onClickDelete();

    return deletedSchedule;
  };

  // 숙소, 식당, 관광지, 액티비티 블록 생성
  const handlePlaceSelect: OnPlaceSelect<{ columnIdx: number }> = ({ category, place, columnIdx }) => {
    const newVisitedDate = getDateFromDayNum(columnIdx + 1, startAt, endAt) || endAt;
    const newScheduleWithKey: ScheduleWithKey = {
      ...INIT_SCHEDULE_DATA,
      key: `item-${new Date().getTime()}`,
      visited_date: newVisitedDate,
      sort_order: scheduleListWithKey[columnIdx].length + 1,
      category,
      dtype: 'GENERAL',
      schedule_general: {
        place_name: place.name || '빈 이름',
        google_map_place_id: place.place_id || '',
        google_map_latitude: place.geometry?.location?.lat() || 0,
        google_map_longitude: place.geometry?.location?.lng() || 0,
        google_map_address: place.formatted_address || '',
        google_map_phone_number: place.formatted_phone_number || '',
        google_map_home_page_url: place.website || ''
      }
    };
    const newScheduleList = [...scheduleListWithKey];
    newScheduleList[columnIdx] = [...newScheduleList[columnIdx], newScheduleWithKey];
    setScheduleListWithKey(newScheduleList);
    closeModal();
    onClickAdd();
  };

  // 교통 블록 생성
  const handleTransportSelect: OnTransportSelect<{ columnIdx: number }> = ({
    category,
    transport,
    place,
    secondPlace,
    columnIdx
  }) => {
    const newVisitedDate = getDateFromDayNum(columnIdx + 1, startAt, endAt) || endAt;
    const newScheduleWithKey: ScheduleWithKey = {
      ...INIT_SCHEDULE_DATA,
      key: `item-${new Date().getTime()}`,
      visited_date: newVisitedDate,
      sort_order: scheduleListWithKey[columnIdx].length + 1,
      category,
      dtype: 'TRANSPORT',
      schedule_transport: {
        transportation: transport,
        start_place_name: place.name || '빈 이름',
        google_map_start_place_address: place.formatted_address || '',
        google_map_start_latitude: place.geometry?.location?.lat() || 0,
        google_map_start_longitude: place.geometry?.location?.lng() || 0,
        end_place_name: secondPlace.name || '빈 이름',
        google_map_end_place_address: secondPlace.formatted_address || '',
        google_map_end_latitude: secondPlace.geometry?.location?.lat() || 0,
        google_map_end_longitude: secondPlace.geometry?.location?.lng() || 0
      }
    };
    const newScheduleList = [...scheduleListWithKey];
    newScheduleList[columnIdx] = [...newScheduleList[columnIdx], newScheduleWithKey];
    setScheduleListWithKey(newScheduleList);
    closeModal();
    onClickAdd();
  };

  // 기타 블록 생성
  const handleEtcSelect: OnEtcSelect<{ columnIdx: number }> = ({ category, name, columnIdx }) => {
    const newVisitedDate = getDateFromDayNum(columnIdx + 1, startAt, endAt) || endAt;
    const newScheduleWithKey: ScheduleWithKey = {
      ...INIT_SCHEDULE_DATA,
      key: `item-${new Date().getTime()}`,
      visited_date: newVisitedDate,
      sort_order: scheduleListWithKey[columnIdx].length + 1,
      category,
      dtype: 'ETC',
      schedule_etc: {
        place_name: name
      }
    };
    const newScheduleList = [...scheduleListWithKey];
    newScheduleList[columnIdx] = [...newScheduleList[columnIdx], newScheduleWithKey];
    setScheduleListWithKey(newScheduleList);
    closeModal();
    onClickAdd();
  };

  // 블록 생성 모달 열기 버튼
  const handleCreateBlockModalOpen = (columnIdx: number) => {
    if (!isLoaded) return;
    openModal(
      modalList.CreateBlock({
        className: 'h-[100vh] md:w-[36.875rem] max-md:rounded-none md:h-auto',
        onClose: closeModal,
        isLoaded,
        onPlaceSelect: ({ ...props }) => handlePlaceSelect({ ...props, columnIdx }),
        onTransportSelect: ({ ...props }) => handleTransportSelect({ ...props, columnIdx }),
        onEtcSelect: ({ ...props }) => handleEtcSelect({ ...props, columnIdx })
      })
    );
  };

  // 일정 상세 모달 편집 완료 버튼
  const handleDetailEditSubmit: OnBlockDetailEdit<{ columnIdx: number; itemIdx: number }> = ({
    startAt,
    duration,
    budget,
    memo,
    columnIdx,
    itemIdx
  }) => {
    const newScheduleList = [...scheduleListWithKey];
    newScheduleList[columnIdx][itemIdx] = {
      ...newScheduleList[columnIdx][itemIdx],
      visited_time: startAt,
      duration_time: duration,
      expense: budget,
      memo
    };
    setScheduleListWithKey(newScheduleList);
    closeModal();
  };

  // 비용 모달 편집 완료 버튼
  const handleBudgetEditSubmit: OnBudgetDetailEdit<{ budget: string; columnIdx: number; itemIdx: number }> = ({
    budget,
    columnIdx,
    itemIdx
  }: {
    budget: string;
    columnIdx: number;
    itemIdx: number;
  }) => {
    const newScheduleList = [...scheduleListWithKey];
    newScheduleList[columnIdx][itemIdx] = {
      ...newScheduleList[columnIdx][itemIdx],
      expense: budget
    };
    setScheduleListWithKey(newScheduleList);
    closeModal();
  };

  // 일정 상세 블록 데이터 매핑
  const createBlockData = (schedule: ScheduleWithKey, baseData: any) => {
    if (schedule.dtype === 'GENERAL') {
      const { schedule_general: scheduleGeneral } = schedule;
      if (!scheduleGeneral) return null;
      const blockData: PlaceBlockDetailData = {
        ...baseData,
        name: scheduleGeneral.place_name,
        placeId: scheduleGeneral.google_map_place_id,
        lat: scheduleGeneral.google_map_latitude,
        lng: scheduleGeneral.google_map_longitude,
        address: scheduleGeneral.google_map_address,
        phone: scheduleGeneral.google_map_phone_number,
        homepage: scheduleGeneral.google_map_home_page_url
      };
      return blockData;
    }

    if (schedule.dtype === 'TRANSPORT') {
      const { schedule_transport: scheduleTransport } = schedule;
      if (!scheduleTransport) return null;
      const blockData: PlaceBlockDetailData = {
        ...baseData,
        name: scheduleTransport.start_place_name,
        transport: scheduleTransport.transportation,
        address: scheduleTransport.google_map_start_place_address,
        lat: scheduleTransport.google_map_start_latitude,
        lng: scheduleTransport.google_map_start_longitude,
        secondPlaceName: scheduleTransport.end_place_name,
        secondPlaceAddress: scheduleTransport.google_map_end_place_address,
        secondPlaceLat: scheduleTransport.google_map_end_latitude,
        secondPlaceLng: scheduleTransport.google_map_end_longitude
      };
      return blockData;
    }

    if (schedule.dtype === 'ETC') {
      const { schedule_etc: scheduleEtc } = schedule;
      if (!scheduleEtc) return null;
      const blockData: PlaceBlockDetailData = {
        ...baseData,
        name: scheduleEtc.place_name
      };
      return blockData;
    }

    return null;
  };

  // 일정 상세 모달 열기 버튼
  const handleBlockDetailModalOpen = (columnIdx: number, itemIdx: number) => {
    const schedule = scheduleListWithKey[columnIdx][itemIdx];
    const { category } = scheduleListWithKey[columnIdx][itemIdx];

    if (!schedule.schedule_general && !schedule.schedule_transport && !schedule.schedule_etc) return;

    const baseData = {
      category,
      startAt: schedule.visited_time,
      duration: schedule.duration_time,
      budget: schedule.expense,
      memo: schedule.memo
    };

    const blockData: PlaceBlockDetailData | TransportBlockDetailData | EtcBlockDetailData | null = createBlockData(
      schedule,
      baseData
    );

    if (!blockData) return;

    if (selectedTab === 'plan') {
      openModal(
        modalList.BlockDetail({
          className: 'h-[100vh] md:w-[36.875rem] max-md:rounded-none md:h-auto',
          onClose: closeModal,
          blockData,
          isLoaded,
          isEdit,
          onSubmit: ({ ...props }) => handleDetailEditSubmit({ ...props, columnIdx, itemIdx })
        })
      );
    }

    if (selectedTab === 'budget') {
      openModal(
        modalList.BlockDetailBudget({
          className: 'h-[100vh] md:w-[36.875rem] max-md:rounded-none md:h-auto',
          onClose: closeModal,
          blockData,
          isEdit,
          onSubmit: ({ ...props }) => handleBudgetEditSubmit({ ...props, columnIdx, itemIdx })
        })
      );
    }
  };

  // initList에 mapping용 key가 추가된 ScheduleList 생성
  useEffect(() => {
    const initListWithKey: ScheduleWithKey[] = initList.map((item) => ({
      ...item,
      key: `${item.visited_date}${item.sort_order}${new Date().getTime()}` // 고유한 mapping용 key 추가
    }));

    const newScheduleListWithKey: ScheduleWithKey[][] = Array.from({ length: columnCount }, () => []);

    initListWithKey.forEach((item) => {
      const newIdx = getDayNum(item.visited_date, startAt, endAt) - 1;
      const colIdx = newIdx >= 0 ? newIdx : columnCount - 1;
      newScheduleListWithKey[colIdx][item.sort_order - 1] = item;
    });

    setScheduleListWithKey(newScheduleListWithKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 각 column에 사용할 key 리스트
  useEffect(() => {
    for (let idx = 0; idx < columnCount; idx += 1) {
      columnKeyList[idx] = `columnKey-${idx}`;
    }
    setColumnKeyList(columnKeyList);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // updateList 호출
  useEffect(() => {
    const updatedScheduleListWithKey = scheduleListWithKey.flat();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const updatedScheduleList: Schedule[] = updatedScheduleListWithKey.map(({ key, ...item }) => item);
    updateList(updatedScheduleList);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scheduleListWithKey]);

  // 렌더링
  return (
    <div className="scrollbar-custom flex max-md:flex-col md:overflow-x-auto">
      <DragDropContext onDragEnd={handleDragEnd}>
        {scheduleListWithKey.map((list, columnIdx) => (
          <div
            className="flex-col-center w-full px-5 md:w-72 md:min-w-80 md:px-[0.625rem] md:first:ml-7 md:last:mr-7 xl:first:ml-10 xl:last:mr-10"
            key={columnKeyList[columnIdx]}
          >
            <DayHeader columnIdx={columnIdx} startAt={startAt} endAt={endAt} />
            <Droppable droppableId={`${columnIdx}`} isDropDisabled={!isEdit}>
              {(listProvided: any, listSnapshot: any) => (
                <div
                  className="flex-col-center w-full gap-3 pb-16 md:gap-4"
                  ref={listProvided.innerRef}
                  style={{ ...listSnapshot.isDraggingOver }}
                  {...listProvided.droppableProps}
                >
                  {list.map((schedule, itemIdx) => (
                    <Draggable
                      key={schedule.key}
                      draggableId={schedule.key}
                      index={itemIdx}
                      disableInteractiveElementBlocking
                      isDragDisabled={!isEdit}
                    >
                      {(itemProvided: any, itemSnapshot: any) => (
                        <div
                          className="relative w-full bg-white-01"
                          ref={itemProvided.innerRef}
                          {...itemProvided.draggableProps}
                          {...itemProvided.dragHandleProps}
                          style={{ ...itemSnapshot.isDragging, ...itemProvided.draggableProps.style }}
                        >
                          <ScheduleBlock
                            schedule={scheduleListWithKey[columnIdx][itemIdx]}
                            selectedTab={selectedTab}
                            onClick={() => handleBlockDetailModalOpen(columnIdx, itemIdx)}
                          />
                          {isEdit && (
                            <Button
                              className="absolute right-4 top-4 size-6 rounded-[0.125rem] bg-white-01 shadow-button hover:bg-gray-02"
                              onClick={() => handleDeleteItem(columnIdx, itemIdx)}
                            >
                              <TrashSvg width={16} height={16} />
                            </Button>
                          )}
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {listProvided.placeholder}
                  {isEdit && <AddPlanButton className="w-full" onClick={() => handleCreateBlockModalOpen(columnIdx)} />}
                </div>
              )}
            </Droppable>
          </div>
        ))}
      </DragDropContext>
    </div>
  );
}
