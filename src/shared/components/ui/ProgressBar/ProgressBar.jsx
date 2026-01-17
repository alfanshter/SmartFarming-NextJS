export default function ProgressBar({ progress = 0, height = 20, bgColor = "bg-blue-500" }) {
  return (
    <div className="w-full rounded-full bg-green-200 h-5 overflow-hidden" style={{height : `${height}px`}}>
        <div className="h-full rounded-full bg-green-500 transition-all duration-300" style={{ width: `${progress}%` , height: `${height}px` }}>

        </div>
    </div>
  )
}