import { Button, Space, Typography } from 'antd';
import { useQuiz } from '../contexts/QuizProvider';
import { Quiz } from '../type';
import { cloneObj } from '../utils';

const TYPE_MAP = {
  default: { type: 'default' },
  primary: { type: 'primary' },
  danger: { danger: true, type: 'primary' },
} as const;

const getButtonType = (
  quiz: Quiz,
  answer: string,
  isResult: boolean
): keyof typeof TYPE_MAP => {
  if (isResult) {
    if (quiz.correctAnswer === answer) {
      return 'primary';
    } else if (quiz.selectedAnswer === answer) {
      return 'danger';
    } else {
      return 'default';
    }
  } else {
    return quiz.selectedAnswer === answer ? 'primary' : 'default';
  }
};

export default function QuizList({ isResult = false }: { isResult?: boolean }) {
  const { quizList, updateQuizList } = useQuiz();

  const handleClick = (quizIndex: number, answer: string) => {
    if (isResult) return;
    const newQuizList = cloneObj(quizList);
    newQuizList[quizIndex].selectedAnswer = answer;
    updateQuizList(newQuizList);
  };

  return (
    <Space direction="vertical">
      {quizList.map((item, quizIndex) => (
        <Space direction="vertical" key={item.question}>
          <Typography.Title level={5}>
            <div
              dangerouslySetInnerHTML={{
                __html: `${quizIndex + 1}: ${item.question}`,
              }}
            ></div>
          </Typography.Title>
          <Space direction="horizontal">
            {item.answerList.map((answer) => (
              <Button
                {...TYPE_MAP[getButtonType(item, answer, isResult)]}
                key={answer}
                onClick={() => handleClick(quizIndex, answer)}
              >
                {answer}
              </Button>
            ))}
          </Space>
        </Space>
      ))}
    </Space>
  );
}
