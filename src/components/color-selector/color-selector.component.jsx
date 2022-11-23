const ColorSelector = ({options, callback, selectedColor}) => {
 
  return (
    <div className="color-selector-container">
      <p>Color: {selectedColor}</p>
      {options && options.map((color) => (
        <div 
          key={color.name}
          className={`selection-square ${(selectedColor === color.name)? 'selected' : ''}`}
          data-label={color.name}
          data-hexval="#fff"
          aria-label="Chalk White"
          style={{backgroundColor:color.hexval}}
          onClick={callback}
        />
      ))}
    </div>
  );
}

export default ColorSelector;