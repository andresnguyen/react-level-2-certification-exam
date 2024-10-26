# React Level 2 Certification

**Project Goal:** Build a small quiz maker application that creates a 5-question quiz based on a trivia API.

**Documentation URL:** [Project Document](https://bit.ly/react-cert-l2-quiz)

---

## 1. Project Overview

This project requires creating a quiz application using React that fetches trivia questions from an external API.

## 2. Project Steps

### Step #1 - Implement Category and Difficulty Selection

1. **Trivia Categories**:
   - Fetch categories from the API: [Get Categories API](https://opentdb.com/api_category.php).
2. **Difficulty Levels**:

   - Provide three difficulty options: _Easy_, _Medium_, and _Hard_.

3. **UI Elements**:
   - Use the following `id` attributes:
     - `categorySelect` for the category dropdown.
     - `difficultySelect` for the difficulty dropdown.
     - `createBtn` for the quiz creation button.

> **Note**: Styling is not a priority. The layout can vary as long as the app functions as specified.

### Step #2 - Display a 5-Question Quiz

1. **API Request**:

   - Fetch 5 trivia questions based on the selected category and difficulty using the Open Trivia Database API.
   - Example request for "Easy" film trivia:  
     `https://opentdb.com/api.php?amount=5&category=11&difficulty=easy&type=multiple`

2. **Display Answers**:

   - Show answers in random order. Each answer should be a clickable button.
   - Highlight selected answers and keep them highlighted.

3. **Submit Button**:
   - A "Submit" button should appear after all questions are answered.

### Step #3 - Display Quiz Results

1. **Result Component**:

   - On submission, navigate to a new component (using React Router) to show results.
   - Highlight answers:
     - Green for correct answers.
     - Red for incorrect answers.
     - The correct answer is always displayed in green.

2. **Scoring**:

   - Show a color-coded score indicator based on correct answers:
     - **Red**: 0–1 correct answers
     - **Yellow**: 2–3 correct answers
     - **Green**: 4–5 correct answers

3. **Reset Button**:
   - Include a button that allows users to create a new quiz from the result screen.
