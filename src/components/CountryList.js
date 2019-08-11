import React, { useState, useEffect } from "react";
import useCountries from "../hooks/useCountries";
import Message from "./Message";

function ListItem({ isSelected = false, onClick = () => {}, data = {} }) {
  let className = "CountryList__ListItem";
  if (isSelected) className += " CountryList__ListItem--selected";
  return (
    <button className={className} onClick={() => onClick(data.alpha3Code)}>
      {data.name}
    </button>
  );
}

function FilteredList({
  filter = "",
  items = [],
  selectedItem = null,
  onSelect = () => {},
}) {
  const filteredItems =
    filter !== ""
      ? items.filter(x => x.name.toLowerCase().includes(filter.toLowerCase()))
      : items;
  return (
    <div className="CountryList__FilteredList">
      {filteredItems.map(x => (
        <ListItem
          key={x.alpha3Code}
          isSelected={selectedItem === x.alpha3Code}
          data={x}
          onClick={onSelect}
        />
      ))}
    </div>
  );
}

function CountryList({ onSelect = () => {} }) {
  const [filter, setFilter] = useState("");
  const [selectedCode, setSelectedCode] = useState("");
  const [state, fetchCountries] = useCountries(["name", "alpha3Code"]);

  useEffect(() => {
    fetchCountries();
  }, []);

  const onSelectHandler = code => {
    setSelectedCode(code);
    onSelect(code);
  };

  return (
    <div className="CountryList">
      <input
        className="CountryList__input"
        type="search"
        placeholder="Filter..."
        value={filter}
        onChange={e => setFilter(e.target.value)}
      />

      {state.isFetching && (
        <Message type="info">Fetching... Please wait!</Message>
      )}

      {state.hasError && <Message type="error">Error: {state.error}</Message>}

      <FilteredList
        items={state.countries}
        filter={filter}
        selectedItem={selectedCode}
        onSelect={onSelectHandler}
      />
    </div>
  );
}

export default CountryList;
