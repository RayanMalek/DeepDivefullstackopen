
import { useState,useEffect } from 'react'
import Search from './components/Search'
import Form  from './components/Form'
import People from './components/People'
import axios from 'axios'

const App = () => {
 


  const [newName, setNewName] = useState('')
  const [newNumber,setNewNumber] = useState('')
  const [filter,setFilter]=useState('')
  const [persons,setPersons]=useState([])

  const hook=()=>{
    console.log("effect")
    axios
      .get('http://localhost:3001/persons')
      .then(response=>{
        console.log("promise fulfilled")
        console.log(response.data)
        setPersons(response.data)
      })
  }
  useEffect(hook,[])


  const addPerson =(event) =>{

    event.preventDefault()
    const personObject = {
      name : newName,
      id : String(persons.length +1),
      number : newNumber
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