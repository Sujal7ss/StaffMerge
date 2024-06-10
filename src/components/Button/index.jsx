import React from 'react';

export default function Button({children, onSelect, style, img, className}){
    return(
        <button onClick={onSelect} className={`border-2 hover:bg-sky-300 rounded-full  h-10  ${style} ${className}`}>
            {children}
            {img && <img src={img} />}
        </button>
          
    );
}