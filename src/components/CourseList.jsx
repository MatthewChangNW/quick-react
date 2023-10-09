import React, {useState} from 'react';
import CourseCard from './CourseCard';

export default function CourseList({ courses, term, selected, toggleSelected, conflicting }) {
  // Filter the courses based on the matching term
  const filteredCourses = Object.values(courses).filter(course => course.term === term);
  return (
    <div className='flex flex-row gap-2 flex-wrap'>
      {filteredCourses.map(course => 
        <CourseCard course={course} selected={selected} toggleSelected={toggleSelected} conflicting={conflicting}/>
      )}
    </div>
  );
}
