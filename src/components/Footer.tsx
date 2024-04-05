import { useQuestionsStore } from "@/store/questions";
import { Separator } from "@/components/ui/separator";

function Footer() {
  const questions = useQuestionsStore((state) => state.questions);
  const setResults = useQuestionsStore((state) => state.setResults);
  let correct = 0;
  let incorrect = 0;
  let unanswered = 0;
  questions.forEach((question) => {
    const { userSelectedAnswer, correctAnswer } = question;
    if (userSelectedAnswer == undefined) {
      unanswered++;
    } else if (userSelectedAnswer == correctAnswer) {
      correct++;
    } else {
      incorrect++;
    }
  });
  setResults(correct, unanswered, incorrect);
  return (
    <footer className="mt-8 flex h-5 items-center space-x-4 text-sm">
      <div>Correctas: {correct}</div>
      <Separator orientation="vertical" />
      <div>Incorrectas: {incorrect}</div>
      <Separator orientation="vertical" />
      <div>Sin Responder: {unanswered}</div>
    </footer>
  );
}

export default Footer;
