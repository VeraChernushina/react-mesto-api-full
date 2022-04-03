import React from "react";

const ImagePopup = ({ card, onClose }) => {
  return (
    <div className={`popup popup_type_image ${card.link ? "popup_opened" : ""}`}>
      <div className="popup__img-container">
        <button type="button" className="popup__close" onClick={onClose}></button>
        <figure className="popup__figure">
          <img className="popup__img" src={card.link} alt={card.name}/>
          <figcaption className="popup__caption">{card.name}</figcaption>
        </figure>
      </div>
    </div>
  );
};

export default ImagePopup;
