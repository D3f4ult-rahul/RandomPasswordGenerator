import React, { useCallback, useState, useEffect, useRef } from 'react'

function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState("")
  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUWXYZabcdefghijklmnopqrstuwxyz"
    if (numberAllowed) str += "0123456789"
    if (charAllowed) str += "!@#$%^&*()_~`=-[]{}"

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length)
      pass += str.charAt(char)
    }
    setPassword(pass)
  }, [length, numberAllowed, charAllowed])

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 100);
    window.navigator.clipboard.writeText(password)
  }, [password])  

  useEffect(() => {
    passwordGenerator()
  }, [length, numberAllowed, charAllowed, passwordGenerator])

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-black to-gray-900 text-white px-4">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-6 border border-white/20">
        
        <h1 className="text-3xl font-extrabold text-center mb-6 bg-gradient-to-r from-pink-500 via-yellow-400 to-green-400 bg-clip-text text-transparent">
          ⚡Password Generator⚡
        </h1>

        <div className="flex shadow-lg rounded-xl overflow-hidden mb-6 border border-white/30">
          <input
            type="text"
            value={password}
            className="w-full py-2 px-4 bg-black/40 text-pink-300 font-mono tracking-wider outline-none"
            placeholder="password"
            readOnly
            ref={passwordRef}
          />
          <button 
            onClick={copyPasswordToClipboard} 
            className="bg-gradient-to-r from-pink-500 to-yellow-400 text-black px-4 font-semibold hover:scale-105 transition-transform">
            Copy
          </button>
        </div>

        <div className="space-y-4">
          {/* Length */}
          <div>
            <label className="block mb-1 font-semibold">Length: {length}</label>
            <input 
              type="range"
              min={6}
              max={30}
              value={length}
              className="w-full cursor-pointer accent-pink-500"
              onChange={(e) => setLength(e.target.value)}
            /> 
          </div>

          <div className="flex items-center gap-2">
            <input 
              type="checkbox"
              checked={numberAllowed}
              id="numberInput"
              onChange={() => setNumberAllowed(prev => !prev)}
              className="accent-yellow-400 w-4 h-4"
            />
            <label htmlFor="numberInput" className="cursor-pointer">Include Numbers</label>
          </div>

          <div className="flex items-center gap-2">
            <input 
              type="checkbox"
              checked={charAllowed}
              id="characterInput"
              onChange={() => setCharAllowed(prev => !prev)}
              className="accent-green-400 w-4 h-4"
            />
            <label htmlFor="characterInput" className="cursor-pointer">Include Symbols</label>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
