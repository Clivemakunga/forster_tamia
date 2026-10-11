import { useState } from "react";
import WelcomeScreen from "./components/WelcomeScreen";
import SectionNavigator from "./components/SectionNavigator";
import MusicButton from "./components/MusicButton";

export default function RootApp() {
    const [guestName, setGuestName] = useState("");

    const handleNameSubmit = (name) => {
        setGuestName(name);
    };

    return (
        <>
            <WelcomeScreen onNameSubmit={handleNameSubmit} />
            <div style={{ fontFamily: "'Inter', sans-serif", background: "#f2f8fd", color: "#1b2a4a" }}>
                <MusicButton />
                <SectionNavigator />

                {/* Footer */}
                <footer style={styles.footer}>
                    <p style={styles.footerText}>
                        Prudence & Sisa • 22 December 2026
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
        backgroundColor: "#0b1f4b",
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
        color: "#f2f8fd",
        fontSize: "0.95rem",
    },
};

