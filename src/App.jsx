import { useReducer, useEffect } from "react";
import Header from "./components/Header";
import Main from "./components/Main";
import Loader from "./components/Loader";
import Error from "./components/Error";
import Ready from "./components/Ready";
import Questions from "./components/Questions";
import Nextbutton from "./components/Nextbutton";
import Progress from "./components/Progress";
import Finish from "./components/Finish";
import Timer from "./components/Timer";

const SEC_PER_QUESTION = 30;

const initialState = {
  questions: [],
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  secondsRemaining: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return {
        ...state,
        questions: action.payload,
        status: "ready",
      };
    case "dataFailed":
      return {
        ...state,
        status: "error",
      };

    case "start":
      return {
        ...state,
        status: "active",
        secondsRemaining: state.questions.length * SEC_PER_QUESTION,
      };

    case "newAnswer":
      const question = state.questions.at(state.index);

      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };

    case "nextQuestion":
      return {
        ...state,
        index: state.index + 1,
        answer: null,
      };
    case "finish":
      return {
        ...state,
        status: "finished",
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      };

    case "restart":
      return {
        ...state,
        index: 0,
        answer: null,
        points: 0,
        highscore: 0,
        status: "ready",
      };

    case "tick":
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? "finished" : state.status,
      };
    default:
      throw new Error("Action Unknown");
  }
}

export default function App() {
  const [
    { questions, status, index, answer, points, highscore, secondsRemaining },
    dispatch,
  ] = useReducer(reducer, initialState);

  const numberOfQuestions = questions.length;
  const maxPossiblePoints = questions.reduce(
    (prev, curr) => prev + curr.points,
    0
  );

  useEffect(function () {
    fetch("/questions.json")
      .then((res) => res.json())
      .then((data) =>
        dispatch({ type: "dataReceived", payload: data.questions })
      )
      .catch((err) => dispatch({ type: "dataFailed" }));
  }, []);

  return (
    <div className="min-h-screen bg-slate-700 text-white">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <Header />
        
        <Main>
          {status === "loading" && (
            <div className="flex justify-center items-center min-h-[60vh]">
              <Loader />
            </div>
          )}
          
          {status === "error" && (
            <div className="flex justify-center items-center min-h-[60vh]">
              <Error />
            </div>
          )}
          
          {status === "ready" && (
            <div className="max-w-4xl mx-auto">
              <Ready numQuestions={numberOfQuestions} dispatch={dispatch} />
            </div>
          )}
          
          {status === "active" && (
            <div className="max-w-4xl mx-auto">
              <div className="bg-slate-800/50 rounded-2xl p-4 md:p-8 shadow-2xl">
                <Progress
                  index={index}
                  numQuestions={numberOfQuestions}
                  points={points}
                  maxPossiblePoints={maxPossiblePoints}
                  answer={answer}
                />
                
                <div className="mt-8 md:mt-12">
                  <Questions
                    question={questions[index]}
                    dispatch={dispatch}
                    answer={answer}
                  />
                </div>

                <footer className="mt-8 md:mt-12 pt-6 border-t border-slate-600/50">
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <Timer dispatch={dispatch} secondsRemaining={secondsRemaining} />
                    <Nextbutton
                      dispatch={dispatch}
                      answer={answer}
                      numQuestions={numberOfQuestions}
                      index={index}
                    />
                  </div>
                </footer>
              </div>
            </div>
          )}

          {status === "finished" && (
            <div className="max-w-4xl mx-auto">
              <Finish
                points={points}
                maxPossiblePoints={maxPossiblePoints}
                highscore={highscore}
                dispatch={dispatch}
              />
            </div>
          )}
        </Main>
      </div>
    </div>
  );
}