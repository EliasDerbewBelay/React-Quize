// Add responsive classes to your Progress component
export default function Progress({ index, numQuestions, points, maxPossiblePoints, answer }) {
  return (
    <div className="w-full">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
        <div className="text-lg font-medium">
          Question {index + 1} of {numQuestions}
        </div>
        <div className="text-lg font-medium bg-slate-700/50 px-4 py-2 rounded-lg">
          {points} / {maxPossiblePoints} points
        </div>
      </div>
      
      {/* Progress bar container */}
      <div className="w-full bg-slate-600/30 rounded-full h-3 md:h-4 overflow-hidden">
        <div 
          className="bg-gradient-to-r from-blue-500 to-purple-500 h-full rounded-full transition-all duration-300"
          style={{ width: `${((index + 1) / numQuestions) * 100}%` }}
        />
      </div>
    </div>
  );
}