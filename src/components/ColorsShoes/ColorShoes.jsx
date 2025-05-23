import React, { useState } from "react";
import './ColorShoes.css'

export default function Stars() {
    const [selectedColor, setSelectedColor] = useState(null); 
    const colorShoes = ["#6FEEFF", "#FF6969", "#5E5E5E", "#6D70B7"]; 

    const handleColorSelection = (color) => {
        setSelectedColor(color === selectedColor ? null : color); 
    };

    return (
        <div className="containerCS">
            {colorShoes.map((color, index) => (
                <div className="infoCircle"
                    key={index}
                    style={{
                        backgroundColor: color,
                        border: selectedColor === color ? "2px solid #C92071" : "none"
                    }}
                    onClick={() => handleColorSelection(color)}
                >
                </div>
            ))}
        </div>
    );
}
