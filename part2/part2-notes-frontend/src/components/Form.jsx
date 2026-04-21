const Form=({newName,handleNameChange,newNumber,handeNumberChange,addPerson})=>{
    return(
        <form onSubmit={addPerson}>
            <div>
          name: <input 
          value={newName}
          onChange={handleNameChange}/>
        </div>
        <div>
          number :<input
          value={newNumber}
          onChange={handeNumberChange}/>
          </div>
        <div>
          <button type="submit">add</button>
        </div>


        </form>
        

        
        
    )
}
export default Form