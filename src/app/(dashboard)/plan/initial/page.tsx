'use client';

import React, { useRef, useState } from 'react';

import { DateRange } from 'react-day-picker';
import { Controller, useForm } from 'react-hook-form';

import type { CityInfo } from '@/apis/useArticle/article.type';
import BadgeWithDelete from '@/components/badge/badgeWithDelete';
import CitySearchList from '@/components/CitySearchList';
import ImageBox from '@/components/common/ImageBox';
import ExpenseInput from '@/components/common/input/ExpenseInput';
import Input from '@/components/common/input/Input';
import DatePicker from '@/components/DayPicker';
import InputWithTitle from '@/components/InputWithTitle';
import PlanInputTitle from '@/components/PlanInputTitle';
import TagCheckboxList from '@/components/TagCheckboxList';
import calendarIcon from '@/icons/calendar.svg?url';
import SearchIcon from '@/icons/search.svg?url';
import { TRAVEL_STYLE, WITH_WHOM } from '@/libs/constants/travelTags';
import useDebounce from '@/libs/hooks/useDebounce';
import useDropdown from '@/libs/hooks/useDropdown';

const dateFormat = (date: Date) => `${date.getFullYear()}.${date.getMonth()}.${date.getDate()}`;

function Plan() {
  const { control, register, getValues, handleSubmit } = useForm<{
    title: string;
    places: CityInfo[];
    date: { from: Date; to: Date };
    expense: number;
    withWhom: string[];
    travelStyle: string[];
  }>({
    defaultValues: { title: '', places: [], date: {}, withWhom: ['alone'], travelStyle: [] }
  });
  const [showCalendar, setShowCalendar] = useState(false);
  const [searchString, setSearchString] = useState('');
  const debounceSearchString = useDebounce(searchString, 300);

  const searchInputRef = useRef<HTMLInputElement>(null);
  const {
    ref: searchListRef,
    isDropdownOpened: isSearchListOpened,
    handleDropdownOpen: handleSearchListOpen,
    handleDropdownClose: handleSearchListClose
  } = useDropdown<HTMLDivElement>({
    onClickInside: () => {},
    onClickOutside: (e) => {
      if (searchInputRef.current && searchInputRef.current.contains(e?.target as Node)) {
        return;
      }
      setSearchString('');
    }
  });

  const date = getValues('date');
  const title = register('title', { required: true });
  register('places', { validate: { moreThanOne: (placeList) => placeList.length > 0 } });
  register('date', { validate: { dateRange: (dateRange) => !!dateRange?.from && !!dateRange?.to } });
  register('withWhom', { validate: { moreThanOne: (whom) => whom.length > 0 } });

  const handleSearchStringChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setSearchString(e.target.value);

    if (e.target.value === '') {
      handleSearchListClose();
    }

    if (e.target.value !== '') {
      handleSearchListOpen();
    }
  };

  const handleSearchListConfirmClick = () => {
    handleSearchListClose();
    setSearchString('');
  };

  const onSubmit = (data: any) => {
    // 이후 api 작업
    console.log(data);
  };

  return (
    <div className="flex-col-center mx-auto max-w-[550px] px-5 pb-14 pt-10">
      <div className="w-full border-b border-gray-02 pb-5">
        <h1 className="font-subtitle-1 md:font-title-4 mb-2 text-center text-primary-01 md:mb-3">여행 일정 생성</h1>
        <h2 className="font-title-3 md:font-title-1 text-center text-black-01">멋진 여행 계획을 세워보세요!</h2>
      </div>

      <form className="flex w-full flex-col gap-10 pt-10 md:pt-[60px]" onSubmit={handleSubmit(onSubmit)}>
        <InputWithTitle title="여행 타이틀">
          <Input
            type="text"
            id="title"
            className="h-12 w-full rounded-[5px] border border-gray-02 px-4"
            placeholder="멋진 여행 타이틀을 지어보세요!"
            {...title}
          />
        </InputWithTitle>

        <div>
          <InputWithTitle title="여행 장소">
            <div className="flex-row-center h-12 w-full gap-1 rounded-[5px] border border-gray-02 px-4">
              <Input
                type="text"
                id="place"
                className="w-full"
                placeholder="도시명을 입력하세요"
                value={searchString}
                onChange={handleSearchStringChange}
                autoComplete="off"
                ref={searchInputRef}
              />
              <ImageBox src={SearchIcon} alt="돋보기" className="h-[18px] w-[18px]" width={18} height={18} />
            </div>
          </InputWithTitle>
          <Controller
            control={control}
            name="places"
            render={({ field: { value, onChange } }) => {
              return (
                <div className={`relative ${value.length ? 'pt-2' : ''}`}>
                  <div className="flex-row-center flex-wrap gap-1">
                    {value.map(({ placeId, city }) => (
                      <BadgeWithDelete
                        key={placeId}
                        onClickDeleteButton={() =>
                          onChange(value.filter(({ placeId: selectedPlaceId }) => selectedPlaceId !== placeId))
                        }
                      >
                        {city}
                      </BadgeWithDelete>
                    ))}
                  </div>
                  {isSearchListOpened && (
                    <CitySearchList
                      searchString={debounceSearchString}
                      selectedCityList={value}
                      onChangeCityList={onChange}
                      onClickConfirmButton={handleSearchListConfirmClick}
                      ref={searchListRef}
                    />
                  )}
                </div>
              );
            }}
          />
        </div>

        <div>
          <InputWithTitle title="여행 날짜">
            <div className="flex-row-center h-12 w-full gap-1 rounded-[5px] border border-gray-02 px-4">
              <Input
                type="text"
                id="place"
                className="w-full cursor-pointer"
                placeholder="여행 날짜를 선택하세요"
                onClick={() => setShowCalendar(true)}
                readOnly
                value={date?.from && date?.to && `${dateFormat(date.from)} ~ ${dateFormat(date.to)}`}
              />
              <button type="button" onClick={() => setShowCalendar(true)}>
                <ImageBox src={calendarIcon} alt="달력" className="h-[18px] w-[18px]" width={18} height={18} />
              </button>
            </div>
          </InputWithTitle>
          <div className="relative">
            {showCalendar && (
              <Controller
                control={control}
                name="date"
                render={({ field: { value, onChange } }) => (
                  <DatePicker
                    initialRange={value}
                    onDateRangeChange={(range: DateRange | undefined) => {
                      onChange(range);
                      setShowCalendar(false);
                    }}
                  />
                )}
              />
            )}
          </div>
        </div>

        <InputWithTitle title="여행 경비">
          <div className="flex-row-center h-12 w-full justify-between rounded-[5px] border border-gray-02 px-4">
            <Controller
              control={control}
              name="expense"
              rules={{ required: false, pattern: /^-?\d+$/ }}
              render={({ field: { onChange } }) => (
                <ExpenseInput
                  id="expense"
                  placeholder="여행 경비를 입력하세요"
                  onChangeExpense={onChange}
                  onlyInteger
                />
              )}
            />
            <span>원</span>
          </div>
        </InputWithTitle>

        <div className="flex flex-col gap-5">
          <PlanInputTitle>여행 태그</PlanInputTitle>
          <div className="flex flex-col gap-10">
            <InputWithTitle title="누구와" size="sm">
              <Controller
                control={control}
                name="withWhom"
                rules={{ validate: { required: (withWhom) => withWhom.length > 0 } }}
                render={({ field: { value, onChange } }) => {
                  const handleCheckboxChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
                    onChange([e.target.value]);
                  };

                  return (
                    <TagCheckboxList
                      tagList={WITH_WHOM}
                      selectedValueList={value}
                      onChangeCheckbox={handleCheckboxChange}
                    />
                  );
                }}
              />
            </InputWithTitle>

            <InputWithTitle title="여행 스타일" size="sm">
              <Controller
                control={control}
                name="travelStyle"
                render={({ field: { value, onChange } }) => {
                  const handleCheckboxChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
                    const newValue = value.includes(e.target.value)
                      ? value.filter((v) => v !== e.target.value)
                      : [...value, e.target.value];
                    onChange(newValue);
                  };

                  return (
                    <TagCheckboxList
                      tagList={TRAVEL_STYLE}
                      selectedValueList={value}
                      onChangeCheckbox={handleCheckboxChange}
                    />
                  );
                }}
              />
            </InputWithTitle>
          </div>
        </div>

        <button type="submit">submit</button>
      </form>
    </div>
  );
}

export default Plan;
