"use client";
import LocalCafeIcon from "@material-ui/icons/LocalCafe";
import AllInclusiveIcon from "@mui/icons-material/AllInclusive";
import { Item } from "../../interfaces/item";
import { Dispatch, SetStateAction } from "react";
import { Theme, Tooltip, withStyles } from "@material-ui/core";
interface Props {
  item: Item;
  setValue: (item: number) => void;
  setSelectVotes: Dispatch<SetStateAction<Item[]>>;
  selectVotes: Item[];
  handleSelect: (item: Item) => void;
}

const VoteSelect = ({
  item,
  setValue,
  setSelectVotes,
  selectVotes,
  handleSelect,
}: Props) => {
  const LightTooltip = withStyles((theme: Theme) => ({
    tooltip: {
      backgroundColor: theme.palette.common.white,
      color: "black",
      fontSize: 14,
    },
  }))(Tooltip);
  if (item.value === -1) item.tooltip = "Necesito un break. 😴";
  if (item.value === -2) item.tooltip = "Tengo incertidumbre 🤔";
  if (item.value === 100)
    item.tooltip = "Demasiado complejo. 😠";
  return (
    <LightTooltip title={item.tooltip || ""} placement="top">
      <div
        onClick={() => {
          handleSelect(item);
          setValue(item.value);
        }}
        className={`${
          item.selected &&
          "bg-white shadow-lg  border-black border-[3px] dark:bg-slate-700 dark:border-cyan-500"
        } select-none relative hover:shadow-lg flex items-center justify-center h-16 w-14 border-2 dark:border-slate-300 dark:text-slate-300 border-black text-lg font-bold rounded transition hover:bg-white dark:hover:bg-slate-800 cursor-pointer`}
      >
        {item.value === -1 ? (
          <LocalCafeIcon />
        ) : item.value === -2 ? (
          "?"
        ) : item.value === 100 ? (
          <AllInclusiveIcon />
        ) : (
          item.value
        )}
      </div>
    </LightTooltip>
  );
};

export default VoteSelect;
