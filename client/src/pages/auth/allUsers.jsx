import {useQuery} from '@tanstack/react-query'
import { fetchUsers } from '../../api/authApi'
const AllUsers = () => {

const{data,isLoading,isError,error}=useQuery({
    queryKey:['all-users'],
    queryFn:fetchUsers
})

  return (
    <>
      <div className="flex justify-between items-center">
        <h2 className="font-bold  text-2xl">All Users</h2>
      </div>
      

      <table className="table-fixed">
        <thead >
            <tr className="bg-slate-100">
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Gender</th>
                <th>Phone No.</th>
                <th>Address</th>
                <th>Status</th>
            </tr>
        </thead>
        <tbody>
          {data?.length===0 ?<p>No Users register.</p>:data?.map((user)=>{
            return <tr key={user._id}>
                 <td className=""><img className="w-10 h-10 rounded-full mx-auto" src={user.avatar} alt="" /></td>
               <td className=" capitalize " >{user.name}</td>
               <td>{user?.email}</td>
               <td className='capitalize'> {user?.gender}</td>
               <td>{user?.phone}</td>
               <td className='capitalize'>{user?.address}</td>   
               <td>{user?.isAdmin===true?<span className='font-semibold text-red-500 bg-red-100 p-2 rounded-lg'>Admin</span>:<span className='font-semibold text-green-500 bg-green-100 p-2 rounded-lg'>Users</span>}</td>   
            </tr>
          })}
        </tbody>
      </table>

      {isLoading && <h5 className="text-center">Loading...</h5>}
      {isError && <p className="text-red-500 text-center">Error:{error.message}</p>}
    </>
  )
}

export default AllUsers
