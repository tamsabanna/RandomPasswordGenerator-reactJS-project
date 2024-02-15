import { useCallback, useEffect, useRef, useState } from 'react'

function App() {
  const [length, setLength] = useState(8)
  const [allowedNumbers, setAllowedNumbers] = useState(false)
  const [allowedCharacters, setAllowedCharacters] = useState(false)
  const [password, setPassword] = useState("")
  const passwordRef = useRef(null)

  const passwordGenerator = useCallback( ()=>{
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (allowedNumbers) str += '1234567890'
    if (allowedCharacters) str += "!@#$%^&*()_-+={}[];:/?>.<,`~"

    for (let i = 1; i <= length; i++) {
      const char = Math.floor(Math.random() * str.length + 1)

      pass += str.charAt(char)
      
    }

    setPassword(pass)
  }, [length, allowedNumbers, allowedCharacters, setPassword])

  const copyToClipboard = useCallback(()=>{
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 999);
    window.navigator.clipboard.writeText(password)
    setPassword("");
    alert('Your Password is copied to clipboard press window + v to check')
  }, [password, setPassword])

  useEffect(()=>{
    passwordGenerator()
  }, [passwordGenerator, length, allowedNumbers, allowedCharacters])
  


  return (
    <><div className='w-full h-screen flex flex-col items-center bg-slate-800 p-4'>
    <h1 className='text-center w-full text-3xl rounded-md bg-orange-500 mb-4'>Password Generator</h1>
  
    <div className='flex flex-col items-center bg-black w-4/5 rounded-md py-4 px-2'>
      <div className='flex w-full'>
        <input
          className='w-full rounded-l-md outline-none py-1 px-1 text-xl text-black'
          readOnly
          placeholder='Password' 
          type='text'
          value={password}
          ref={passwordRef}
        />
        <button onClick={copyToClipboard} className='bg-orange-500 rounded-r-md text-xl py-1 px-1 font-medium'>Copy</button>
      </div>

      <div className='flex flex-col items-start w-full px-4 mt-4'>
        <div className='mb-4 w-full'>
          <input type="range" min={6} max={36} onChange={(e)=>{setLength(e.target.value)}} value={length} className='text-black  cursor-pointer w-1/2' />
          <label className='text-white ml-1'>Length: {length}</label>
        </div>
        <div className="flex mb-4 items-center justify-end">
          <input defaultChecked={allowedNumbers} id='numberInput' onChange={()=>{
            setAllowedNumbers((prev)=>!prev)
          }} type="checkbox" className='w-6 h-6' />
          <label htmlFor='numberInput' className='text-white ml-2'>Numbers</label>
        </div>
        <div className="flex items-center justify-end">
          <input defaultChecked={allowedCharacters} id='characterInput' onChange={()=>{
            setAllowedCharacters((prev)=>!prev)
          }}  type="checkbox" className='w-6 h-6' />
          <label htmlFor='characterInput' className='text-white ml-2'>Special Characters</label>
        </div>
      </div>
    </div>
    <button className='bg-orange-500 px-6 mt-4 rounded-3xl font-medium text-xl  py-2' onClick={passwordGenerator}>Generate</button>
  </div>
  
    </>
  )
}

export default App
