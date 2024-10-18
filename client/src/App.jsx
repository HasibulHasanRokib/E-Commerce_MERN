import Index from "./routers";
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProductProvider from "./context/productContext";
import AuthContextProvider from "./context/authContext";
import {QueryClient,QueryClientProvider,} from '@tanstack/react-query'
const queryClient = new QueryClient()

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
    <AuthContextProvider>
    <ProductProvider>
      <Index />
      <ToastContainer theme="colored" autoClose={1000} position="top-right"/>
    </ProductProvider>
    </AuthContextProvider>
    </QueryClientProvider>
  );
};

export default App;
