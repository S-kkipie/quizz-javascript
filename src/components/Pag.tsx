import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useQuestionsStore } from "@/store/questions";
function Pag() {
  const { goNextQuestion, goPreviousQuestion } = useQuestionsStore(
    (state) => state
  );
  const currentQuestion = useQuestionsStore((state) => state.currentQuestion);
  const questions = useQuestionsStore((state) => state.questions);
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious onClick={goPreviousQuestion} />
        </PaginationItem>
        <li>
          {currentQuestion + 1}/{questions.length}
        </li>
        <PaginationItem>
          <PaginationNext onClick={goNextQuestion} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

export default Pag;
