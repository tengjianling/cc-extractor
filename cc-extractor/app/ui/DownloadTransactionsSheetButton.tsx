import React from 'react'
import { Transaction } from './types'

interface DownloadTransactionsSheetButtonProps {
  transactions: Transaction[]
}

function DownloadTransactionsSheetButton({ transactions }: DownloadTransactionsSheetButtonProps) {
  const handleClick = async () => {

    try {
      const response = await fetch("https://cc-extractor-backend.onrender.com/api/download_transactions_sheet", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(transactions)
      })
      const url = window.URL.createObjectURL(await response.blob());
      const a = document.createElement('a');
      a.href = url;
      a.download = 'transactions.xlsx';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      a.remove();
    } catch (error) {
      console.error('Error downloading file:', error)
    }
  }
  return (
    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 m-4 rounded" onClick={handleClick}>Download</button>
  )
}

export default DownloadTransactionsSheetButton