import { useCallback, useState,useEffect ,useRef} from 'react'



function App() {
  const [length, setLength] = useState(8)
  const [numAllow, setNumAllow] = useState(false)
  const [charAllow, setCharAllow] = useState(false)
  const [password, setPassword] = useState("")
  const passwordRef = useRef(null)
  
  const getRandom=useCallback(()=>{
    let str ="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    let pass=""
    if(numAllow)str += "0123456789";
    if(charAllow)str += "!@#$%^&*-_~(){}?|\[]";
    for (let i = 0; i < length; i++) {
      
      let rand= Math.floor(Math.random()*str.length +1)
      
      pass += str.charAt(rand)
    }
    setPassword(pass)
    
  },[length,numAllow,charAllow,setPassword])

  const copyPassword = () => {
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password)
  }

  useEffect(()=>{
    getRandom()
  },[length,numAllow,charAllow])

  return (
    <>
    <div className=' flex justify-center items-center mt-20'>
       <div className='p-2 w-140 h-50  rounded-2xl'
       style={{backgroundColor:"red"}}>
        <h1 className='text-white text-xl p-2'>PASSWORD GENRATOR</h1>
        <input 
        type="text"
        className='outline-none w-full py-1 px-3 rounded-2xl'
        value={password}
        ref={passwordRef}
        readOnly
        style={{backgroundColor:"white"}}
        />
        <button className='rounded-2xl m-2 p-1 border-2'
        style={{backgroundColor:"white"}}
        onClick={copyPassword}
        >COPY</button>
       
       <div>
       <input 
        
        type="range" 
        min={3}
        max={20}
        value={length}
        onChange={(e)=>{setLength(e.target.value)}}
        />
        <label >length:{length}</label>
        
        
        <input type="checkbox" 
        className='mx-3'
        
        onChange={()=>{
          setNumAllow((num) => !num)
        }}
        defaultValue={numAllow}
        id='numInput'
        />
        <label htmlFor="numInput">Numbers</label>


        <input 
        type="checkbox" 
        className='mx-8'
        onChange={()=>{
          setCharAllow((perv) => !perv);
        }}
        defaultValue={charAllow}
        id='charInput'
        />
        <label htmlFor="charInput">Symbols</label>

       </div>
       
       
       </div>
       
      </div>
    </>
  )
}

export default App
