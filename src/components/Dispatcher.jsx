import React from 'react'
import Banner from './Banner'
import TermSelector from './TermSelector'
import EditCourse from './EditCourse'
import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";

const CourseWithId = ({courses}) => {
  const { courseId } = useParams();
  const key = courseId.split(";")[0][0] + courseId.split(";")[1]
  const course = courses[key];
  return (
    <EditCourse course={course} courseId={key} />
  )
}

function Dispatcher({title, courses}) {
  return (
  <BrowserRouter>
    <Routes>
        <Route path="/" element={
                    <div className='flex flex-1 flex-col items-center p-2'>
                        <Banner title={title} />
                        <TermSelector courses={courses}/>
                    </div>
                } />
        <Route path="/editCourse/:courseId" element={
            <CourseWithId courses={courses} />} />
    </Routes>
  </BrowserRouter>
  )
}

export default Dispatcher