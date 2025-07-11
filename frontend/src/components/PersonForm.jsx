/* eslint-disable react/prop-types */

const PersonForm = ({ newName, handleNameChange, newNumber, handleNumberChange, handleClick }) => (
    <form>
        <div>
            <label htmlFor="name">name: <input id="name" value={newName} onChange={handleNameChange} /></label>
        </div>
        <div>
            <label htmlFor="number">number: <input id="number" value={newNumber} onChange={handleNumberChange} /></label>
        </div>
        <div><button type="submit" onClick={handleClick}>add</button></div>
    </form>
)

export default PersonForm
