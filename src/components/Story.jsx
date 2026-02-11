import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function Story() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section id="story-section" ref={ref} style={styles.section}>
            <div style={styles.container}>
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    style={styles.header}
                >
                    <div style={styles.decorativeLine} />
                    <h2 style={styles.title}>Our Foundation</h2>
                    <p style={styles.subtitle}>
                        Words that inspire our journey together
                    </p>
                </motion.div>

                {/* Scripture Card */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.3, duration: 0.8 }}
                    style={styles.scriptureCard}
                >
                    <div style={styles.scriptureReference}>Ruth 1:16</div>

                    <div style={styles.scriptureText}>
                        <p style={styles.scriptureLine}>
                            "Entreat me not to leave you,
                        </p>
                        <p style={styles.scriptureLine}>
                            Or to turn back from following after you;
                        </p>
                        <p style={styles.scriptureLine}>
                            For wherever you go, I will go;
                        </p>
                        <p style={styles.scriptureLine}>
                            And wherever you lodge, I will lodge;
                        </p>
                        <p style={styles.scriptureLine}>
                            Your people shall be my people,
                        </p>
                        <p style={styles.scriptureLine}>
                            And your God, my God."
                        </p>
                    </div>

                    <div style={styles.scriptureFootnote}>
                        A promise of unwavering commitment and love
                    </div>
                </motion.div>

                {/* Cultural Pattern Divider */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 0.6 } : {}}
                    transition={{ delay: 0.6, duration: 0.6 }}
                    style={styles.patternDivider}
                >
                    <svg width="200" height="40" viewBox="0 0 200 40">
                        <path
                            d="M0,20 Q50,10 100,20 T200,20"
                            fill="none"
                            stroke="#000000"
                            strokeWidth="2"
                        />
                        <path
                            d="M0,20 Q50,30 100,20 T200,20"
                            fill="none"
                            stroke="#d4af37"
                            strokeWidth="2"
                        />
                    </svg>
                </motion.div>
            </div>
        </section>
    );
}

const styles = {
    section: {
        padding: "100px 20px",
        backgroundColor: "#ffffff",
        position: "relative",
    },
    container: {
        maxWidth: "1200px",
        margin: "0 auto",
    },
    header: {
        textAlign: "center",
        marginBottom: "80px",
    },
    decorativeLine: {
        width: "100px",
        height: "3px",
        background: "linear-gradient(90deg, transparent, #d4af37, transparent)",
        margin: "0 auto 20px",
    },
    title: {
        fontFamily: "'Playfair Display', serif",
        fontSize: "clamp(2.5rem, 5vw, 3.5rem)",
        color: "#000000",
        marginBottom: "15px",
    },
    subtitle: {
        fontSize: "1.125rem",
        color: "#6b7280",
        fontStyle: "italic",
    },
    scriptureCard: {
        backgroundColor: "#faf8f3",
        padding: "60px 40px",
        borderRadius: "24px",
        boxShadow: "0 10px 40px rgba(0, 0, 0, 0.1)",
        border: "3px solid #d4af37",
        maxWidth: "800px",
        margin: "0 auto",
    },
    scriptureReference: {
        fontFamily: "'Playfair Display', serif",
        fontSize: "1.5rem",
        color: "#d4af37",
        fontWeight: "700",
        textAlign: "center",
        marginBottom: "30px",
        letterSpacing: "1px",
    },
    scriptureText: {
        marginBottom: "30px",
    },
    scriptureLine: {
        fontFamily: "'Playfair Display', serif",
        fontSize: "clamp(1.125rem, 2.5vw, 1.375rem)",
        color: "#1f2937",
        lineHeight: "1.8",
        marginBottom: "12px",
        fontStyle: "italic",
        textAlign: "center",
    },
    scriptureFootnote: {
        fontSize: "1rem",
        color: "#6b7280",
        textAlign: "center",
        fontStyle: "italic",
        paddingTop: "20px",
        borderTop: "2px solid #e5e7eb",
    },
    patternDivider: {
        display: "flex",
        justifyContent: "center",
        marginTop: "60px",
    },
};

// Add hover effect for photo overlay via CSS-in-JS workaround
if (typeof document !== "undefined") {
    const style = document.createElement("style");
    style.textContent = `
        .photo-card:hover .photo-overlay {
            opacity: 1 !important;
        }
    `;
    document.head.appendChild(style);
}


