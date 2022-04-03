import React, { useContext, useEffect } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import PopupWithForm from './PopupWithForm';
import useForm from '../hooks/useForm';

const EditProfilePopup = ({ isOpen, onClose, onUpdateUser, onLoading }) => {
  const currentUser = useContext(CurrentUserContext);

  const { enteredValues, errors, handleChange, isFormValid, resetForm } =
    useForm();

  const handleSubmit = (event) => {
    event.preventDefault();

    onUpdateUser({
      name: enteredValues.name,
      about: enteredValues.about,
    });
  };

  useEffect(() => {
    currentUser ? resetForm(currentUser) : resetForm();
  }, [resetForm, isOpen, currentUser]);

  return (
    <PopupWithForm
      name="edit"
      title="Редактировать профиль"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <fieldset className="form__set">
        <input
          type="text"
          name="name"
          id="name"
          placeholder="Имя"
          minLength="2"
          maxLength="40"
          className="form__input"
          required
          value={enteredValues.name || ''}
          onChange={handleChange}
        />
        <span id="name-error" className="form__input-error">
          {errors.name}
        </span>
        <input
          type="text"
          name="about"
          id="about"
          placeholder="Вид деятельности"
          minLength="2"
          maxLength="200"
          className="form__input"
          required
          value={enteredValues.about || ''}
          onChange={handleChange}
        />
        <span id="job-error" className="form__input-error">
          {errors.about}
        </span>
        <button type="submit" className="form__submit" disabled={!isFormValid}>
          {onLoading ? 'Сохранение...' : 'Сохранить'}
        </button>
      </fieldset>
    </PopupWithForm>
  );
};

export default EditProfilePopup;
