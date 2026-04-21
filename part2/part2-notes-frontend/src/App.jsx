
import { useState } from 'react'
import Search from './components/Search'
import Form  from './components/Form'
import People from './components/People'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])


  const [newName, setNewName] = useState('')
  const [newNumber,setNewNumber] = useState('')
  const [filter,setFilter]=useState('')


  const addPerson =(event) =>{

    event.preventDefault()
    const personObject = {
      name : newName,
      id : String(persons.length +1),
      Number : newNumber
    } 

    if (persons.some(person=> person.name===newName || person.Number===newNumber)){
          alert(`${newName} or ${newNumber} is already in the phonebook`)
    }else{

    setPersons(persons.concat(personObject))
    setNewName('')
    setNewNumber("")
    
    console.log("button clicked")
    console.log(persons)

    }
  }

   const personsToShow= filter?
    persons.filter(person=>person.name.toLowerCase().includes(filter.toLowerCase()))
    :persons
  

  
  const handleFilterChange=(event)=>{
    console.log(event.target.value)
    setFilter(event.target.value)
  }

   
  
  const handleNameChange =(event)=>{
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handeNumberChange =(event)=>{
    console.log(event.target.value)
    setNewNumber(event.target.value)

  }
  

  return (
    <div>
      <h2>Phonebook</h2>
      <Search 
      filter={filter}
      onChange ={handleFilterChange}
      />

      
      <h2>add a new</h2>
      <Form 
      newName={newName}
      newNumber={newNumber}
      handeNumberChange={handeNumberChange}
      handleNameChange={handleNameChange}
      addPerson={addPerson}/>

    
        
  
      <h2>Numbers</h2>
      <People 
      personsToShow={personsToShow}
      person={persons}
      />

      
    </div>
  )
}

export default App