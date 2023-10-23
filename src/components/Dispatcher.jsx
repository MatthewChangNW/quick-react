import React, {useState, useEffect} from 'react'
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

import { signInWithGoogle, signOut, useAuthState } from '../utilities/firebase';

const SignInButton = () => (
  <button onClick={signInWithGoogle}>Sign in</button>
);

const SignOutButton = () => {
  return <button onClick={signOut}>Sign out</button>
};

const AuthButton = ({user, setSignedIn}) => {
  if (user) {
    setSignedIn(true);
  }
  else {
    setSignedIn(false);
  }
  return user ? <SignOutButton user={user}/> : <SignInButton/>;
};

function Dispatcher({title, courses}) {
  const [user] = useAuthState();
  const [signedIn, setSignedIn] = useState(false);

  return (
  <BrowserRouter>
    <Routes>
        <Route path="/" element={
                    <div className='flex flex-1 flex-col items-center p-2'>
                        <Banner title={title} />
                        <div className='border border-black rounded-md px-2'>
                          <AuthButton user={user} setSignedIn={setSignedIn} />
                        </div>
                        <TermSelector courses={courses} signedIn={signedIn}/>
                        
                    </div>
                } />
        <Route path="/editCourse/:courseId" element={
            <CourseWithId courses={courses} />} />
    </Routes>
  </BrowserRouter>
  )
}

export default Dispatcher