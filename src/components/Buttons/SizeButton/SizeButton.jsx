import React, { useState } from 'react';
import './SizeButton.css'

const ShoeSizeButtons = () => {

  const sizes = ["39", "40", "41", "42", "43"];

  const [selectedSize, setSelectedSize] = useState("");

  const handleSizeSelect = (size) => {
    setSelectedSize(size);
  };

  return (
    <div>
      <div className='sizeButton'>
        {sizes.map((size) => (
          <button
            key={size}
            style={{ margin: "2px" }}
            onClick={() => handleSizeSelect(size)}
            className={selectedSize === size ? "selected" : ""}
          >
            {size}
          </button>
        ))}
      </div>
      <div className='RespSizeShoes'>
        {selectedSize && <p>Tamanho selecionado: <span>{selectedSize}</span></p>}
      </div>
    </div>
  );
};

export default ShoeSizeButtons;
