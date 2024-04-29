import React, { useState } from 'react'
import { Transaction } from './types'

interface UploadFormProps {
  setMessage: React.Dispatch<React.SetStateAction<string>>,
  setTransactions: React.Dispatch<React.SetStateAction<Transaction[]>>,
  setSuccess: React.Dispatch<React.SetStateAction<boolean>>,
}

function UploadForm({ setMessage, setTransactions, setSuccess }: UploadFormProps) {
  const [statementFile, setStatementFile] = useState<File | null>(null)
  const [bank, setBank] = useState("")

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setStatementFile(e.target.files[0])
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!statementFile) {
      alert("Please upload a file")
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
  }
  return (
    <form action="" method='post' onSubmit={handleSubmit}>
      <label>Upload file: </label>
      <input className='m-2' type="file" onChange={handleFileUpload} />
      <label>Bank: </label>
      <select className='border' name="bank" id="bank" onChange={(e) => setBank(e.target.value)}>
        <option value="">Select bank</option>
        <option value="UOB">UOB</option>
        <option value="HSBC">HSBC</option>
      </select>
      <button type='submit' className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 m-4 rounded">Submit</button>
    </form>
  )
}

export default UploadForm