import { useState, useEffect } from "react";
import CourseList from './CourseList';
import Modal from "./Modal";
import { hasConflict } from "../utilities/timeConflict";
const terms = {
  Fall: 'fall',
  Winter: 'winter',
  Spring: 'spring'
};

const MenuButton = ({ term, selection, setSelection }) => (
  <div>
    <input type="radio" id={term} className="btn-check" checked={term === selection} autoComplete="off"
      onChange={() => setSelection(term)} />
    <label className="btn btn-success mb-1 p-2" htmlFor={term}>
      {term}
    </label>
  </div>
);

const MenuSelector = ({ selection, setSelection }) => (
  <div className="flex-row flex pb-2">
    {
      Object.keys(terms).map(term => <MenuButton key={term} term={term} selection={selection} setSelection={setSelection} />)
    }
  </div>
);

const Menu = ({ selection, courses, signedIn }) => {
  const [selected, setSelected] = useState([]);
  const [conflicting, setConflicting] = useState([]);

  const toggleSelected = (key) => {
    if (selected.includes(key)) {
      setSelected(selected.filter(course => course !== key));
    } else {
      setSelected([...selected, key]);
    }
  }

  useEffect(() => {
    setConflicting(hasConflict(Object.values(courses), selected));
  }, [selected]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (

    <div className="flex flex-col" >
      <button onClick={openModal} className="rounded-xl px-4 py-2 mb-2 border border-black self-center">
        Course Plan
      </button>

      <Modal isOpen={isModalOpen} onClose={closeModal} selection={selection}>
        {selected.length === 0 ?
          (<p>There are no courses selected. You can click on a course to select it.</p>) :
          (
            selected.map(course =>
              <div className='border-b'>
                <div className='flex flex-row justify-between'>
                  {course.split(",")[0] + " CS " + course.split(",")[1] + ": " + course.split(",")[2]}
                </div>
                <div>Meets {course.split(",")[3]}</div>
              </div>
            )
          )}
      </Modal>
      <CourseList courses={courses} term={selection} selected={selected} toggleSelected={toggleSelected} conflicting={conflicting} signedIn={signedIn}/>
    </div>
  )

};

const TermSelector = ({ courses, signedIn }) => {


  const [selection, setSelection] = useState(() => Object.keys(terms)[0]);
  return (
    <div className='flex flex-col items-center'>
      <MenuSelector selection={selection} setSelection={setSelection} />
      <Menu selection={selection} courses={courses} signedIn={signedIn} />

    </div>
  );
}

export default TermSelector;