import React, {lazy, Suspense} from "react"
import './addqsn.css';
import  {useState} from "react"
import { Formik , Form , Field,ErrorMessage} from 'formik';
import * as Yup from 'yup'
import { createPortal }  from 'react-dom';
import headers from './headers.json';
import { useNavigate } from "react-router-dom"; 
import Spinner from './Spinner';
const Popup = lazy(() => import('./Popup'));

const AddQuestion = () => {
  const [showPopup , setShowPopup] = useState(false);
  const navigate = useNavigate();
  
  const addQuestion = async(data) => {
    const response = await fetch(`http://localhost:4000/questions`, {
        credentials: 'include',
        method: 'POST',
        headers: headers,
        body: JSON.stringify(data)
    });
    
    const isStatusCorrect = response.ok;  //ok-200/201-created
    if(isStatusCorrect===true) {
      setShowPopup(true);
    }
    
}
  return (
    <>
    <div className="container4">
    
    <Formik
    initialValues={{
      statement:""
    }}

    validationSchema={
      Yup.object({
          statement: Yup.string().required('Provide question statement')
          .min(1, 'Statement should be more than 1 character')
      })
  }

    onSubmit={(data,{resetForm})=>{
      addQuestion(data);
      resetForm();
  }}
     
    >
      <div className="container5">
      <Form>
        
        <div className="mb-3">
          <label htmlFor="statement" className="form-label">
            Add Questions : 
          </label>
          <Field type="text" name="statement" className="form-control" id="exampleInputQuestion" placeholder="Add questions" aria-describedby="questionHelp"/>
           <ErrorMessage name = "statement" component="div"/>
        </div>
          <button type="submit" className="btn btn-warning">Submit</button>
      </Form>
      </div>
    </Formik>
   
   
    {(showPopup===true) && createPortal(<Suspense fallback={<Spinner/>}><Popup  
    message = {"Question added successfully! Waiting for approval ..."} 
    onClose={() => {
      setShowPopup(false);
      navigate(`/questions`);
    }}/></Suspense>,
      document.body)}
  </div>
    </>
  ) 
};

export default AddQuestion;