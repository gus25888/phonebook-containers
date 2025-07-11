/* eslint-disable react/prop-types */

const Persons = ({ persons, deletePerson }) => (
    <>
        {persons.map((person) =>
            <p key={person.id}>
                {person.name} {person.number} <button onClick={() => deletePerson(person.id)}>delete</button>
            </p>
        )}
    </>
)

export default Persons