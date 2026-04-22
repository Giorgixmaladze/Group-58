const fetchData = async(username:string) =>{
    try{
        const res = await fetch(`https://api.github.com/users/${username}`)
        if(!res.ok){
            throw new Error("User not found")
        }
        const data = await res.json()
        return data
    }catch(error){
        console.log(error)
    }
}

export default fetchData