import { CategoryList, CategoryResponse, Quiz, QuizResponse } from '../type';
import { shuffleArray } from '../utils';

const quizAPI = {
  getCategoryList: async (): Promise<CategoryList> => {
    const response = await fetch('https://opentdb.com/api_category.php');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const categoryList: CategoryResponse = await response.json();
    return categoryList.trivia_categories;
  },
  getQuizList: async (
    selectedCategory: string,
    selectedLevel: string
  ): Promise<Quiz[]> => {
    const response = await fetch(
      `https://opentdb.com/api.php?amount=5&category=${selectedCategory}&difficulty=${selectedLevel}&type=multiple`
    );
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const categoryList: QuizResponse = await response.json();
    return categoryList.results.map((item) => ({
      question: item.question,
      correctAnswer: item.correct_answer,
      answerList: shuffleArray([
        ...item.incorrect_answers,
        item.correct_answer,
      ]),
    }));
  },
};

export default quizAPI;
