import { Button, Flex, Select, Typography } from 'antd';
import { Await, useLoaderData, useNavigate } from 'react-router-dom';
import { CategoryList } from '../type';
import { Suspense, useState } from 'react';
import quizAPI from '../apis/quizAPI';
import QuizList from '../components/QuizList';
import { useQuiz } from '../contexts/QuizProvider';
import Loading from '../components/Loading';

const LEVEL_LIST = [
  {
    label: 'Easy',
    value: 'easy',
  },
  {
    label: 'Medium',
    value: 'medium',
  },
  {
    label: 'Hard',
    value: 'hard',
  },
];

export default function QuizMaker() {
  const navigate = useNavigate();
  const { categoryList } = useLoaderData() as { categoryList: CategoryList };
  const { quizList, updateQuizList } = useQuiz();
  const [form, setForm] = useState({ selectedCategory: '', selectedLevel: '' });
  const [getQuizLoading, setGetQuizLoading] = useState(false);

  const handleChange = (key: string, value: string) => {
    setForm({
      ...form,
      [key]: value,
    });
  };

  const handleClick = async () => {
    setGetQuizLoading(true);
    try {
      const quizList = await quizAPI.getQuizList(
        form.selectedCategory,
        form.selectedLevel
      );
      updateQuizList(quizList);
    } finally {
      setGetQuizLoading(false);
    }
  };

  const handleSubmit = async () => {
    navigate('/quiz-result');
  };

  const isAnsweredAll = quizList.length
    ? quizList.every((item) => item.selectedAnswer)
    : false;

  return (
    <Flex vertical gap="large">
      <Typography.Title style={{ textAlign: 'center' }}>
        Quiz Maker
      </Typography.Title>
      <Suspense fallback={<Loading />}>
        <Await resolve={categoryList}>
          {(categoryList: CategoryList) => (
            <>
              <Flex gap="small">
                <Select
                  value={form.selectedCategory}
                  onChange={(value) => handleChange('selectedCategory', value)}
                  style={{ width: '50%' }}
                  options={categoryList.map((item) => ({
                    value: item.id,
                    label: item.name,
                  }))}
                />
                <Select
                  value={form.selectedLevel}
                  style={{ width: '30%' }}
                  onChange={(value) => handleChange('selectedLevel', value)}
                  options={LEVEL_LIST}
                />
                <Button
                  type="primary"
                  disabled={getQuizLoading}
                  onClick={handleClick}
                >
                  Create
                </Button>
              </Flex>
              <QuizList />
              {isAnsweredAll && (
                <Button type="primary" size="large" onClick={handleSubmit}>
                  Submit
                </Button>
              )}
            </>
          )}
        </Await>
      </Suspense>
    </Flex>
  );
}
