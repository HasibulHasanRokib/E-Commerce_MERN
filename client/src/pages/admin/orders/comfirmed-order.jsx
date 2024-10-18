import { useQuery } from "@tanstack/react-query";
import { fetchOrders } from "../../../api/orderApi";
import { Link } from "react-router-dom";
import Loading from "../../../components/loading";
import { FaPrint } from "react-icons/fa6";

const ConfirmedOrders = () => {

  const { data, isError, error, isLoading } = useQuery({
    queryKey: ["all-orders"],
    queryFn: fetchOrders,
  });

  const confirmOrder = data?.filter(data => data.status === 'confirmed');
  
  const handlePrint=()=>{
    window.print()
  }


  return (
    <div>
      <div className="flex justify-between items-center">
      <h2 className="font-bold text-2xl mb-5">All confirmed Order Details</h2>
      <button className="flex print:hidden items-center gap-2 bg-red-500 p-3 text-white  border shadow-md shadow-red-500/20" onClick={handlePrint}><FaPrint />Print this page</button>
      </div>
      <div className="flex flex-col gap-3 mt-3">
        {isLoading && (
          <h5 className="text-center my-20">
            <Loading title={"fetching orders"} />
          </h5>
        )}
        {isError && (
          <p className="text-red-500 text-center my-20">
            Error:{error.message}
          </p>
        )}
        {confirmOrder?.length === 0 ? (
          <p>No confirmed order data !</p>
        ) : (
            confirmOrder?.map((items) => {
            return (
              <div className=" bg-white p-4 border shadow-sm" key={items?._id}>
                <div className="py-2 mb-2 border-b-2 flex justify-between items-center">
                  <h2>
                    <span className="font-bold text-2xl">Order code:</span> #
                    {items?._id}
                  </h2>
                  <h2>
                    <span className="font-bold text-2xl">
                      Order status:
                      <span
                        className={`${
                          items?.status === "delivered"
                            ? "text-green-500 capitalize ml-2"
                            : items?.status === "confirmed"
                            ? "text-yellow-500 capitalize ml-2"
                            : items?.status === "cancel"
                            ? "text-red-500 capitalize ml-2"
                            : "text-blue-500 capitalize ml-2"
                        }`}
                      >
                        {items?.status}
                      </span>
                    </span>
                  </h2>
                </div>

                <div className="grid grid-cols-3">
                  <div className="">
                    {items?.products.map((item) => {
                      return (
                        <div
                          className="flex gap-2 items-center "
                          key={item?.product._id}
                        >
                          <img
                            className="w-20 h-30 object-cover border rounded"
                            src={item?.product.imageUrls[0]}
                            alt=""
                          />
                          <article className="flex flex-col gap-1 ">
                            <h2 className="font-semibold">
                              {item?.product.title}
                            </h2>
                            <p className="text-sm">X{item?.quantity}</p>
                          </article>
                        </div>
                      );
                    })}
                  </div>
                  <div className="flex flex-col gap-3">
                    <article className="flex flex-col gap-2">
                      <p className=" capitalize">
                        <span className="font-bold mr-2">Name:</span>
                        {items?.firstname} {items?.lastname}
                      </p>
                      <p>
                        <span className="font-bold mr-2">Email:</span>
                        {items?.email}
                      </p>
                      <p>
                        <span className="font-bold mr-2">Phone:</span>
                        {items?.phone}
                      </p>
                      <p>
                        <span className="font-bold mr-2">Address:</span>
                        {items?.address}
                      </p>
                      <p>
                        <span className="font-bold mr-2">Order Date:</span>
                        {items?.orderDate.slice(0, 10)}
                      </p>
                      {items?.status === "delivered" && items?.deliveryDate ? (
                        <p>
                          <span className="font-bold mr-2 text-green-500">
                            Delivery Date:
                          </span>
                          {items?.deliveryDate.slice(0, 10)}
                        </p>
                      ) : null}
                    </article>
                  </div>
                  <div className="flex flex-col gap-1">
                    <samp>
                      <samp className="font-semibold">Subtotal:</samp>
                      <spam className=" mr-1">৳</spam>
                      {items?.subtotal.toLocaleString()}
                    </samp>
                    <samp>
                      <samp className="font-semibold">Total:</samp>
                      <spam className=" mr-1">৳</spam>
                      {items?.total.toLocaleString()}
                    </samp>
                    <p>
                      <span className="font-bold mr-2">Payment method:</span>
                      <span className=" capitalize text-red-500 font-bold">
                        {items?.payment}
                      </span>
                    </p>
                  </div>
                </div>
                {items?.status === "delivered" ? null : (
                  <button className="bg-sky-800 print:hidden py-2 border shadow-sm rounded-md text-white font-bold w-full mt-5">
                    <Link to={`/admin/update-orders/${items?._id}`}>Edit</Link>
                  </button>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default ConfirmedOrders;
