import Editor from "@monaco-editor/react";
import Pag from "./components/Pag";
import { useQuestionsStore } from "./store/questions";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "./components/ui/button";
function Game() {
  const questions = useQuestionsStore((state) => state.questions);
  const currentQuestion = useQuestionsStore((state) => state.currentQuestion);
  const questionInfo = questions[currentQuestion];
  const selectAnswer = useQuestionsStore((state) => state.selectAnswer);

  const createHandleClick = (answerIndex: number) => () => {
    selectAnswer(questionInfo.id, answerIndex);
  };
  const getBackgroundColor = (index: number) => {
    const { userSelectedAnswer, correctAnswer } = questionInfo;
    if (userSelectedAnswer === null) {
      return "secondary";
    }
    if (index !== correctAnswer && index !== userSelectedAnswer) {
      return "secondary";
    }
    if (userSelectedAnswer === correctAnswer) {
      return;
    }
    if (index === userSelectedAnswer) {
      return "destructive";
    }
    return "secondary";
  };
  console.log(questionInfo);
  const answers = questionInfo.answers.map((value, index) => {
    return (
      <Button
        disabled={questionInfo.userSelectedAnswer !== undefined}
        onClick={createHandleClick(index)}
        key={index}
        variant={getBackgroundColor(index)}
      >
        {value}
      </Button>
    );
  });
  return (
    <Card className={"w-[700px] "}>
      <CardHeader>
        <CardTitle>Pregunta {questionInfo.id}</CardTitle>
        <CardDescription>Lee atentamente</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className=" flex items-center space-x-4 rounded-md border p-4">
          <div className="flex-1 space-y-1">
            <p className="text-sm font-medium leading-none mb-8">
              {questionInfo.question}
            </p>
            <Editor
              options={{
                minimap: {
                  enabled: false, // Desactivar la zona de minimapa
                },
                scrollbar: {
                  vertical: "hidden",
                },
              }}
              theme="vs-dark"
              height="100px"
              defaultLanguage="javascript"
              value={questionInfo.code}
            />
          </div>
        </div>
        {answers}
      </CardContent>
      <CardFooter>
        <Pag />
      </CardFooter>
    </Card>
  );
}
export default Game;
