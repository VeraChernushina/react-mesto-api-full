import { useRef } from "react";
import PopupWithForm from "./PopupWithForm";

const EditAvatarPopup = ({ isOpen, onClose, onUpdateAvatar, onLoading }) => {
    const avatarRef = useRef();

    function handleSubmit(e) {
        e.preventDefault();
      
        onUpdateAvatar({
          avatar: avatarRef.current.value,
        });
      } 

    return (
        <PopupWithForm
          name="avatar"
          title="Обновить аватар"
          isOpen={isOpen}
          onClose={onClose}
          onSubmit={handleSubmit}
        >
          <fieldset className="form__set">
            <input
              type="url"
              name="avatar"
              id="avatar"
              placeholder="Ссылка на картинку"
              className="form__input"
              required
              ref={avatarRef}
            />
            <span id="avatar-error" className="form__input-error"></span>
            <button type="submit" className="form__submit">
            {onLoading ? "Сохранение..." : "Сохранить"}
            </button>
          </fieldset>
        </PopupWithForm>
    )
};

export default EditAvatarPopup;