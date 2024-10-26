import { defer, RouterProvider, createHashRouter } from "react-router-dom";
import "./App.css";
import QuizMaker from "./pages/QuizMaker";
import QuizResult from "./pages/QuizResult";
import quizAPI from "./apis/quizAPI";
import { QuizProvider } from "./contexts/QuizProvider";
import Loading from "./components/Loading";

const router = createHashRouter([
  {
    path: "/",
    element: <QuizMaker />,
    loader: async () => {
      return defer({
        categoryList: quizAPI.getCategoryList(),
      });
    },
  },
  {
    path: "/quiz-result",
    element: <QuizResult />,
  },
]);

function App() {
  return (
    <div style={{ maxWidth: "800px", margin: "0 auto" }}>
      <QuizProvider>
        <RouterProvider router={router} fallbackElement={<Loading />} />
      </QuizProvider>
    </div>
  );
}

export default App;
