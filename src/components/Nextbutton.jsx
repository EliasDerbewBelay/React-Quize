export default function Nextbutton({ dispatch, answer, numQuestions, index }) {
  if (answer === null) return null;

  if (index < numQuestions - 1) {
    return (
      <button
        className="
          bg-gradient-to-r from-blue-600 to-purple-600 
          hover:from-blue-700 hover:to-purple-700
          text-white font-bold 
          px-6 md:px-8 py-3 md:py-4 
          rounded-xl
          text-base md:text-lg
          transition-all duration-200
          shadow-lg hover:shadow-xl
          w-full sm:w-auto
        "
        onClick={() => dispatch({ type: "nextQuestion" })}
      >
        Next Question →
      </button>
    );
  }

  return (
    <button
      className="
        bg-gradient-to-r from-green-600 to-emerald-600 
        hover:from-green-700 hover:to-emerald-700
        text-white font-bold 
        px-6 md:px-8 py-3 md:py-4 
        rounded-xl
        text-base md:text-lg
        transition-all duration-200
        shadow-lg hover:shadow-xl
        w-full sm:w-auto
      "
      onClick={() => dispatch({ type: "finish" })}
    >
      Finish Quiz 🏆
    </button>
  );
}
