import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import * as api from './api';

test('renders form', () => {
  render(<App />);
  const form = screen.getByText(/Meu formulario/i);
  expect(form).toBeInTheDocument();
});

test('button should be enabled when fields are valid', () => {
  render(<App />);
  const form = screen.getByText(/Meu formulario/i);
  expect(form).toBeInTheDocument();

  const button = screen.getByTestId('button');
  expect(button).toBeInTheDocument();
  expect(button).toBeDisabled();

  const name = screen.getByPlaceholderText('Seu nome');
  expect(name).toBeInTheDocument();
  fireEvent.change(name, { target: { value: 'Thiago' }});

  const email = screen.getByPlaceholderText('Seu email');
  expect(email).toBeInTheDocument();
  fireEvent.change(email, { target: { value: 'thiago@gmail.com' }});

  const age = screen.getByPlaceholderText('Sua idade');
  expect(age).toBeInTheDocument();
  fireEvent.change(age, { target: { value: 34 }});

  expect(button).toBeEnabled();
});

test('button should be disabled when name is invalid', () => {
  render(<App />);
  const form = screen.getByText(/Meu formulario/i);
  expect(form).toBeInTheDocument();

  const button = screen.getByTestId('button');
  expect(button).toBeInTheDocument();
  expect(button).toBeDisabled();

  const name = screen.getByPlaceholderText('Seu nome');
  expect(name).toBeInTheDocument();
  fireEvent.change(name, { target: { value: 'Thi' }});

  const email = screen.getByPlaceholderText('Seu email');
  expect(email).toBeInTheDocument();
  fireEvent.change(email, { target: { value: 'thiago@gmail.com' }});

  const age = screen.getByPlaceholderText('Sua idade');
  expect(age).toBeInTheDocument();
  fireEvent.change(age, { target: { value: 34 }});

  expect(button).toBeDisabled();
});

test('button should be disabled when email is invalid', () => {
  render(<App />);
  const form = screen.getByText(/Meu formulario/i);
  expect(form).toBeInTheDocument();

  const button = screen.getByTestId('button');
  expect(button).toBeInTheDocument();
  expect(button).toBeDisabled();

  const name = screen.getByPlaceholderText('Seu nome');
  expect(name).toBeInTheDocument();
  fireEvent.change(name, { target: { value: 'Thiago' }});

  const email = screen.getByPlaceholderText('Seu email');
  expect(email).toBeInTheDocument();
  fireEvent.change(email, { target: { value: 'thiagogmail.com' }});

  const age = screen.getByPlaceholderText('Sua idade');
  expect(age).toBeInTheDocument();
  fireEvent.change(age, { target: { value: 34 }});

  expect(button).toBeDisabled();
});

test.each([8, 120])('button should be disabled when age is invalid: %s', (value) => {
  render(<App />);
  const form = screen.getByText(/Meu formulario/i);
  expect(form).toBeInTheDocument();

  const button = screen.getByTestId('button');
  expect(button).toBeInTheDocument();
  expect(button).toBeDisabled();

  const name = screen.getByPlaceholderText('Seu nome');
  expect(name).toBeInTheDocument();
  fireEvent.change(name, { target: { value: 'Thiago' }});

  const email = screen.getByPlaceholderText('Seu email');
  expect(email).toBeInTheDocument();
  fireEvent.change(email, { target: { value: 'thiago@gmail.com' }});

  const age = screen.getByPlaceholderText('Sua idade');
  expect(age).toBeInTheDocument();
  fireEvent.change(age, { target: { value }});

  expect(button).toBeDisabled();
});

test('should call api when click on button', () => {
  const spyOnCreateUser = jest.spyOn(api, 'createUser');

  render(<App />);
  const form = screen.getByText(/Meu formulario/i);
  expect(form).toBeInTheDocument();

  const button = screen.getByTestId('button');
  expect(button).toBeInTheDocument();
  expect(button).toBeDisabled();

  const name = screen.getByPlaceholderText('Seu nome');
  expect(name).toBeInTheDocument();
  fireEvent.change(name, { target: { value: 'Thiago' }});

  const email = screen.getByPlaceholderText('Seu email');
  expect(email).toBeInTheDocument();
  fireEvent.change(email, { target: { value: 'thiago@gmail.com' }});

  const age = screen.getByPlaceholderText('Sua idade');
  expect(age).toBeInTheDocument();
  fireEvent.change(age, { target: { value: 34 }});

  expect(button).toBeEnabled();

  fireEvent.submit(button);

  expect(spyOnCreateUser).toHaveBeenCalledTimes(1);
  expect(spyOnCreateUser).toHaveBeenCalledWith({
    name: 'Thiago',
    email: 'thiago@gmail.com',
    age: '34'
  })
});
