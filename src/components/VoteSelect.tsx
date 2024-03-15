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
      className="p-8 border-2 border-black text-lg font-bold rounded hover:border-gray-400 cursor-pointer"
    >
      {item}
    </div>
  );
};

export default VoteSelect;
