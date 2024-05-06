import Link from "next/link";

export default function Home() {
  return (
    <>
      <h1>Welcome Page</h1>
      <Link href="/upload" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 m-4 rounded">Upload File</Link>
    </>
  )
}
