
import { useState,useEffect } from 'react'
import Search from './components/Search'
import Form  from './components/Form'
import People from './components/People'
import personService from './services/persons'
import Notification from './components/Notification'
import './index.css'


const App = () => {
 


  const [newName, setNewName] = useState('')
  const [newNumber,setNewNumber] = useState('')
  const [filter,setFilter]=useState('')
  const [persons,setPersons]=useState([])
  const [Message , setMessage] = useState(null)
  const hook=()=>{
    personService
    .getAll()
    .then(initialPersons=>{
    setPersons(initialPersons)
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

   

    personService
    .create(personObject)
    .then(returnedPerson=>{
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber("")
         setMessage(`Added ${returnedPerson.name}`)
        setTimeout(() => setMessage(null), 5000)
    })
    
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
  const handleDelete=(person)=>{
    const ok = window.confirm("Are you sure?")
  if (ok) { personService
    .remove(person.id)
    .then(()=>{
      setPersons(persons.filter(p=>p.id !== person.id))
    })

  }

  }
  

  return (
    <div>   
      <h2>Phonebook</h2>
      <Notification message={Message} />

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
      handleDelete={handleDelete}
      personsToShow={personsToShow}
      person={persons}
      />

      
    </div>
  )
}

export default App