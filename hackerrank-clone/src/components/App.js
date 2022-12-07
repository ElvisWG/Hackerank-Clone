import { BrowserRouter, Router, Route } from "react-router-dom";
import Assessments from "./Assessments";
import Home from "./Home";
import TmHome from "./TmHome";
import NewAssessment from "./NewAssessment";

import List from "./pages/List";
import Assignment from "./pages/Assignment";
import Register from "./authorization/Signup";
import Login from "./authorization/Login";

import QuizPage from "./pages/QuizPage";
import StudentDashboard from "../components/pages/StudentDashboard";
import { assessmentColumns } from "./AssessmentData";
import CreateQuiz from "../components/pages/CreateQuiz";
import { studentInputs, mentorInputs } from "../components/students/InputDetails";
import { useSelector } from "react-redux";
import {
 studentRegisterInputs,
  mentorRegisterInputs,
} from "./students/Details";
import Trial from "../components/pages/Trial";
 import StudentAssignment from "../components/students/StudentAssignment";
import SendInvite from "./SendInvite";

function App() {
  const mentor = useSelector((state) => state.mentor?.currentUser?.work_id);
  const student = useSelector((state) => state.student?.currentUser?.username);

  return (
    <BrowserRouter>
      <Router>
        <Route path="/">
          <Route index element={<Home />} />

          <Route
            path="/mentors/login"
            element={
              mentor ? (
                <TmHome />
              ) : (
                <Login inputs={mentorInputs} type="mentor" />
              )
            }
          />
          <Route
            path="/students/login"
            element={
              student ? (
                <StudentDashboard />
              ) : (
                <Login inputs={studentInputs} type="student" />
              )
            }
          />
          <Route
            path="/students/register"
            element={
              student ? (
                <StudentDashboard />
              ) : (
                <Register inputs={studentRegisterInputs} type="student" />
              )
            }
          />
          <Route
            path="/mentors/register"
            element={
              mentor ? (
                <TmHome />
              ) : (
                <Register inputs={mentorRegisterInputs} type="mentor" />
              )
            }
          />
          {student ? (
            <Route path="students">
              <Route index element={<StudentDashboard />} />
              <Route path="trial" element={<Trial />} />
              <Route path="quiz" element={<QuizPage />} />

              <Route path="assessments">
                <Route index element={<Assignment />} />
                <Route path=":id" element={<StudentAssignment />} />
              </Route>
            </Route>
          ) : (
            <Route path="/" element={<Home />} />
          )}
          {mentor ? (
            <Route path="mentors">
              <Route index element={<TmHome />} />

              <Route path="assessments">
                <Route
                  index
                  element={
                    <Assessments columns={assessmentColumns} type="mentor" />
                  }
                />
                <Route path="new-assessment" element={<NewAssessment />} />
                <Route path=":id/new-quiz" element={<CreateQuiz />} />
                <Route path=":id/new-invite" element={<SendInvite />} />
              </Route>
              <Route path="students">
                <Route index element={<List />} />
              </Route>
            </Route>
          ) : (
            <Route path="/" element={<Home />} />
          )}
        </Route>
      </Router>
    </BrowserRouter>
  );
}

export default App;