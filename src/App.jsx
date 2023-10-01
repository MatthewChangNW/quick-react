import './App.css';
import Banner from './components/Banner';
import CourseList from './components/CourseList';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useJsonQuery } from './utilities/fetch';
import { useState } from 'react';
import TermSelector from './components/TermSelector';

const Main = () => {
  const [data, isLoading, error] = useJsonQuery('https://courses.cs.northwestern.edu/394/guides/data/cs-courses.php');
  const [term, setTerm] = useState('Fall');
  if (error) return <h1>Error loading user data: {`${error}`}</h1>;
  if (isLoading) return <h1>Loading user data...</h1>;
  if (!data) return <h1>No user data found</h1>;
  if (!data.courses) return <h1>No courses found</h1>;

  
  return (
    <div className="flex flex-1 flex-col items-center p-2">
        <Banner title={data.title} />
        <TermSelector courses={data.courses}/>
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
