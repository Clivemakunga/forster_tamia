import { useState, useEffect } from "react";

export default function MusicButton() {
    const [on, setOn] = useState(false);

    useEffect(() => {
        const audio = document.getElementById("music");
        if (!audio) return;
        on ? audio.play() : audio.pause();
    }, [on]);

    return (
        <>
            <audio id="music" loop src="/music.mp3" />
            <button
                onClick={() => setOn(!on)}
                style={{ position: "fixed", bottom: 20, right: 20 }}
            >
                {on ? "🔊" : "🔈"}
            </button>
        </>
    );
}
