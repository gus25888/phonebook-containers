/* eslint-disable react/prop-types */

const Person = ({ person, deletePerson }) => (
  <p className={"person"} key={person.id}>
    {person.name} {person.number} <button onClick={() => deletePerson(person.id)}>delete</button>
  </p>
)

export default Person