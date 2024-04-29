"use client"
import React, { useState } from 'react'
import { Transaction } from '../ui/types'
import UploadForm from '../ui/UploadForm'
import TransactionsTable from '../ui/TransactionsTable'

function Page() {
  const [message, setMessage] = useState("")
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [success, setSuccess] = useState(false)

  return (
    <div className='flex justify-center'>
      <div>
        <div className='text-4xl font-bold my-4'>Upload your credit card statement here</div>
        <UploadForm setMessage={setMessage} setTransactions={setTransactions} setSuccess={setSuccess} />
        <div className={success ? 'text-xl text-green-700' : 'text-xl text-red-700'}>{message}</div>
        <div hidden={!success}>
          <TransactionsTable transactions={transactions} />
          {/* <SendToGoogleSheetButton transactions={transactions} /> */}
          {/* <DownloadTransactionsSheetButton transactions={transactions} /> */}
        </div>
      </div>
    </div>
  )

}

export default Page