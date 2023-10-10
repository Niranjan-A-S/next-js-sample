/* eslint-disable react/display-name */
"use client"
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, memo, useCallback, useState } from "react"

const Home = () => {

  const [inputValue, setInputValue] = useState<string>('');
  const { push } = useRouter();

  const onInputChange = useCallback(({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
    setInputValue(value);
  }, [])

  const onSubmit = useCallback((event: FormEvent) => {
    event.preventDefault();
    push(`/prediction/${inputValue}`)
  }, [inputValue, push])

  return <div className="min-h-screen flex items-center justify-center bg-gray-100">
    <div className="p-4 shadow-md bg-white rounded-md">
      <h1 className="text-2xl font-semibold mb-4 text-black">Enter your name</ h1>
      <form onSubmit={onSubmit} className="space-y-3">
        <input
          type="text"
          placeholder="Type your name..."
          value-={inputValue}
          onChange={onInputChange}
          className="w-full p-2 border border-gray-300 rounded text-black"
        />
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
        >Predict Data</button>
      </form>
    </div>
  </div>
}

export default memo(Home)