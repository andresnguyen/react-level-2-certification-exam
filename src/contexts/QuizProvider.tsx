import { Quiz } from '../type';
import { ReactNode, useState, createContext, useContext } from 'react';

interface QuizContextType {
  quizList: Quiz[];
  updateQuizList: (quizList: Quiz[]) => void;
}

const QuizContext = createContext<QuizContextType | undefined>(undefined);

interface QuizProviderProps {
  children: ReactNode;
}

export const QuizProvider = ({ children }: QuizProviderProps) => {
  const [quizList, setQuizList] = useState<Quiz[]>([]);

  const updateQuizList = (quizList: Quiz[]) => {
    setQuizList(quizList);
  };

  return (
    <QuizContext.Provider value={{ quizList, updateQuizList }}>
      {children}
    </QuizContext.Provider>
  );
};

export const useQuiz = () => {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error('context must be used within a Provider');
  }
  return context;
};
