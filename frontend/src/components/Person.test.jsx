import { render, screen } from '@testing-library/react'
import Person from './Person'

test('renders content', () => {
  const newPerson = {
    id: '2e1e-32e32-32e2e23e',
    name: 'Federico Errazuriz',
    number: '151-456448'
  }

  render(<Person person={newPerson} />)

  const element = screen.getByText(newPerson.name + ' ' + newPerson.number)

  expect(element).toBeDefined()
})