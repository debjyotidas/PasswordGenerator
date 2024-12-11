import { useCallback, useEffect, useRef, useState } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [btnVal, setBtnVal] = useState("Copy");
  const [charAllowed, setCharAllowed] = useState(false);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const PwdRef = useRef("");

  const generatePassword = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "1234567890";
    if (charAllowed) str += "%$#@!&*()_+";
    for (let i = 0; i < length; i++) {
      const char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }
    setPassword(pass);
    setBtnVal("Copy");
  }, [length, charAllowed, numberAllowed, setPassword]);

  useEffect(() => {
    generatePassword();
  }, [length, charAllowed, numberAllowed, setPassword]);

  const copyPwdtoClipboard = () => {
    window.navigator.clipboard.writeText(password);
    setBtnVal("Copied!");
    setTimeout(() => {
      setBtnVal("Copy");
    }, 2000);
    PwdRef.current?.select();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <h1 className="text-3xl font-bold text-gray-300 mb-8">Password Generator</h1>
      <div className="bg-gray-800 rounded-lg p-6 shadow-lg w-[31rem]">
        {/* Password Input */}
        <div className="flex items-center mb-4">
          <input
            className="flex-grow bg-gray-700 text-orange-500 px-3 py-2 rounded-md border border-gray-600 focus:outline-none focus:ring focus:ring-orange-400"
            placeholder="Your Password"
            value={password}
            readOnly
            ref={PwdRef}
          />
          <button
            className="ml-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500 transition"
            onClick={copyPwdtoClipboard}
          >
            {btnVal}
          </button>
        </div>

        {/* Slider and Options */}
        <div className="flex items-center justify-between mb-4">
          {/* Range Slider */}
          <div className="flex items-center">
            <input
              type="range"
              min={6}
              max={30}
              value={length}
              onChange={(e) => setLength(e.target.value)}
              className="w-40"
            />
            <span className="ml-2 text-gray-300">Length: {length}</span>
          </div>

          {/* Options */}
          <div className="flex items-center space-x-4">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={charAllowed}
                onChange={() => setCharAllowed((prev) => !prev)}
                className="form-checkbox text-blue-600"
              />
              <span>Characters</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={numberAllowed}
                onChange={() => setNumberAllowed((prev) => !prev)}
                className="form-checkbox text-blue-600"
              />
              <span>Numbers</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
