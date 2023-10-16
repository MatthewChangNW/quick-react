import './App.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useDbData } from './utilities/firebase';
import Dispatcher from './components/Dispatcher';
const Main = () => {
  const [data, error] = useDbData('/');
  if (error) return <h1>Error loading user data: {`${error}`}</h1>;
  if (data === undefined) return <h1>Loading user data...</h1>;
  if (!data) return <h1>No user data found</h1>;

  
  return (
    <div className="">
        <Dispatcher title={data.title} courses={data.courses}/>
    </div>
  );
};
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <div>
      <Main />
      
    </div>
  </QueryClientProvider>
);

export default App;
