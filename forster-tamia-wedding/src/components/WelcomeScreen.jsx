import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function WelcomeScreen({ onNameSubmit }) {
    const [guestName, setGuestName] = useState("");
    const [isVisible, setIsVisible] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        // Check if guest name already exists in localStorage
        const savedName = localStorage.getItem("weddingGuestName");
        if (savedName) {
            setIsVisible(false);
            onNameSubmit(savedName);
        }
    }, [onNameSubmit]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (guestName.trim().length < 2) {
            setError("Please enter your name");
            return;
        }

        // Save to localStorage
        localStorage.setItem("weddingGuestName", guestName.trim());

        // Fade out animation
        setTimeout(() => {
            setIsVisible(false);
            onNameSubmit(guestName.trim());
        }, 300);
    };

    if (!isVisible) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                style={styles.overlay}
            >
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    style={styles.container}
                >
                    {/* Decorative Elements */}
                    <div style={styles.decorativeTop}>
                        <svg width="100" height="20" viewBox="0 0 100 20">
                            <path
                                d="M0,10 Q25,0 50,10 T100,10"
                                fill="none"
                                stroke="#d4af37"
                                strokeWidth="2"
                            />
                        </svg>
                    </div>

                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.4, duration: 0.6 }}
                    >
                        <h1 style={styles.title}>Welcome</h1>
                        <p style={styles.subtitle}>
                            You're invited to celebrate the union of
                        </p>
                        <h2 style={styles.coupleNames}>Forster & Tamia</h2>
                        <p style={styles.date}>3 April 2026</p>
                    </motion.div>

                    <motion.form
                        onSubmit={handleSubmit}
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.6, duration: 0.6 }}
                        style={styles.form}
                    >
                        <label htmlFor="guestName" style={styles.label}>
                            Please enter your name to continue
                        </label>
                        <input
                            id="guestName"
                            type="text"
                            value={guestName}
                            onChange={(e) => {
                                setGuestName(e.target.value);
                                setError("");
                            }}
                            placeholder="Your name"
                            style={{
                                ...styles.input,
                                borderColor: error ? "#ef4444" : "#e5e7eb",
                            }}
                            autoFocus
                        />
                        {error && <p style={styles.error}>{error}</p>}

                        <button type="submit" className="btn-primary" style={styles.button}>
                            Enter
                        </button>
                    </motion.form>

                    {/* Decorative Elements */}
                    <div style={styles.decorativeBottom}>
                        <svg width="100" height="20" viewBox="0 0 100 20">
                            <path
                                d="M0,10 Q25,20 50,10 T100,10"
                                fill="none"
                                stroke="#000000"
                                strokeWidth="2"
                            />
                        </svg>
                    </div>

                    {/* Cultural Pattern Background */}
                    <div style={styles.patternBg}></div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}

const styles = {
    overlay: {
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(250, 248, 243, 0.98)",
        backdropFilter: "blur(10px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
        padding: "20px",
    },
    container: {
        position: "relative",
        backgroundColor: "#ffffff",
        borderRadius: "24px",
        padding: "60px 40px",
        maxWidth: "500px",
        width: "100%",
        boxShadow: "0 20px 60px rgba(0, 0, 0, 0.15)",
        textAlign: "center",
        overflow: "hidden",
    },
    decorativeTop: {
        marginBottom: "30px",
        display: "flex",
        justifyContent: "center",
    },
    decorativeBottom: {
        marginTop: "30px",
        display: "flex",
        justifyContent: "center",
    },
    title: {
        fontFamily: "'Playfair Display', serif",
        fontSize: "clamp(2rem, 5vw, 3rem)",
        color: "#000000",
        marginBottom: "10px",
        fontWeight: "700",
    },
    subtitle: {
        fontSize: "1rem",
        color: "#6b7280",
        marginBottom: "20px",
    },
    coupleNames: {
        fontFamily: "'Playfair Display', serif",
        fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
        color: "#d4af37",
        marginBottom: "10px",
        fontWeight: "700",
    },
    date: {
        fontSize: "1.125rem",
        color: "#1f2937",
        marginBottom: "40px",
        fontWeight: "500",
    },
    form: {
        marginTop: "30px",
    },
    label: {
        display: "block",
        fontSize: "0.95rem",
        color: "#1f2937",
        marginBottom: "15px",
        fontWeight: "600",
    },
    input: {
        width: "100%",
        padding: "14px 20px",
        fontSize: "1rem",
        border: "2px solid #e5e7eb",
        borderRadius: "12px",
        marginBottom: "10px",
        transition: "all 0.2s ease",
        fontFamily: "'Inter', sans-serif",
    },
    error: {
        color: "#ef4444",
        fontSize: "0.875rem",
        marginBottom: "15px",
        marginTop: "-5px",
    },
    button: {
        width: "100%",
        marginTop: "10px",
    },
    patternBg: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        opacity: 0.03,
        backgroundImage: `
            repeating-linear-gradient(45deg, transparent, transparent 10px, #000000 10px, #000000 11px),
            repeating-linear-gradient(-45deg, transparent, transparent 10px, #d4af37 10px, #d4af37 11px)
        `,
        pointerEvents: "none",
        zIndex: -1,
    },
};
