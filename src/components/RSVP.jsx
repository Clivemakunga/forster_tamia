import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function RSVP() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section id="rsvp-section" ref={ref} style={styles.section}>
            <div style={styles.container}>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    style={styles.header}
                >
                    <div style={styles.decorativeLine} />
                    <h2 style={styles.title}>RSVP</h2>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.3, duration: 0.6 }}
                    style={styles.closedCard}
                >
                    <div style={styles.icon}>💌</div>
                    <h3 style={styles.closedTitle}>RSVP is Now Closed</h3>
                    <p style={styles.closedText}>
                        The RSVP period has ended. We look forward to celebrating with you!
                    </p>
                    <p style={styles.closedNote}>3 April 2026 ❤️</p>
                </motion.div>
            </div>
        </section>
    );
}

const styles = {
    section: {
        padding: "100px 20px",
        backgroundColor: "#faf8f3",
        position: "relative",
    },
    container: {
        maxWidth: "600px",
        margin: "0 auto",
    },
    header: {
        textAlign: "center",
        marginBottom: "50px",
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
        marginBottom: "0",
    },
    closedCard: {
        backgroundColor: "#ffffff",
        padding: "60px 40px",
        borderRadius: "24px",
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
        textAlign: "center",
    },
    icon: {
        fontSize: "3.5rem",
        marginBottom: "20px",
    },
    closedTitle: {
        fontFamily: "'Playfair Display', serif",
        fontSize: "1.8rem",
        color: "#1f2937",
        marginBottom: "16px",
    },
    closedText: {
        fontSize: "1.1rem",
        color: "#6b7280",
        lineHeight: "1.6",
        marginBottom: "24px",
    },
    closedNote: {
        fontSize: "1rem",
        color: "#d4af37",
        fontWeight: "600",
    },
};

