import { Component } from 'react';
import Loader from './Loader';
import ProgressBar from './ProgressBar';
import Result from './Result';
class Quiz extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: null,
      currentQuestion: 1,
      currentAnswer: null,
      selectedAnswers: [],
    };
  }
  category = this.props.match.params.category;
  data = this.props.data;
  componentDidMount() {
    let id = this.data.find((item) => item.name === this.category).id;
    fetch(
      `https://opentdb.com/api.php?amount=10&category=${id}&difficulty=medium`
    )
      .then((res) => res.json())
      .then((data) => data.results)
      .then((data) => data.map((question) => this.generateOptions(question)))
      .then((data) => this.setState({ questions: data }));
  }
  handleOnClick = () => {
    let { selectedAnswers, currentAnswer, currentQuestion } = this.state;
    if (this.state.currentAnswer) {
      this.setState({
        currentQuestion: currentQuestion + 1,
        currentAnswer: null,
        selectedAnswers: selectedAnswers.concat(currentAnswer),
      });
    }
  };
  generateOptions = (question) => {
    let options = question.incorrect_answers
      .concat(question.correct_answer)
      .sort(() => Math.random() - 0.5);
    question.options = options;
    return question;
  };
  handleOption = (answer) => {
    this.setState({ currentAnswer: answer });
  };
  handleRetake = () => {
    this.setState({
      currentQuestion: 1,
      currentAnswer: null,
      selectedAnswers: [],
    });
  };
  render() {
    let { questions, currentQuestion, currentAnswer, selectedAnswers } = this.state;
    if (!questions) {
      return <Loader />;
    }
    if (currentQuestion === 11) {
      return (
        <Result
          selectedAnswers={selectedAnswers}
          questions={questions}
          category={this.category}
          handleRetake={this.handleRetake}
        />
      );
    }
    let question = questions[currentQuestion - 1];
    console.log(question.options);
    console.log(currentAnswer);
    return (
      <>
        <ProgressBar width={currentQuestion * 10} />
        <div className="current-question">{currentQuestion} / 10</div>
        <h1>{question.question}</h1>
        <ul className="options">
          {question.options.map((option) => (
            <li
              key={option}
              onClick={() => this.handleOption(option)}
              className={currentAnswer === option ? 'active-option option': 'option'}
            >            
              {option}
            </li>
          ))}
        </ul>
        <button onClick={() => this.handleOnClick()}>Next</button>
      </>
    );
  }
}

export default Quiz;
