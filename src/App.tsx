import "./App.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "./components/ui/button";
import { useQuestionsStore } from "./store/questions";
import Game from "./Game";
import Footer from "./components/Footer";
const App = () => {
  const questions = useQuestionsStore((state) => state.questions);
  console.log(questions);
  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <main>
          <nav className="toggle">
            <ModeToggle />
          </nav>
          <h1 className="text-4xl font-bold mb-8">Quizz</h1>
          {questions.length === 0 ? (
            <Start />
          ) : (
            <>
              <Game /> <Footer />
            </>
          )}
        </main>
      </ThemeProvider>
    </>
  );
};
function Start() {
  const fetchQuestions = useQuestionsStore((state) => state.fetchQuestions);
  const handleClick = () => {
    fetchQuestions(5);
  };
  return (
    <>
      <Button onClick={handleClick}>Empezar!</Button>
    </>
  );
}

export default App;
