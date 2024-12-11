import { TextField } from "@mui/material";
import { useCallback, useEffect, useRef, useState } from 'react';

function App() {
  
  const[length,setLength]=useState(8);
  const[btnVal, setBtnVal]=useState("Copy")
  const[charAllowed,SetcharAllowed]=useState(false);
  const[numberAllowed,SetnumberAllowed]=useState(false);
  const[password,SetPassword] = useState('');
  const PwdRef = useRef('')
  const generatePassword=useCallback(()=>{
    let pass="";
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(numberAllowed)str+="1234567890";
    if(charAllowed)str+="%$#@!&*()_+";
    for(let i=1;i<length;i++){
      const char= Math.ceil(Math.random()*str.length+1);
      console.log(char)
      pass += str.charAt(char)
    }
    SetPassword(pass)
    setBtnVal("Copy")
  },[length,charAllowed,numberAllowed])

  useEffect(()=>{
    generatePassword()
  },[length,charAllowed,numberAllowed])

  const copyPwdtoClipboard=()=>{
    window.navigator.clipboard.writeText(password);
    setBtnVal("Copied!")
    // After 5 seconds, reset the button text to "Copy"
  setTimeout(() => {
    setBtnVal("Copied");
  }, 3000);
    PwdRef.current.select();

  }

  return (
         <>
          <div className='bg-slate-900 text-white mx-auto w-full py-3 h-screen justify-center align-top'>
              <h1 className='text-center my-3 text-white'>Password Generator</h1>
              <div className='max-w-md shadow mx-auto overflow-hidden rounded-lg my-3 py-2'>

              <div className='flex my-2'>
                  <TextField className='bg-slate-200 text-orange-500 w-full' 
                  placeholder="Your Password"
                  id="fullWidth" 
                  InputProps={{
                  readOnly: true, style: { color: 'orange' }}} 
                  value ={password}
                  inputRef={PwdRef}

                  />
                  <button className='rounded-md bg-orange-500 px-3 shrink-0 py-0.5' 
                  onClick={copyPwdtoClipboard}>{btnVal}
                  </button>

              </div>
              <div className='flex items-center'>
                <input type='range' min={6} max={30} className='cursor-pointer' onChange={(e)=>setLength(e.target.value)}/>
                <label htmlFor='length'>length:{length}</label>
                <div className='mx-5'>
                  <input type='checkbox' defaultChecked={charAllowed} onChange={()=>SetcharAllowed((prev)=>!prev)}/>
                  <label htmlFor='characters'>Characters</label>
                </div>
                <div className='mx-5'>
                  <input type='checkbox' defaultChecked={numberAllowed} onChange={()=>SetnumberAllowed((prev)=>!prev)}/>
                  <label htmlFor='numbers'>Numbers</label>
                </div>
                
              </div>

              </div>
              

          </div>
         </>
  );
}

export default App;
