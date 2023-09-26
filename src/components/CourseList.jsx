import React from 'react'

export default function CourseList({courses}) {
  return (
    <div className='flex flex-row gap-2 flex-wrap'>
        {Object.values(courses).map(course => 
          <div className='flex flex-col border w-48 p-4 rounded-md justify-between'>
            <div>
              <div className='text-xl'>{course.term} CS {course.number} </div>
              <div className='py-2'> {course.title} </div>
            </div>
            <div className='border-t pt-2'> {course.meets}</div>
          </div>
            
        )}
    </div>
  )
}
