import React from 'react'
import Banner from './Banner'
import TermSelector from './TermSelector'
import EditCourse from './EditCourse'
import { BrowserRouter, Routes, Route } from "react-router-dom";

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
            <EditCourse courses={courses} />} />
    </Routes>
  </BrowserRouter>
  )
}

export default Dispatcher