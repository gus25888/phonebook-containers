/* eslint-disable react/prop-types */

const Filter = ({ searchField, handleSearchFieldChange }) => (
    <div>filter shown with <input value={searchField} onChange={handleSearchFieldChange} /></div>
)

export default Filter