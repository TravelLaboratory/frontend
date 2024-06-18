import React, { useEffect, useState, forwardRef } from 'react';

import { CityInfo } from '@/apis/useArticle/article.type';

import Button from './common/button/Button';

interface CitySearchListProps {
  searchString: string;
  selectedCityList?: { placeId: string; address: string; city: string }[];
  onChangeCityList: (value: CityInfo[]) => void;
  onClickConfirmButton: React.MouseEventHandler;
}

const CitySearchList = forwardRef(function CitySearchList(
  { searchString, selectedCityList, onChangeCityList, onClickConfirmButton }: CitySearchListProps,
  ref: React.ForwardedRef<HTMLDivElement>
) {
  const [searchList, setSearchList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const SelectedCityPlaceIdList = selectedCityList?.map(({ placeId }) => placeId) || [];

  const handleSelectedCityRemove: (cityInfo: CityInfo) => React.MouseEventHandler = (cityInfo) => (e) => {
    e.stopPropagation();
    if (!selectedCityList) return;

    onChangeCityList(selectedCityList.filter(({ placeId }) => placeId !== cityInfo.placeId));
  };

  const handleSelectedCityAdd: (cityInfo: CityInfo) => React.MouseEventHandler = (cityInfo) => (e) => {
    e.stopPropagation();
    if (!selectedCityList) return;

    onChangeCityList([...selectedCityList, cityInfo]);
  };

  useEffect(() => {
    const fetchGooglePlaces = async () => {
      if (!searchString.length) return;

      try {
        setIsLoading(true);

        if (searchList.length) {
          setIsLoading(false);
        }

        const response = await fetch('/api/googlePlaces', {
          method: 'POST',
          body: JSON.stringify({
            input: searchString,
            includedPrimaryTypes: ['(cities)'],
            includeQueryPredictions: true
          })
        });

        const data = await response.json();

        setSearchList(data);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGooglePlaces();
  }, [searchString, searchList.length]);

  if (isLoading) {
    return (
      <div className="absolute top-0 rounded-[10px] bg-white-01 p-5 shadow-[0_0_10px_0_rgba(0,0,0,0.1)]" ref={ref}>
        <p className="text-caption-1 h-10 text-center">로딩중..</p>
        <Button className="btn-solid btn-lg" onClick={onClickConfirmButton}>
          확인
        </Button>
      </div>
    );
  }

  if (!searchList.length) {
    return (
      <div className="absolute top-0 rounded-[10px] bg-white-01 p-5 shadow-[0_0_10px_0_rgba(0,0,0,0.1)]" ref={ref}>
        <p className="text-caption-1 h-10 text-center">일치하는 결과가 없습니다</p>
        <Button className="btn-solid btn-lg" onClick={onClickConfirmButton}>
          확인
        </Button>
      </div>
    );
  }

  return (
    <div className="absolute top-0 rounded-[10px] bg-white-01 p-5 shadow-[0_0_10px_0_rgba(0,0,0,0.1)]" ref={ref}>
      <ul className="mb-5 max-h-40 min-w-52 overflow-y-auto">
        {searchList?.map(({ placeId, address, city }) => (
          <li key={placeId} className="flex-row-center mb-2 justify-between">
            <div className="flex-row-center gap-1">
              <span className="text-caption-1">{address}</span>
            </div>
            {SelectedCityPlaceIdList.includes(placeId) ? (
              <Button
                type="button"
                className="btn-outline btn-sm"
                onClick={handleSelectedCityRemove({ placeId, address, city })}
              >
                취소
              </Button>
            ) : (
              <Button
                type="button"
                className="btn-ghost btn-sm"
                onClick={handleSelectedCityAdd({ placeId, address, city })}
              >
                선택
              </Button>
            )}
          </li>
        ))}
      </ul>
      <Button className="btn-solid btn-lg" onClick={onClickConfirmButton}>
        확인
      </Button>
    </div>
  );
});

export default CitySearchList;
