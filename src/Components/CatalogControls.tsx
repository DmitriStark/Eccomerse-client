// CatalogControls.tsx
import  { useState } from "react";
import { sortCategories } from "./constants";

interface CatalogControlsProps {
  handleSearch: (str: string, sortCategory: string) => void;
}

export default function CatalogControls({ handleSearch }: CatalogControlsProps): JSX.Element {
  const [inputVal, setInputVal] = useState<string>('');
  const [selectedSortOption, setSelectedSortOption] = useState<string>('');

  const sortOptions = ['', ...sortCategories].map((c) => (
    <option key={c} value={c}>
      {c}
    </option>
  ));

  return (
    <div className="catalog-board-controls">
      <input
        type="text"
        value={inputVal}
        onChange={(e) => setInputVal(e.target.value)}
      />
      <select
        value={selectedSortOption}
        onChange={(e) => setSelectedSortOption(e.target.value)}
      >
        {sortOptions}
      </select>

      <button onClick={() => handleSearch(inputVal, selectedSortOption)}>
        search
      </button>
    </div>
  );
}
