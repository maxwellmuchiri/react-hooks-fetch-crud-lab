import React from "react";
function QuestionItem({ question,API,questions,setQuestions}) {
  const { id, prompt, answers, correctIndex } = question;
  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));
  function deleteQuestion(id){
    fetch(`${API}/${id}`,{
      method:'DELETE',
    })
    .then(resp=>resp.json())
    .then(data=>{
      console.log(`deleted question with id: ${id}`)
      const updatedQuestions = questions.filter((question)=>question.id!==id)
      setQuestions(()=>updatedQuestions);
    })
  }
  function changeAnswer(id,correctIndex){
    fetch(`${API}/${id}`,{
      method:'PATCH',
      headers:{
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({'correctIndex':correctIndex})
    })
    .then(resp=>resp.json())
    .then(data=>console.log(data))
    const updatedquestions = questions.map(question => {
        if (question.id === id) {
            return { ...question, correctIndex }
        } else {
          return question
        }
    })
    setQuestions(updatedquestions)
  }
  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select
        onChange={(event)=>{
          changeAnswer(id,event.target.value);
        }}
        defaultValue={correctIndex}
        >{options}</select>
      </label>
      <button onClick={()=>deleteQuestion(id)} >Delete Question</button>
    </li>
  );
}

export default QuestionItem;