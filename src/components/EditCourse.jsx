import { useFormData } from '../utilities/useFormData';
import { useNavigate } from 'react-router-dom';
import { useDbUpdate } from '../utilities/firebase';
const validateUserData = (key, val) => {
  switch (key) {
    case 'courseTitle':
      return /(^\w\w)/.test(val) ? '' : 'must be least two characters';
    case 'meetingTime':
      return /^(M|Tu|W|Th|F)(?:(?<=, )|(?! ))?(M|Tu|W|Th|F)?(?:(?<=, )|(?! ))?(M|Tu|W|Th|F)? \d{1,2}:\d{2}-\d{1,2}:\d{2}$/.test(val) ? '' : 'Must be in the form DD HH:MM-HH:MM';
    default: return '';
  }
};

const InputField = ({name, text, state, change}) => (
  <div className="mb-3">
    <label htmlFor={name} className="form-label">{text}</label>
    <input className="form-control" id={name} name={name} 
      defaultValue={state.values?.[name]} onChange={change} />
    <div className="text-red-400">{state.errors?.[name]}</div>
  </div>
);

const ButtonBar = ({message, disabled}) => {
  const navigate = useNavigate();
  return (
    <div className="d-flex">
      <button type="button" className="btn btn-outline-dark me-2" onClick={() => navigate(-1)}>Cancel</button>
      <button type="submit" className="btn btn-primary me-auto" disabled={disabled}>Submit</button>
    </div>
  );
};

const EditCourse = ({course, courseId}) => {
  console.log(courseId)
  const [update, result] = useDbUpdate(`/courses/${courseId}`);
  const navigate = useNavigate();
  const [state, change] = useFormData(validateUserData, course);
  const submit = (evt) => {
    evt.preventDefault();
    if (!state.errors) {
      update(state.values);
    }
    navigate(-1)
  };
  return ( 
    <form onSubmit={submit} noValidate className={state.errors ? 'was-validated' : null}>
      <InputField name="title" text="Course Title" state={state} change={change} />
      <InputField name="meets" text="Meeting Time" state={state} change={change} />
      <ButtonBar/>
    </form>
  )
};

export default EditCourse;

