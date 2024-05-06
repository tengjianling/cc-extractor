"use client"
import React, { Suspense, useState } from 'react'
import { Transaction } from '../ui/types'
import UploadForm from '../ui/UploadForm'
import TransactionsTable from '../ui/TransactionsTable'
import Loading from '../ui/Loading'
import DownloadTransactionsSheetButton from '../ui/DownloadTransactionsSheetButton'

function Page() {
  const [message, setMessage] = useState("")
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [success, setSuccess] = useState(false)

  return (
    <div className='flex justify-center'>

      <div className='mt-4'>
        <div><span className='text-5xl font-bold my-4 text-blue-400'>Statement </span><span className='text-5xl font-bold my-4 text-blue-800'>Scanner</span></div>
        <div className='text-4xl font-bold my-4'>Upload your credit card statement here</div>
        <UploadForm setMessage={setMessage} setTransactions={setTransactions} setSuccess={setSuccess} />
        <div className={success ? 'text-xl text-green-700' : 'text-xl text-red-700'}>{message}</div>
        <div hidden={!success}>
          <TransactionsTable transactions={transactions} />
          {/* <SendToGoogleSheetButton transactions={transactions} /> */}
          <DownloadTransactionsSheetButton transactions={transactions} />
        </div>
      </div>
    </div>
  )

}

export default Page