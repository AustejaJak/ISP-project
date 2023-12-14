import { watchFilters } from "../../../filters/WatchFilters";

export interface FilterProps {
  id: string;
  name: string;
  options: { value: string; label: string }[];
}

export const filters = {
  watches: watchFilters,
  new: [] as FilterProps[],
  men: [] as FilterProps[],
  women: [] as FilterProps[],
  hats: [] as FilterProps[],
};
