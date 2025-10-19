export default function Circle({run, min, second, initialTime, currentVideo}){
    const circleSize = 300;
    const strokeWidth = 8;
    const radius = (circleSize - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const totalSecond = min * 60 + second;
    const progress = totalSecond / initialTime;
    const offset = circumference - (progress * circumference);
    

    return(
       <div className="timer__display">
            <svg
                width={circleSize}
                height={circleSize}
                style={{ transform: 'rotate(-90deg)', marginLeft:"40px", marginTop:"22px", }}
                                
            >

            <circle
                cx={circleSize / 2}
                cy={circleSize / 2}
                r={radius}
                stroke="rgba(255, 255, 255, 0.1)"
                strokeWidth={strokeWidth}
                fill="none"
            />

            <circle
                cx={circleSize / 2}
                cy={circleSize / 2}
                r={radius}
                stroke={currentVideo === 'work' ? '#ef4444' : '#22c55e'}
                strokeWidth={strokeWidth}
                fill="none"
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                strokeLinecap="round"
                style={{
                    transition: run ? 'stroke-dashoffset 1s linear' : 'stroke-dashoffset 0.3s ease'
                }}
            />
            </svg>
        </div>
    )
}