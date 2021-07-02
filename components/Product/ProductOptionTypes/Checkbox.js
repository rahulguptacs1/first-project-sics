function Checkbox({ setOptionValue, optionValue }) {
  return (
    <input
      type="checkbox"
      checked={optionValue}
      onChange={(e) => {
        setOptionValue(!optionValue);
      }}
    />
  );
}

export default Checkbox;
