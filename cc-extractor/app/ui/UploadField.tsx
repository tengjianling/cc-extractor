import React from 'react'

interface UploadFieldProps {
  handleFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void
}

function UploadField({ handleFileUpload }: UploadFieldProps) {
  return (
    <>
      <div className="font-[sans-serif]">
        <label className="text-base text-gray-500 font-semibold mb-2 block">Upload file</label>
        <input type="file"
          className="w-full text-gray-400 font-semibold text-sm bg-white border file:cursor-pointer cursor-pointer file:border-0 file:py-3 file:px-4 file:mr-4 file:bg-gray-100 file:hover:bg-gray-200 file:text-gray-500 rounded" onChange={handleFileUpload} />

        <p className="text-xs text-gray-400 mt-2">Only PDF Allowed.</p>
      </div>
    </>
  )
}

export default UploadField