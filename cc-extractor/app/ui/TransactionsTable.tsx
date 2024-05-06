import React from 'react'
import { Transaction } from './types'

interface TransactionsTableProps {
  transactions: Transaction[]
}

function TransactionsTable({ transactions }: TransactionsTableProps) {
  return (
    <table className='border-collapse mb-10'>
      <thead>
        <tr>
          <th className='border p-3'>Description of Transaction</th>
          <th className='border p-3'>Post Date</th>
          <th className='border p-3'>Transaction Amount</th>
          <th className='border p-3'>Transaction Date</th>
        </tr>
      </thead>
      <tbody>
        {transactions.map((transaction, index) => (
          <tr key={index} className='hover:bg-blue-100'>
            <td className='border p-1'>{transaction.description_of_transaction}</td>
            <td className='border p-1'>{transaction.post_date}</td>
            <td className='border p-1'>{transaction.transaction_amount}</td>
            <td className='border p-1'>{transaction.transaction_date}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default TransactionsTable