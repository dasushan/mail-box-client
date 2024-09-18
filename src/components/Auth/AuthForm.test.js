import { render, screen} from '@testing-library/react'
import '@testing-library/jest-dom'
import AuthForm from './AuthForm'

describe('AuthForm component', () => {
    test('renders Signup as a button', () => {
        // Arrange
        render(<AuthForm />)
        // Act
        // ...
        // Assert
        const queryElement = screen.getByRole('button');
        expect(queryElement).toBeInTheDocument();
    })
    test('renders SignUp as text', () => {
        // Arrange
        render(<AuthForm />)
        // Act
        // ...
        // Assert
        const queryElement = screen.getByText('SignUp')
        expect(queryElement).toBeInTheDocument();
    })
})