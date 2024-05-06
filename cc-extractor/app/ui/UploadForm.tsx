import React, { useState } from 'react'
import { Transaction } from './types'
import UploadField from './UploadField'
import DropdownField from './DropdownField'
import Loading from './Loading'

interface UploadFormProps {
  setMessage: React.Dispatch<React.SetStateAction<string>>,
  setTransactions: React.Dispatch<React.SetStateAction<Transaction[]>>,
  setSuccess: React.Dispatch<React.SetStateAction<boolean>>,
}

function UploadForm({ setMessage, setTransactions, setSuccess }: UploadFormProps) {
  const [statementFile, setStatementFile] = useState<File | null>(null)
  const [bank, setBank] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setStatementFile(e.target.files[0])
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    if (!statementFile) {
      alert("Please upload a file")
      setIsLoading(false)
      return
    }
    const formData = new FormData()
    formData.append('statement_file', statementFile)
    formData.append('bank', bank)
    fetch("https://cc-extractor-backend.onrender.com/api/extract_table", {
      method: "POST",
      body: formData
    })
      .then(async (response: Response) => {
        const responseJson = await response.json()
        if (responseJson.success) {
          setTransactions(responseJson.statement.transactions)
        }
        setMessage(responseJson.message)
        setSuccess(responseJson.success)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }
  return (
    <form action="" method='post' onSubmit={handleSubmit}>
      <UploadField handleFileUpload={handleFileUpload} />

      <label className='text-base text-gray-500 font-semibold mb-2 block'>Bank: </label>
      <select className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5' name="bank" id="bank" onChange={(e) => setBank(e.target.value)}>
        <option value="">Select bank</option>
        <option value="UOB">UOB</option>
        <option value="HSBC">HSBC</option>
      </select>
      <button type='submit' className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 m-4 rounded">Submit</button>
      {isLoading && <Loading />}
    </form>
  )
}

export default UploadForm