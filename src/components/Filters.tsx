import React, { useEffect, useState } from "react";
import { Slider } from "./Slider";

const SliderStyles = {
  padding: '2rem',
  borderBottom: '1px solid red',
};

export type FilterProps = {
  minSpending: number,
  maxSpending: number,
  updateFilter: (value: number) => void,
};

export function Filters({minSpending, maxSpending, updateFilter}: FilterProps) {
  const [spendFilter, setSpendFilter] = useState<number>(0);

  useEffect(() => {
    setSpendFilter(maxSpending);
  }, [maxSpending]);

  useEffect(() => {
    updateFilter(spendFilter);
  }, [spendFilter, updateFilter]);

  return (
    <div className="slider" style={ SliderStyles }>
      <h3>Filters</h3>
      <Slider label="Spending:" min={minSpending} max={maxSpending} value={spendFilter} updateValue={setSpendFilter} />
    </div>
  );
}