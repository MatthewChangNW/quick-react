import React from 'react'
import { Link } from 'react-router-dom'
const CourseCard = ({ course, selected, toggleSelected, conflicting, signedIn }) => {
  let key = course.term + ";" + String(course.number) + ";" + course.title + ";" + course.meets

  return (
    <div data-cy="course">
      {
        conflicting.includes(key) ? (
          <div className='flex flex-col border w-48 p-4 rounded-md justify-between border-red-600' key={key}>
            <div>
              <div className='flex-row justify-between'>
                <div className='text-xl'>{course.term} CS {course.number}</div>
                <Link to={`/editCourse/${key}`} className='py-2'>Edit</Link>
              </div>

              <div className='py-2'>{course.title}</div>
            </div>
            <div className='border-t pt-2'>{course.meets}</div>
          </div>
        ) : (
          <div className={`flex flex-col border w-48 p-4 rounded-md justify-between ${selected.includes(key) ? 'border-black' : 'border'}`} key={key} onClick={() => { toggleSelected(key, course) }}>
            <div>
              <div className='flex-row justify-between'>
                <div className='text-xl'>{course.term} CS {course.number}</div>
                {signedIn && <Link to={`/editCourse/${key}`} className='py-2'>Edit</Link>}
              </div>
              <div className='py-2'>{course.title}</div>
            </div>
            <div className='border-t pt-2'>{course.meets}</div>
          </div>
        )
      }
    </div>

  )
}

export default CourseCard