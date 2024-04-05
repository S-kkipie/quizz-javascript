import { create } from "zustand";
import { type Question } from "@/types";
import { persist } from "zustand/middleware";
import confetti from "canvas-confetti";
interface State {
  questions: Question[];
  currentQuestion: number;
  fetchQuestions: (limit: number) => Promise<void>;
  selectAnswer: (questionId: number, answerId: number) => void;
  goNextQuestion: () => void;
  goPreviousQuestion: () => void;
  reset: () => void;
  results: number[];
  setResults: (correct: number, unanswered: number, incorrect: number) => void;
}
export const useQuestionsStore = create<State>()(
  persist(
    (set, get) => {
      return {
        questions: [],
        currentQuestion: 0,
        results: [],
        fetchQuestions: async (limit: number) => {
          const rest = await fetch("data.json");
          const json = await rest.json();
          const questions = json
            .sort(() => Math.random() - 0.5)
            .slice(0, limit);
          set({ questions });
        },
        selectAnswer: (questionId: number, answerId: number) => {
          const { questions } = get();
          const newQuestions = structuredClone(questions);
          const questionIndex = newQuestions.findIndex(
            (q) => q.id === questionId
          );
          const questionInfo = newQuestions[questionIndex];
          const isCorrectUserAnswer = questionInfo.correctAnswer === answerId;
          if (isCorrectUserAnswer) {
            confetti();
          }
          newQuestions[questionIndex] = {
            ...questionInfo,
            isCorrectUserAnswer,
            userSelectedAnswer: answerId,
          };
          set({ questions: newQuestions });
        },
        goNextQuestion: () => {
          const { currentQuestion, questions } = get();
          const nextQuestion = currentQuestion + 1;
          if (nextQuestion < questions.length) {
            set({ currentQuestion: nextQuestion });
          }
        },
        goPreviousQuestion: () => {
          const { currentQuestion } = get();
          const previousQuestion = currentQuestion - 1;
          if (previousQuestion >= 0) {
            set({ currentQuestion: previousQuestion });
          }
        },
        reset: () => {
          set({ currentQuestion: 0, questions: [], results: [] });
        },
        setResults: (
          correct: number,
          unanswered: number,
          incorrect: number
        ) => {
          set({ results: [correct, unanswered, incorrect] });
        },
      };
    },
    {
      name: "questions",
    }
  )
);
