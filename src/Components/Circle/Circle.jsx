export default function Circle({animateRef, totalSecond}){
    return(
       <div className="timer__display">
               <svg
                    ref={animateRef}
                    width="400"
                    height="400"
                    viewBox="0 0 200 200"
                    style={{ display: "block" }}
                >
                <circle
                    cx="100"
                   cy="100"
                   r="90"
                   stroke="blue"
                   strokeWidth="4"
                    fill="none"
                   strokeDasharray="566"
                >
                    <animate
                        attributeName="stroke-dashoffset"
                        from="0"
                        to="566"
                        dur={`${totalSecond}s`}
                        fill="freeze"
                    />
               </circle>
           </svg>
        </div>
    )
}