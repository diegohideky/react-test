import { useState } from 'react';
import './App.css';
import { createUser } from './api';

const validators = {
  name: (value) => value.length > 3,
  email: (value) => /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/.test(value),
  age: (value) => value && value > 10 && value < 110
};

function App() {
  const [values, setValues] = useState({
    name: '',
    email: '',
    age: ''
  });

  const handleChange = (field) => (e) => {
    e.preventDefault();

    setValues({
      ...values,
      [field]: e.target.value
    })
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createUser(values)
  };

  const isInvalid = (field) => {
    const validate = validators[field];
    return !validate(values[field]);
  };

  const hasInvalidValueInForm = () => {
    return Object.keys(values).some(isInvalid);
  };

  return (
    <div className='my-form'>
      <p>Meu formulario</p>
      <form className='form' onSubmit={handleSubmit}>
        <input type="text" placeholder='Seu nome' onChange={handleChange('name')} />
        <input type="text" placeholder='Seu email' onChange={handleChange('email')} />
        <input type="number" placeholder='Sua idade' onChange={handleChange('age')} />
        <button data-testid="button" type='submit' disabled={hasInvalidValueInForm()}>Enviar</button>
      </form>
    </div>
  );
}

export default App;
