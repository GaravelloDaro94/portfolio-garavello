import { SuggestedQuestionsProps } from "../../models";

export function SuggestedQuestions({
  questions,
  onQuestionClick,
}: Readonly<SuggestedQuestionsProps>) {
  return (
    <div className="flex-shrink-0 px-4 sm:px-6 py-3 border-t-2 border-gray-200 dark:border-gray-700">
      <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
        Preguntas sugeridas:
      </p>
      <div className="flex flex-wrap gap-2">
        {questions.map((question) => (
          <button
            key={question}
            onClick={() => onQuestionClick(question)}
            className="text-xs px-2 sm:px-3 py-1 border-2 rounded-full transition-colors bg-blue-100 dark:bg-blue-900 border-blue-200 dark:border-blue-800 text-gray-900 dark:text-gray-300 hover:bg-blue-200 dark:hover:bg-blue-800"
          >
            {question}
          </button>
        ))}
      </div>
    </div>
  );
}