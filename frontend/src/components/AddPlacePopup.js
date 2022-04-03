import { useEffect } from 'react';
import PopupWithForm from './PopupWithForm';
import useForm from '../hooks/useForm';

const AddPlacePopup = ({ isOpen, onClose, onAddPlace, onLoading }) => {
  const { enteredValues, errors, handleChange, isFormValid, resetForm } =
    useForm();

  const handleSubmit = (event) => {
    event.preventDefault();

    onAddPlace({
      name: enteredValues.title,
      link: enteredValues.link,
    });
  };

  useEffect(() => {
    resetForm();
  }, [resetForm, isOpen]);

  return (
    <PopupWithForm
      name="new-card"
      title="Новое место"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <fieldset className="form__set">
        <input
          type="text"
          name="title"
          id="title"
          placeholder="Название"
          minLength="2"
          maxLength="30"
          className="form__input"
          onChange={handleChange}
          required
          value={enteredValues.title || ''}
        />
        <span id="title-error" className="form__input-error">
          {errors.title}
        </span>
        <input
          type="url"
          name="link"
          id="link"
          placeholder="Ссылка на картинку"
          className="form__input"
          onChange={handleChange}
          required
          value={enteredValues.link || ''}
        />
        <span id="link-error" className="form__input-error">
          {errors.link}
        </span>
        <button type="submit" className="form__submit" disabled={!isFormValid}>
          {onLoading ? 'Сохранение...' : 'Создать'}
        </button>
      </fieldset>
    </PopupWithForm>
  );
};

export default AddPlacePopup;
