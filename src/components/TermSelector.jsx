import { useState } from "react";
import CourseList from './CourseList';

const terms = {
  Fall: 'fall',
  Winter: 'winter',
  Spring: 'spring'
};

const MenuButton = ({term, selection, setSelection}) => (
  <div>
    <input type="radio" id={term} className="btn-check" checked={term === selection} autoComplete="off"
      onChange={() => setSelection(term)} />
    <label className="btn btn-success mb-1 p-2" htmlFor={term}>
    { term }
    </label>
  </div>
);

const MenuSelector = ({selection, setSelection}) => (
  <div className="flex-row flex pb-2">
    { 
      Object.keys(terms).map(term => <MenuButton key={term} term={term} selection={selection} setSelection={setSelection} />)
    }
  </div>
);

const Menu = ({selection, courses}) => (
  <div className="card" >
    <CourseList courses={courses} term={selection} />
  </div>
);

const TermSelector = ({courses}) => {
  const [selection, setSelection] = useState(() => Object.keys(terms)[0]);
  return (
    <div className='flex flex-col items-center'>
      <MenuSelector selection={selection} setSelection={setSelection} />
      <Menu selection={selection} courses={courses} />
    </div>
  );
}

export default TermSelector;