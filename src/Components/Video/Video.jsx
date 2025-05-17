export default function Video({currentVideo, video}){
    return(
        <video
                key={currentVideo}
                autoPlay
                muted
                loop
                playsInline
                style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                zIndex: -1,
                top: 0,
                left: 0
                }}
            >
                <source src={video[currentVideo]} type="video/mp4" />
        </video>
    )   
}