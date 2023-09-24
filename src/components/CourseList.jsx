import React from 'react'

export default function CourseList({courses}) {
  return (
    <div>
        {Object.values(courses).map(course => 
            <div>{course.term} CS {course.number}: {course.title}</div>
        )}
    </div>
  )
}
