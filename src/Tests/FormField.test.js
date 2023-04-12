import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import FormField from "../Components/forms/FormField";

// Renderizamos el componente con las props dadas y utilizamos las funciones getByLabelText y toHaveAttribute para asegurarnos de que el componente renderice correctamente una etiqueta y un campo de entrada con las props correctas.


describe('Componente FormField', () => {
    it('debe renderizar la etiqueta y el input con las props dadas', () => {
        const props = {
            fieldName: 'Nombre de usuario',
            id: 'username',
            handleChange: jest.fn(),
            errors: {},
            form: { username: '' },
            inputType: 'text'
        };
        
        render(<FormField {...props} />);
        const labelElement = screen.getByLabelText(props.fieldName);
        const inputElement = screen.getByLabelText(props.fieldName);
        
        expect(labelElement).toBeInTheDocument();
        expect(inputElement).toBeInTheDocument();
        expect(inputElement).toHaveAttribute('id', props.id);
        expect(inputElement).toHaveAttribute('name', props.id);
        expect(inputElement).toHaveAttribute('value', props.form[props.id]);
        expect(inputElement).toHaveAttribute('type', props.inputType);
    });
    

    // Simulamos un cambio en el valor del campo de entrada y comprobamos que la función handleChange pasada como prop fue llamado con el valor correcto.
    
    it('debe llamar a la función handleChange en el cambio del input', () => {
        const props = {
            fieldName: 
            'Nombre de usuario',
            id: 'username',
            handleChange: jest.fn(),
            errors: {},
            form: { username: '' },
            inputType: 'text'
        };
        
        render(<FormField {...props} />);
        const inputElement = screen.getByLabelText(props.fieldName);
        
        fireEvent.change(inputElement, { target: { value: 'testuser' } });
        expect(props.handleChange).toHaveBeenCalledTimes(1);
        expect(props.handleChange).toHaveBeenCalledWith(expect.any(Object));
    });
    

    // Renderizamos el componente con una prop de error y comprobamos que el mensaje de error se renderiza correctamente

    it('debe renderizar el mensaje de error cuando existe un error', () => {
        const props = {
            fieldName: 'Nombre de usuario',
            id: 'username',
            handleChange: jest.fn(),
            errors: { username: 'El nombre de usuario es requerido' },
            form: { username: '' },
            inputType: 'text'
        };
        
        render(<FormField {...props} />);
        const errorElement = screen.getByText(props.errors[props.id]);
        
        expect(errorElement).toBeInTheDocument();
    });
});

