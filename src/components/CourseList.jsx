import React from 'react';

export default function CourseList({ courses, term }) {
  // Filter the courses based on the matching term
  const filteredCourses = Object.values(courses).filter(course => course.term === term);

  return (
    <div className='flex flex-row gap-2 flex-wrap'>
      {filteredCourses.map(course => 
        <div className='flex flex-col border w-48 p-4 rounded-md justify-between' key={course.id}>
          <div>
            <div className='text-xl'>{course.term} CS {course.number}</div>
            <div className='py-2'>{course.title}</div>
          </div>
          <div className='border-t pt-2'>{course.meets}</div>
        </div>
      )}
    </div>
  );
}
