const People=({personsToShow,person})=>{


    return(
        <ul>
        {personsToShow.map(person =>
          <li key={person.id}>{person.name}-{person.number}</li>
        )}

         </ul>

)

}

export default People