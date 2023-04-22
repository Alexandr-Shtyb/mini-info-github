const Select = ({valueSelect, setValueSelect}) => {
  const handleChange = (e) => {
    setValueSelect(+e.target.value);
  }

  return (
    <div className={"select"}>
      <select value={valueSelect} onChange={(e) => handleChange(e)}>
        <option value={10}>10</option>
        <option value={25}>25</option>
        <option value={50}>50</option>
      </select>
    </div>
  );
}

export {Select};
