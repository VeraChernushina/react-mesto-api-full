import { Link } from 'react-router-dom';
import useForm from '../hooks/useForm';

const Register = ({ onRegister }) => {
  const { enteredValues, errors, handleChange } = useForm();

  const handleSubmit = (event) => {
    event.preventDefault();
    onRegister(enteredValues);
  };

  return (
    <>
      <div className="auth">
        <h2 className="auth__title">Регистрация</h2>
        <form className="form auth__form" onSubmit={handleSubmit}>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Email"
            autoComplete="email"
            value={enteredValues.email}
            onChange={handleChange}
            required
          />
          <span className="auth__error">{errors.email}</span>
          <input
            id="password"
            name="password"
            type="password"
            minLength="8"
            placeholder="Пароль"
            autoComplete="password"
            value={enteredValues.password}
            onChange={handleChange}
            required
          />
          <span className="auth__error">{errors.password}</span>
          <button type="submit">Зарегистрироваться</button>
        </form>
      </div>
      <Link to="/sign-in" className="auth__login-hint">
        Уже зарегистрированы? Войти
      </Link>
    </>
  );
};

export default Register;
