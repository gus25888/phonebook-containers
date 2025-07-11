import { useEffect, useState } from 'react'

import personsService from "./services/persons"

import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Notification from "./components/Notification";

const messageTypes = {
  SUCCESS: 'success',
  ERROR: 'error'
}

const App = () => {

  /* ****************** Hooks ****************** */
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchField, setSearchField] = useState('');
  const [messageText, setMessageText] = useState(null);
  const [messageType, setMessageType] = useState('');


  /* ****************** Functions ****************** */

  const getPersons = () => { personsService.readAll().then((personsList) => setPersons(personsList)) }

  useEffect(getPersons, []);

  const deletePerson = (id) => {
    const personToDelete = persons.find(person => person.id === id);
    if (!personToDelete) {
      showMessage(`the person was not found in server`, messageTypes.ERROR);
      return;
    }

    if (window.confirm(`Delete ${personToDelete.name}?`)) {
      personsService
        .deleteRegister(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== personToDelete.id))
        })
        .catch(error => {
          showMessage(`the person '${personToDelete.name}' was already deleted from server`, messageTypes.ERROR);
          console.error(error)
          setPersons(persons.filter(person => person.id !== personToDelete.id))
        })
    }
  }


  const updatePerson = (indexPerson, newNumber) => {

    const personFound = persons.at(indexPerson);

    if (personFound) {
      const personToUpdate = { ...personFound, number: newNumber }

      personsService
        .update(personToUpdate.id, personToUpdate)
        .then(returnedPerson => {

          const personsCopy = [...persons];
          personsCopy[indexPerson] = returnedPerson;

          setPersons(personsCopy);
          setNewName('')
          setNewNumber('')
          showMessage(`updated ${returnedPerson.name} number`, messageTypes.SUCCESS)
        }).catch(error => {
          showMessage(`${error.response.data.error}`, messageTypes.ERROR);
          console.error(error)
          setPersons([...persons]);
        })
    }
  }

  const createPerson = (newPerson) => {
    personsService
      .create(newPerson)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson));
        setNewName('')
        setNewNumber('')
        showMessage(`added ${returnedPerson.name}`, messageTypes.SUCCESS)
      }).catch(error => {
        showMessage(`${error.response.data.error}`, messageTypes.ERROR);
        console.error(error)
        setPersons([...persons]);
      })
  }

  const handleNameChange = (event) => setNewName(event.target.value);
  const handleNumberChange = (event) => setNewNumber(event.target.value);
  const handleSearchFieldChange = (event) => setSearchField(event.target.value);

  const personsToShow = persons.filter(person =>
    (searchField) ? person.name.toLowerCase().includes(searchField.toLowerCase()) : true
  )

  const handleClick = (event) => {
    event.preventDefault();

    if (!newName) {
      alert(`name not specified`)
      return;
    }

    if (!newNumber) {
      alert(`phone number not specified`)
      return;
    }

    const indexPersonFound = persons.map(person => person.name).indexOf(newName);
    // if a Person is found, asks for update their number.
    if (indexPersonFound > -1) {
      if (confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        updatePerson(indexPersonFound, newNumber);
      }
      return;
    }

    const newPerson = { name: newName, number: newNumber };
    createPerson(newPerson)
  }


  const showMessage = (message, type) => {
    setMessageText(message)
    setMessageType(type)
    setTimeout(() => setMessageText(null), 5000)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification text={messageText} type={messageType} />
      <Filter searchField={searchField} handleSearchFieldChange={handleSearchFieldChange} />
      <h3>add a new</h3>
      <PersonForm newName={newName} handleNameChange={handleNameChange}
        newNumber={newNumber} handleNumberChange={handleNumberChange}
        handleClick={handleClick} />
      <h3>Numbers</h3>
      <Persons persons={personsToShow} deletePerson={deletePerson} />
    </div>
  )
}

export default App