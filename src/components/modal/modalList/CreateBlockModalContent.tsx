import PlaceSearch from '@/components/map/PlaceSearch';
import PlaceSearchTransport from '@/components/map/PlaceSearchTransport';
import PlaceEtcInput from '@/components/modal/modalList/PlaceEtcInput';
import { CATEGORY } from '@/libs/constants/modal';
import { Category } from '@/libs/types/commonPlanType';
import { OnEtcSelect, OnPlaceSelect, OnTransportSelect } from '@/libs/types/modalType';

/* eslint-disable no-undef */
interface CreateBlockModalContentProps {
  category: Category;
  onPlaceSelect?: OnPlaceSelect;
  onTransportSelect?: OnTransportSelect;
  onEtcSelect?: OnEtcSelect;
}

export default function CreateBlockModalContent({
  category,
  onPlaceSelect = () => {},
  onTransportSelect = () => {},
  onEtcSelect = () => {}
}: CreateBlockModalContentProps) {
  if (category === CATEGORY.교통)
    return (
      <PlaceSearchTransport
        onTransportSelect={(transport, place, secondPlace) =>
          onTransportSelect({ category, transport, place, secondPlace })
        }
      />
    );
  if (category === CATEGORY.기타) return <PlaceEtcInput onPlaceInput={(name) => onEtcSelect({ category, name })} />;
  return <PlaceSearch onPlaceSelect={(place) => onPlaceSelect({ category, place })} />;
}
