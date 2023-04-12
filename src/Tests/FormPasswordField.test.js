import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FormPasswordField from "../Components/forms/FormPasswordField"

describe('Pruebas unitarias para el componente FormPasswordField', () => {
  it('Debe renderizar correctamente el componente', () => {
    render(
      <FormPasswordField 
        fieldName="Contraseña"
        id="password"
        handleChange={() => {}}
        errors={{}}
        form={{}}
        showPassword={false}
        handleShowPassword={() => {}}
      />
    );
    const labelElement = screen.getByLabelText('Contraseña');
    const inputElement = screen.getByRole('textbox', { name: 'Contraseña' });
    const errorElement = screen.queryByText('');
    const buttonElement = screen.queryByRole('button');
    
    expect(labelElement).toBeInTheDocument();
    expect(inputElement).toBeInTheDocument();
    expect(errorElement).not.toBeInTheDocument();
    expect(buttonElement).toBeInTheDocument();
  });

  it('Debe mostrar el error cuando hay un error en el input', () => {
    render(
      <FormPasswordField 
        fieldName="Contraseña"
        id="password"
        handleChange={() => {}}
        errors={{ password: 'Campo requerido' }}
        form={{ password: '' }}
        showPassword={false}
        handleShowPassword={() => {}}
      />
    );
    const errorElement = screen.getByText('Campo requerido');

    expect(errorElement).toBeInTheDocument();
  });

  it('Debe cambiar el valor del input al ser modificado', () => {
    const mockOnChange = jest.fn();
    render(
      <FormPasswordField 
        fieldName="Contraseña"
        id="password"
        handleChange={mockOnChange}
        errors={{}}
        form={{ password: '' }}
        showPassword={false}
        handleShowPassword={() => {}}
      />
    );
    const inputElement = screen.getByRole('textbox', { name: 'Contraseña' });

    expect(inputElement).toHaveValue('');

    const mockEvent = { target: { value: '123456' } };
    userEvent.type(inputElement, '123456');
    expect(mockOnChange).toHaveBeenCalledTimes(6);
    expect(mockOnChange).toHaveBeenCalledWith(mockEvent);
    expect(inputElement).toHaveValue('123456');
  });

  it("debería mostrar la contraseña en texto plano al hacer clic en el botón", () => {
    const mockHandleShowPassword = jest.fn();
    render(
      <FormPasswordField
        fieldName="Contraseña"
        id="password"
        handleChange={jest.fn()}
        errors={{}}
        form={{ password: "" }}
        showPassword={false}
        handleShowPassword={mockHandleShowPassword}
      />
    );
    const buttonElement = screen.getByRole("button");
    const inputElement = screen.getByLabelText("Contraseña");
  
    // Verificar que la contraseña esté oculta por defecto
    expect(inputElement).toHaveAttribute("type", "password");
  
    // Simular el clic en el botón
    userEvent.click(buttonElement);
  
    // Verificar que la función handleShowPassword se haya llamado
    expect(mockHandleShowPassword).toHaveBeenCalledTimes(1);
  
    // Verificar que la contraseña esté visible después del clic en el botón
    expect(inputElement).toHaveAttribute("type", "text");
  });
  
});
