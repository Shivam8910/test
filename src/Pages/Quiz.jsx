import React, { useRef, useState } from "react";
import "../styles/Quiz.css";
import { questionsHi, questionsEng, questionsGr } from "../Assets/Questions";
import Appbar from "../Components/Appbar";
import { useNavigate, useParams } from "react-router-dom";

const Quiz = () => {
  const navigate = useNavigate();
  const { lang } = useParams();
  let [index, setIndex] = useState(0);
  let questions = [];

  if (lang === "Hindi") {
    questions = questionsHi;
  } else if (lang === "English") {
    questions = questionsEng;
  } else {
    questions = questionsGr;
  }

  let [question, setQuestion] = useState(questions[index]);
  let [lock, setLock] = useState(false);
  let [score, setScore] = useState(0);
  let [result, setResult] = useState(false);

  let Option1 = useRef(null);
  let Option2 = useRef(null);
  let Option3 = useRef(null);
  let Option4 = useRef(null);

  let option_array = [Option1, Option2, Option3, Option4];

  const checkAns = (e, ans) => {
    if (lock === false) {
      if (question.ans === ans) {
        e.target.classList.add("correct");
        setLock(true);
        setScore((prev) => prev + 1);
      } else {
        e.target.classList.add("wrong");
        setLock(true);
        option_array[question.ans - 1].current.classList.add("correct");
      }
    }
  };

  const next = () => {
    if (lock === true) {
      if (index === questions.length - 1) {
        setResult(true);
        return 0;
      }
      setIndex(++index);
      setQuestion(questions[index]);
      setLock(false);
      option_array.map((option) => {
        option.current.classList.remove("wrong");
        option.current.classList.remove("correct");
        return null;
      });
    }
  };

  const reset = () => {
    setIndex(0);
    setQuestion(questions[0]);
    setScore(0);
    setLock(false);
    setResult(false);
    navigate("/");
  };

  /*
  const handleGoToHome = useCallback(() => {
    let level = "Beginner";
    if (score < 8) level = "Advanced";
    else if (score < 8 && score >= 5) level = "Intermediate";
    else level = "Beginner";

    const data = {
      email: user.email,
      level: level,
    };
    const addLevel = async () => {
      await updateUserByEmail(data);
    };
    addLevel();

    const reset = () => {
      setIndex(0);
      setQuestion(questions[0]);
      setScore(0);
      setLock(false);
      setResult(false);
      navigate("/");
    };

    reset();
  }, [navigate, questions, score, user.email]);
  */

  return (
    <>
      <Appbar />
      <div className="container">
        <h1 style={{ textAlign: "center" }}>Quizz</h1>
        <hr />
        {result ? (
          <>
            <h2 style={{ textAlign: "center" }}>
              You Scored {score} out of {questions.length}
            </h2>
            <button onClick={reset}>Back to Home</button>
          </>
        ) : (
          <>
            <h2>
              {index + 1}. {question.question}
            </h2>
            <ul>
              <li
                ref={Option1}
                onClick={(e) => {
                  checkAns(e, 1);
                }}
              >
                {question.option1}
              </li>
              <li
                ref={Option2}
                onClick={(e) => {
                  checkAns(e, 2);
                }}
              >
                {question.option2}
              </li>
              <li
                ref={Option3}
                onClick={(e) => {
                  checkAns(e, 3);
                }}
              >
                {question.option3}
              </li>
              <li
                ref={Option4}
                onClick={(e) => {
                  checkAns(e, 4);
                }}
              >
                {question.option4}
              </li>
            </ul>
            <button onClick={next}>Next</button>
            <div className="index">
              {index + 1} of {questions.length} questions
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Quiz;
