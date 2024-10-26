import { Alert, Button, Flex, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import QuizList from '../components/QuizList';
import { useQuiz } from '../contexts/QuizProvider';

const getType = (correctAnswerNumber: number) => {
  if (correctAnswerNumber < 2) {
    return 'error';
  } else if (correctAnswerNumber < 4) {
    return 'warning';
  } else {
    return 'success';
  }
};

export default function QuizResult() {
  const navigate = useNavigate();
  const { quizList, updateQuizList } = useQuiz();

  const handleSubmit = async () => {
    updateQuizList([]);
    navigate('/');
  };

  const correctAnswerNumber = quizList.reduce((acc, current) => {
    if (current.selectedAnswer === current.correctAnswer) return acc + 1;
    return acc;
  }, 0);

  return (
    <Flex vertical gap="large">
      <Typography.Title style={{ textAlign: 'center' }}>
        Results
      </Typography.Title>
      <QuizList isResult />
      <Alert
        message={`You scored ${correctAnswerNumber} out of ${quizList.length}`}
        type={getType(correctAnswerNumber)}
      />
      <Button type="primary" size="large" onClick={handleSubmit}>
        Create a new quiz
      </Button>
    </Flex>
  );
}
