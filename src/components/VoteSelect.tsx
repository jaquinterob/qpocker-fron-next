import React, {
  Dispatch,
  MouseEventHandler,
  SetStateAction,
  useEffect,
} from "react";
interface Props {
  item: number;
  setValue: (item: number) => void;
  sendNewVote: () => void;
  value: number;
}
const VoteSelect = ({ item, setValue, sendNewVote, value }: Props) => {
  return (
    <div
      onClick={() => {
        setValue(item);
      }}
      className="flex items-center justify-center h-24 w-20 border-2 border-black text-lg font-bold rounded hover:bg-gray-200 cursor-pointer "
    >
      {item}
    </div>
  );
};

export default VoteSelect;
