export default function Questions({ question, dispatch, answer }) {
  return (
    <div className="space-y-4 md:space-y-6">
      <h2 className="text-xl md:text-2xl lg:text-3xl font-bold leading-tight">
        {question.question}
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 mt-6">
        {question.options.map((option, index) => (
          <button
            key={option}
            className={`
              text-left p-4 md:p-5 rounded-xl transition-all duration-200
              text-base md:text-lg
              ${answer !== null 
                ? index === question.correctOption 
                  ? 'bg-green-600/30 border-2 border-green-500' 
                  : 'bg-red-600/30 border-2 border-red-500'
                : 'bg-slate-700/50 hover:bg-slate-600/50 border-2 border-slate-600/50 hover:border-slate-500'
              }
              ${answer === index ? 'scale-[1.02] shadow-lg' : ''}
            `}
            onClick={() => dispatch({ type: 'newAnswer', payload: index })}
            disabled={answer !== null}
          >
            <span className="font-medium mr-2">{index + 1}.</span>
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}