
const Search =({filter, onChange})=>{

   
      
    
   
    return (
            <div>
                show names that contain  : 
            <input
                value={filter}
                onChange={onChange}/>
            </div>
    )
}
export default Search