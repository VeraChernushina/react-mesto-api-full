const PopupWithForm = (props) => {
  return (
    <div className={`popup popup_type_${props.name} ${props.isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container">
        <button type="button" className="popup__close" onClick={props.onClose}></button>
        <h3 className="popup__title">{props.title}</h3>
        <form
          name={`${props.name}`}
          action="#"
          className="popup__form form"
          onSubmit={props.onSubmit}>
          {props.children}
        </form>
      </div>
    </div>
  );
};

export default PopupWithForm;
