import React, { Component } from "react";
import ReactDOM from "react-dom";
import "./assets/style.css";
import quizService from "./quizService";
import QuestionBox from "./components/QuestionBox";
import Result from "./components/Result";

class Quizzy extends Component {
  state = {
    questions: [],
    score: 0,
    responses: 0
  };

  getQuestions = () => {
    quizService().then(question => {
      this.setState({ questions: question });
    });
  };

  componentDidMount() {
    this.getQuestions();
  }

  correctAns = (answer, correct) => {
    if (answer === correct) {
      this.setState({ score: this.state.score + 1 });
    }
    this.setState({
      responses: this.state.responses < 5 ? this.state.responses + 1 : 5
    });
  };

  playAgain = () => {
    this.getQuestions();
    this.setState({ score: 0, responses: 0 });
  };

  render() {
    return (
      <div className="container">
        <div className="title">Quizzy</div>
        {this.state.questions.length > 0 &&
          this.state.responses < 5 &&
          this.state.questions.map(
            ({ question, answers, correct, questionId }) => (
              <QuestionBox
                question={question}
                options={answers}
                key={questionId}
                correct={answer => this.correctAns(answer, correct)}
              />
            )
          )}
        {this.state.responses === 5 ? (
          <Result score={this.state.score} playAgain={this.playAgain} />
        ) : null}
      </div>
    );
  }
}
ReactDOM.render(<Quizzy />, document.getElementById("root"));
