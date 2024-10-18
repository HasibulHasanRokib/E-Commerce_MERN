import { useQuery } from '@tanstack/react-query'
import Graph from '../../assets/New folder/graph.png'
import {Link} from 'react-router-dom'
import { fetchOutOfStockProducts, fetchProducts } from '../../api/productApi'
import { allProjects } from '../../api/projectApi'
import { fetchUsers } from '../../api/authApi'
import { fetchDesigners } from '../../api/designerApi'
import { fetchOrders } from "../../api/orderApi";
import { allService } from '../../api/serviceApi'
import { useContext } from 'react'
import { ProductContext } from '../../context/productContext'


const Dashboard = () => {
  const {setActive}=useContext(ProductContext)

  const {data:products}=useQuery({
    queryKey:['products'],
    queryFn:fetchProducts,
  
  })

  const {data:outofstocks}=useQuery({
    queryKey:['out-of-stock'],
    queryFn:fetchOutOfStockProducts,
  
  })

  const{data:projects}=useQuery({
    queryKey:['projects'],
    queryFn:allProjects,
  })

  const{data:users}=useQuery({
    queryKey:['all-users'],
    queryFn:fetchUsers
  })

  const {data:designers}=useQuery({
    queryKey:["designers"],
    queryFn:fetchDesigners
    
  })

  const { data:orders} = useQuery({
    queryKey: ["all-orders"],
    queryFn: fetchOrders,
  });

  const { data:services} = useQuery({
    queryKey: ["services"],
    queryFn:allService,
  });

  


  const placeOrder = orders?.filter(data => data.status === 'order-placed');
  const confirmOrder = orders?.filter(data => data.status === 'confirmed');
  const delivered = orders?.filter(data => data.status === 'delivered');

    // Utility function to filter orders by date range
    const isToday = (date) => {
      const today = new Date();
      return date.getDate() === today.getDate() &&
             date.getMonth() === today.getMonth() &&
             date.getFullYear() === today.getFullYear();
    };
  
    const isThisWeek = (date) => {
      const now = new Date();
      const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));
      const endOfWeek = new Date(now.setDate(now.getDate() - now.getDay() + 6));
      return date >= startOfWeek && date <= endOfWeek;
    };
  
    const isThisMonth = (date) => {
      const now = new Date();
      return date.getMonth() === now.getMonth() &&
             date.getFullYear() === now.getFullYear();
    };
  
    const todayEarnings = delivered?.filter(order => isToday(new Date(order.orderDate)))
                                     .reduce((acc, order) => acc + order.total, 0);
  
    const thisWeekEarnings = delivered?.filter(order => isThisWeek(new Date(order.orderDate)))
                                       .reduce((acc, order) => acc + order.total, 0);
  
    const thisMonthEarnings = delivered?.filter(order => isThisMonth(new Date(order.orderDate)))
                                        .reduce((acc, order) => acc + order.total, 0);
  
    const totalEarnings = delivered?.reduce((acc, order) => acc + order.total, 0);

  return (
    <div className="">
     
     <section className='flex mb-5 gap-2'>
      <div className="bg-white flex justify-between items-center p-4 gap-4 w-full">

        <span>
        <h2 className='font-semibold text-xl'>Sales Summary</h2>
        <p className='text-sm text-slate-400'>Overview of Latest Month</p>
        </span>

        <span>
        <samp>৳</samp><samp className='font-bold text-2xl ml-2'>{todayEarnings?.toLocaleString()}</samp>
         <p className='text-sm'>Today's Earning</p>
        </span>

        <span>
        <samp>৳</samp><samp className='font-bold text-2xl ml-2'>{thisWeekEarnings?.toLocaleString()}</samp>
         <p className='text-sm'>This Week Earnings</p>
        </span>

        <span>
        <samp>৳</samp><samp className='font-bold text-2xl ml-2'>{thisMonthEarnings?.toLocaleString()}</samp>
         <p className='text-sm'>This Month Earnings</p>
        </span>

        <span>
        <samp>৳</samp><samp className='font-bold text-2xl ml-2'>{totalEarnings?.toLocaleString()}</samp>
         <p className='text-sm'>Total Earning</p>
        </span>
     
      </div>
      {/* <Link to={"#"} className='border rounded'>
        <img className="h-[20rem] max-w-full" src={Graph} alt="" />
      </Link> */}
     </section>
     

    <section className=" grid grid-cols-4 gap-2">
      <div className="bg-white h-40 flex justify-center items-center border shadow-sm rounded">
        <p className="font-bold text-xl">Total Products ({products?.products?.length})</p>
      </div>
      <div className="bg-white h-40 flex justify-center items-center border shadow-sm rounded">
        <p className="font-bold text-xl">Out of stocks ({outofstocks?.length})</p>
      </div>
      <div className="bg-white h-40 flex justify-center items-center border shadow-sm rounded">
        <p className="font-bold text-xl">Total Portfolio ({projects?.length})</p>
      </div>
      <div className="bg-white h-40 flex justify-center items-center border shadow-sm rounded">
        <p className="font-bold text-xl">Total Users ({users?.length})</p>
      </div>
      <div className="bg-white h-40 flex justify-center items-center border shadow-sm rounded">
        <p className="font-bold text-xl">Total Designers ({designers?.designers.length})</p>
      </div>
      <div className="bg-white h-40 flex justify-center items-center border shadow-sm rounded">
        <p className="font-bold text-xl">Total orders ({placeOrder?.length})</p>
      </div>
      <div className="bg-white h-40 flex justify-center items-center border shadow-sm rounded">
        <p className="font-bold text-xl">Total confirm orders ({confirmOrder?.length})</p>
      </div>

      <div className="bg-white h-40 flex justify-center items-center border shadow-sm rounded">
        <p className="font-bold text-xl">Total delivered orders ({delivered?.length})</p>
      </div>
      
    </section>

    <section className='bg-white p-4 my-5'>
      <h2 className='font-bold text-3xl my-4 '>Service request:</h2>
      <div className="flex flex-col gap-3">
        {services?.map((data,index)=>{
          return <div className="bg-slate-100 py-3 px-4 rounded-md border shadow-sm" key={data._id}>
            
             <Link onClick={()=>setActive("admin-request")} to={'/admin/request'}><p  className='text-xl'>{index+1}. "<span className='font-bold capitalize'>{data?.userId.name}</span>" request for a service!</p></Link>
          </div>
        })}
      </div>
      
    </section>
    </div>
  )
}

export default Dashboard
