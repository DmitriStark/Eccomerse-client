// CatalogControls.tsx
import{ useState } from "react";
import { sortCategories } from "./constants";

interface CatalogControlsProps {
  handleSearch: (str: string, sortCategory: 'name' | 'price') => void;
}

export default function CatalogControls({ handleSearch }: CatalogControlsProps): JSX.Element {
  const [inputVal, setInputVal] = useState<string>('');
  const [selectedSortOption, setSelectedSortOption] = useState<'name' | 'price' | ''>('');

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
        onChange={(e) => setSelectedSortOption(e.target.value as 'name' | 'price' | '')}
      >
        {sortOptions}
      </select>

      <button onClick={() => {
        // Ensure that selectedSortOption is not an empty string before calling handleSearch
        if (selectedSortOption !== '') {
          handleSearch(inputVal, selectedSortOption);
        }
      }}>
        search
      </button>
    </div>
  );
}
