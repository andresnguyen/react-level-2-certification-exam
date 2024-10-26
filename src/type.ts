export type CategoryResponse = {
  trivia_categories: {
    id: number;
    name: string;
  }[];
};

export type CategoryList = CategoryResponse['trivia_categories'];

export type QuizResponse = {
  response_code: number;
  results: {
    type: string;
    difficulty: string;
    category: string;
    question: string;
    correct_answer: string;
    incorrect_answers: string[];
  }[];
};

export type Quiz = {
  question: string;
  correctAnswer: string;
  answerList: string[];
  selectedAnswer?: string;
};
