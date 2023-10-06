import { useState } from "react";
import CourseList from './CourseList';
import Modal from "./Modal";

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

const Menu = ({selection, courses}) => {
    const [selected, setSelected] = useState([]);

    const toggleSelected = (item) => {
        if (selected.includes(item)) {
            setSelected(selected.filter(x => x !== item));
            return;
        }
        else {
            setSelected([...selected, item]);
            return;
        }
    };

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
            {selected.length === 0? 
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
          <CourseList courses={courses} term={selection} selected={selected} toggleSelected={toggleSelected} />
      </div>
    )

    };

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