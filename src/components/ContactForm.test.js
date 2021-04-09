import React from 'react';
import {queryByLabelText, queryByText, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ContactForm from './ContactForm';

test('renders without errors', ()=>{
    render(<ContactForm />)
});

test('renders the contact form header', ()=> {
    // Arrange
    render(<ContactForm />);

    // Act
    const header = screen.queryByText(/contact form/i)
    
    // Assert
    expect(header).toBeInTheDocument()
    expect(header).toBeTruthy()
    expect(header).toHaveTextContent(/contact form/i)
});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
    // Arrange
    render(<ContactForm />)

    // Act
        // we need to get the first input
        // we need to get the error message
        // assign user event to type in input and fail to provide at least five chars
        // then we expect there to be an error message
    const firstName = 'Moe'
    const firstNameInput = screen.getByLabelText(/first name/i)
    
    userEvent.type(firstNameInput, firstName)

    await waitFor(() => {
        const fNameError = screen.queryByText('Error: firstName must have at least 5 characters.')
        expect(fNameError).toBeInTheDocument()
    })
    
});

test('renders THREE error messages if user enters no values into any fields.', async () => {
    render(<ContactForm />)

    const button = screen.getByRole('button')
    userEvent.click(button)

    await waitFor(() => {
        const firstNameError = screen.queryByText('Error: firstName must have at least 5 characters.')
        const lastNameError = screen.queryByText('Error: lastName is a required field.')
        const emailError = screen.queryByText('Error: email must be a valid email address.')

        expect(firstNameError).toBeInTheDocument()
        expect(lastNameError).toBeInTheDocument()
        expect(emailError).toBeInTheDocument()
    })
});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
    render(<ContactForm />)

    // get firstName and lastName inputs along with submit button
    const firstName = screen.queryByLabelText(/first name/i)
    const lastName = screen.queryByLabelText(/last name/i)
    const button = screen.getByRole('button')

    // user events
    userEvent.type(firstName, 'Bucky')
    userEvent.type(lastName, 'Nahershalahasbaz')
    userEvent.click(button)
    
    await waitFor (() => {
        const emailError = screen.queryByText('Error: email must be a valid email address.')
        expect(emailError).toBeInTheDocument()
    })
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
    render(<ContactForm />)

    const emailInput = screen.queryByLabelText(/Email/i)
    userEvent.type(emailInput, 'asdfasd')

    await waitFor (() => {
        const emailError = screen.queryByText('Error: email must be a valid email address.')
        expect(emailError).toBeInTheDocument()
    })

});

// test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
    
// });

// test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
    
// });

// test('renders all fields text when all fields are submitted.', async () => {
    
// });