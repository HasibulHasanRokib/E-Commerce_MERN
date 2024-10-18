import { useContext } from "react"
import { AuthContext } from "../../context/authContext"


const Profile = () => {
  const {user} = useContext(AuthContext)


  return (
    <div>
      <div className="px-10 rounded-sm max-md:pb-32">
        <div className="px-4 sm:px-0">
          <h3 className="text-2xl font-semibold leading-7 text-gray-900 ">User Information</h3>
          <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">Personal details</p>
        </div>
        <div className="mt-6 border-t border-gray-200">
          <dl className="">
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">Full name</dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 capitalize">: {user?.name}</dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">Address</dt>
              <dd className="capitalize mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">: {user?.address} </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">Email address</dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">: {user?.email} </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">Gender</dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 capitalize">: {user?.gender} </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 mb-10">
              <dt className="text-sm font-medium leading-6 text-gray-900">Phone</dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">: {user?.phone}</dd>
            </div>
             </dl>
           </div>
         </div>
    </div>
  )
}

export default Profile
