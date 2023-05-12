
import React, { useState, useCallback } from 'react';
import axios from "axios"

function Ladmin() {

  const [initialQuestions, setInitialQuestions] = useState([]);

  const addInitialQuestion = useCallback(() => {
    if (initialQuestions.length < 4) {
      setInitialQuestions([...initialQuestions, {question: '', followUpQuestions:[]}]);
    }
  }, [initialQuestions]);

  const updateInitialQuestion = useCallback((index, value) => {
    const updatedQuestions = [...initialQuestions];
    updatedQuestions[index].question = value;
    setInitialQuestions(updatedQuestions);
  }, [initialQuestions]);

  const addFollowUpQuestion = useCallback((index) => {
    const updatedQuestions = [...initialQuestions];
    if (updatedQuestions[index].followUpQuestions.length < 4) {
      updatedQuestions[index].followUpQuestions.push({name:'',sub:[]});
      setInitialQuestions(updatedQuestions);
    }
  }, [initialQuestions]);

  const updateFollowUpQuestion = useCallback((initialIndex , followUpIndex, value) => {
    const updatedQuestions = [...initialQuestions];
    updatedQuestions[initialIndex].followUpQuestions[followUpIndex].name= value;
    setInitialQuestions(updatedQuestions);
  }, [initialQuestions]);

  const addSubQues = useCallback((initialIndex, index) => {
    const updatedQuestions = [...initialQuestions];
    if (updatedQuestions[initialIndex].followUpQuestions[index].sub.length<4){
      updatedQuestions[initialIndex].followUpQuestions[index].sub.push('')
      setInitialQuestions(updatedQuestions);
    }
  }, [initialQuestions]);

  const updateSubQues = useCallback((initialIndex, followUpIndex, index, value) => {
    const updatedQuestions = [...initialQuestions];
    updatedQuestions[initialIndex].followUpQuestions[followUpIndex].sub[index] = value;
    setInitialQuestions(updatedQuestions)
  }, [initialQuestions]);

  const rendersub = useCallback((initialIndex, followUpIndex) => {
    return (
      initialQuestions[initialIndex].followUpQuestions[followUpIndex].sub.map((sub, index) => (
        <div key={index}>
          <label>Follow {index + 1}</label>
          <input type="text" value={sub} onChange={(e) => updateSubQues(initialIndex, followUpIndex, index, e.target.value)} />
        </div>
      ))
    )
  }, [initialQuestions, updateSubQues]);

  const renderFollowUpQuestions = useCallback((initialIndex) => {
    return (
      initialQuestions[initialIndex].followUpQuestions.map((follow, index) => (
        <div key={index}>
          <label>Follow-up Question {index + 1}</label>
          <input type="text" value={follow.name} onChange={(e) => updateFollowUpQuestion(initialIndex, index, e.target.value)} />
          <button onClick={() => addSubQues(initialIndex ,index)}>Add </button>
          {rendersub(initialIndex,index)}
        </div>
      ))
    );
  }, [initialQuestions, addSubQues, updateFollowUpQuestion, rendersub]);

const renderInitialQuestions = useCallback(() => {
  return (
    initialQuestions.map((initial, index) => (
      <div key={index}>
        <label>Initial Question {index+1}</label>
        <input type="text" value={initial.question} onChange={(e) => updateInitialQuestion(index, e.target.value)} />
        <button onClick={() => addFollowUpQuestion(index)}>Add</button>
        {renderFollowUpQuestions(index)}
      </div>))
);
}, [initialQuestions, addFollowUpQuestion, updateInitialQuestion, renderFollowUpQuestions]);

const handleSave = () => {
axios.post("http://127.0.0.1:5000/Adminstore", initialQuestions)
.then((res) =>{
if (res.status ==200){
  alert ('sucessfully registered ')
  window.location.reload(false)
}
}
 )
.catch((err) => console.log(err))
}


return (
<div>
<h2>Admin Page</h2>
{renderInitialQuestions()}
<button onClick={addInitialQuestion}>Add initial question</button>
<button onClick={handleSave}>Save</button>
</div>
);
}

export default Ladmin;
