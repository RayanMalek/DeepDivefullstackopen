const People=({personsToShow,person,handleDelete})=>{


    return(
        <ul>
        {personsToShow.map(person =>
          <li key={person.id}>
            {person.name}-{person.number}
            <button onClick={() => handleDelete(person)}
>Delete</button>
            </li>
        )}

         </ul>

)

}

export default People