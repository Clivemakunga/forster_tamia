import { useState } from "react";
import WelcomeScreen from "./components/WelcomeScreen";
import Hero from "./components/Hero";
import Story from "./components/Story";
import Details from "./components/Details";
import Gallery from "./components/Gallery";
import RSVP from "./components/RSVP";
import MusicButton from "./components/MusicButton";

export default function RootApp() {
    const [guestName, setGuestName] = useState("");

    const handleNameSubmit = (name) => {
        setGuestName(name);
    };

    return (
        <>
            <WelcomeScreen onNameSubmit={handleNameSubmit} />
            <div style={{ fontFamily: "'Inter', sans-serif", background: "#faf8f3", color: "#1f2937" }}>
                <MusicButton />
                <Hero />
                <Story />
                <Details />
                <Gallery />
                <RSVP />

                {/* Footer */}
                <footer style={styles.footer}>
                    <p style={styles.footerText}>
                        Forster & Tamia • 3 April 2026
                    </p>
                    <p style={styles.footerSubtext}>
                        Made with ❤️ for our special day
                    </p>
                </footer>
            </div>
        </>
    );
}

const styles = {
    footer: {
        backgroundColor: "#1e40af",
        padding: "40px 20px",
        textAlign: "center",
    },
    footerText: {
        color: "#ffffff",
        fontSize: "1.125rem",
        fontWeight: "600",
        marginBottom: "10px",
        fontFamily: "'Playfair Display', serif",
    },
    footerSubtext: {
        color: "#faf8f3",
        fontSize: "0.95rem",
    },
};

