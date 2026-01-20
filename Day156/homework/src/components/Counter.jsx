const Counter = ({func,count}) =>{
    return(
        <>
            <button onClick={func}>+1</button>
            <p>{count}</p>
        </>
    )
}

export default Counter