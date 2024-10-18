import { Link } from "react-router-dom"


const Error = () => {

  return (
  <main className=" flex flex-col" >
  <section className="grid min-h-full place-items-center px-6 py-24 sm:py-32 lg:px-8">
  <div className="text-center">
    <p className="text-2xl font-semibold text-indigo-600">404</p>
    <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">Page not found</h1>
    <p className="mt-6 text-base leading-7 text-gray-600">Sorry, we couldn’t find the page you’re looking for.</p>
  <div className="mt-10 flex items-center justify-center gap-x-6">
    <Link to={'/'} className="rounded-md  px-3.5 py-2.5 text-sm font-semibold  shadow-sm  hover:opacity-90">Go back home&rarr;</Link>
  </div>
  </div>
  </section>
  </main>
  )
}

export default Error