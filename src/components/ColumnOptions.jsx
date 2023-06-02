import React from 'react';

export default function ColumnOptions(props) {
  const { onChange, value, state, filters } = props;
  return (
    <div>
    {/* <select
    data-testid="column-filter"
    className="input-elements"
    value={ state.column }
    onChange={ ({ target }) => setFilterState({
        ...state, column: target.value }) }
    >
    {
        filters
        .filter(checkColumns)
        .map((filter) => (
            <option key={ filter } value={ filter }>{filter}</option>
        ))
    }
    </select> */}
    </div>
  );
}
