export default function Finish({
  points,
  maxPossiblePoints,
  highscore,
  dispatch,
}) {
  const percentage = (points / maxPossiblePoints) * 100;

  return (
    <div className="bg-slate-800/50 rounded-2xl p-6 md:p-10 shadow-2xl">
      <div className="text-center">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6">
          Quiz Completed! 🎉
        </h2>

        <div className="mb-8">
          <div className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
            {points} points
          </div>
          <div className="text-slate-300 text-lg">
            out of {maxPossiblePoints} possible ({Math.ceil(percentage)}%)
          </div>
        </div>

        <div className="bg-slate-700/30 rounded-xl p-6 mb-8">
          <div className="text-xl font-medium mb-2">🏆 High Score</div>
          <div className="text-3xl font-bold text-amber-400">
            {highscore} points
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            className="
              bg-gradient-to-r from-blue-600 to-purple-600 
              hover:from-blue-700 hover:to-purple-700
              text-white font-bold 
              px-8 py-4 
              rounded-xl
              text-lg
              transition-all duration-200
              shadow-lg hover:shadow-xl
              w-full sm:w-auto
            "
            onClick={() => dispatch({ type: "restart" })}
          >
            Restart Quiz
          </button>
        </div>
      </div>
    </div>
  );
}
