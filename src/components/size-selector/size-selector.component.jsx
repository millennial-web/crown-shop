const SizeSelector = ({options, callback, selectedSize}) => {

  return (
    <div className="size-selector-container">
      <p>Size: {selectedSize}</p>
      {options && options.map((size) => (
        <div 
          key={size.name}
          className={`selection-square ${(selectedSize === size.longName)? 'selected' : ''}`}
          data-label={size.name}
          data-value={size.longName}
          aria-label="Chalk White"
          onClick={callback}
        >
        <div className="tag-circle"></div>
          {size.name}
        </div>
      ))}
    </div>
  );
}

export default SizeSelector;