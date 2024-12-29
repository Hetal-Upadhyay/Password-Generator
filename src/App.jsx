import { useState, useCallback, useEffect } from "react";


function App() {

  const [length, setlength] = useState(8);
  const [numAllowed, setnumAllowed] = useState(false);
  const [charAllowed, setcharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const passwordGenrator = // useCallback(() => {
    () => {
    
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numAllowed) {
      str += "0123456789";
    }
    if (charAllowed) {
      str += "!@#$%^&*()-_=+\|[]{};:/?.>";
    }
    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }
   
    setPassword(pass);
    //console.log("Password created with callback");
    console.log("Password created without callback");
  } //, [length,numAllowed,charAllowed])

  const copytoClipboard =  useCallback(() => {
   // () => {
  
    window.navigator.clipboard.writeText(password);    
    console.log("Text has been copied");       
  } , [password]);

    useEffect(() => {
      passwordGenrator()
    }, [length, numAllowed, charAllowed])

return (
 <>
    <div className="w-full max-w-lg mx-auto shadow-lg rounded-2xl px-6 py-8 my-12 bg-gradient-to-br from-purple-700 to-indigo-900 text-gray-50">
      <h1 className="text-3xl font-semibold text-center mb-6">Password Generator</h1>

      <div className="flex shadow-inner rounded-xl overflow-hidden mb-6">
        <input
          type="text"
          value={password}
          className="outline-none w-full py-3 px-4 text-lg bg-gray-900 text-white border-none"
          placeholder="Your password"
          readOnly
        />
        <button
           onClick={copytoClipboard}
          className="bg-green-600 hover:bg-green-700 text-white px-5 py-3 font-semibold transition duration-300"
        >
          Copy
        </button>
      </div>

      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <label className="font-medium text-lg">Password Length: {length}</label>
          <input
            type="range"
            min={6}
            max={25}
            value={length}
            className="cursor-pointer w-2/3"
            onChange={(e) => {
              setlength(e.target.value);
            }}
          />
        </div>

        <div className="flex items-center gap-x-4 mb-4">
          <input
            type="checkbox"
            id="numberInput"
            checked={numAllowed}
            className="cursor-pointer h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
            onChange={() => {
              setnumAllowed((prev) => !prev);
            }}
          />
          <label htmlFor="numberInput" className="text-md">Include Numbers</label>
        </div>

        <div className="flex items-center gap-x-4">
          <input
            type="checkbox"
            id="characterInput"
            checked={charAllowed}
            className="cursor-pointer h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
            onChange={() => {
              setcharAllowed((prev) => !prev);
            }}
          />
          <label htmlFor="characterInput" className="text-md">Include Special Characters</label>
        </div>
           
      </div>
          
    </div>
  </>
);
}
export default App;
