function Result(props) {
    let questions = props.questions.map((question) => question.question);
    let correctAnswers = props.questions.map((question) => question.correct_answer);
    let selectedAnswers = props.selectedAnswers;     
       return <div className="result">
        {
            questions.map((question, index)=>{
                return (<div key={question}>
                    <h4>{question}</h4>
                    <h5 style={{color: 'red'}}>{correctAnswers[index]}</h5>
                    <h5>{selectedAnswers[index]}</h5>
                    <h5>{correctAnswers[index] === selectedAnswers[index] ? '✔️' : '❌'}</h5>
                    </div>
                )
            })
        }
        <button onClick={() => props.handleRetake()}>Retake Test</button>
        
    </div>
}
export default Result;