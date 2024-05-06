import React from 'react'
interface DropdownFieldProps {
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}
function DropdownField({ handleChange }: DropdownFieldProps) {
  return (
    <div className="relative font-[sans-serif] w-max mx-auto">
      <button type="button"
        className="px-6 py-2.5 border border-gray-300 text-gray-500 text-sm font-semibold outline-none bg-white hover:bg-gray-50 active:bg-white">
        Dropdown menu
        <svg xmlns="http://www.w3.org/2000/svg" className="w-3 fill-gray-500 inline ml-3" viewBox="0 0 24 24">
          <path fill-rule="evenodd"
            d="M11.99997 18.1669a2.38 2.38 0 0 1-1.68266-.69733l-9.52-9.52a2.38 2.38 0 1 1 3.36532-3.36532l7.83734 7.83734 7.83734-7.83734a2.38 2.38 0 1 1 3.36532 3.36532l-9.52 9.52a2.38 2.38 0 0 1-1.68266.69734z"
            clip-rule="evenodd" data-original="#000000" />
        </svg>
      </button>
      <ul className='absolute shadow-lg bg-white py-2 z-[1000] min-w-full w-max divide-y max-h-96 overflow-auto'>
        <li className='py-3 px-6 hover:bg-gray-100 text-black text-sm cursor-pointer'>Select Bank</li>
        <li className='py-3 px-6 hover:bg-gray-100 text-black text-sm cursor-pointer'>UOB</li>
        <li className='py-3 px-6 hover:bg-gray-100 text-black text-sm cursor-pointer'>HSBC</li>
      </ul>
    </div>
  )

}

export default DropdownField