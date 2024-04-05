import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useQuestionsStore } from "@/store/questions";

function Alert() {
  const results = useQuestionsStore((state) => state.results);
  const reset = useQuestionsStore((state) => state.reset);
  console.log(results);
  return (
    <AlertDialog open={results[1] === 0}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Felicidades, Terminaste el Quizz</AlertDialogTitle>
          <AlertDialogDescription>
            Estos fueron tus resultados:
            <div>Correctas: {results[0]}</div>
            <div>Incorrectas: {results[2]}</div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction
            onClick={() => {
              reset();
            }}
          >
            Jugar de nuevo
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default Alert;
