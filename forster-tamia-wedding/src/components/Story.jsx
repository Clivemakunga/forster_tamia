import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function Story() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    const timelineEvents = [
        {
            year: "2020",
            title: "First Meeting",
            description: "Our paths crossed by chance, and a beautiful friendship began.",
        },
        {
            year: "2023",
            title: "Falling in Love",
            description: "Friendship blossomed into something deeper and more meaningful.",
        },
        {
            year: "2025",
            title: "The Proposal",
            description: "A magical moment when forever became a promise.",
        },
        {
            year: "2027",
            title: "Our Wedding Day",
            description: "The beginning of our lifelong journey together.",
        },
    ];

    return (
        <section ref={ref} style={styles.section}>
            <div style={styles.container}>
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    style={styles.header}
                >
                    <div style={styles.decorativeLine} />
                    <h2 style={styles.title}>Our Story</h2>
                    <p style={styles.subtitle}>
                        A journey of love, friendship, and commitment
                    </p>
                </motion.div>

                {/* Timeline */}
                <div style={styles.timeline}>
                    {timelineEvents.map((event, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                            animate={isInView ? { opacity: 1, x: 0 } : {}}
                            transition={{ delay: index * 0.2, duration: 0.6 }}
                            style={{
                                ...styles.timelineItem,
                                alignSelf: index % 2 === 0 ? "flex-start" : "flex-end",
                            }}
                        >
                            <div style={styles.timelineCard}>
                                <div style={styles.yearBadge}>{event.year}</div>
                                <h3 style={styles.eventTitle}>{event.title}</h3>
                                <p style={styles.eventDescription}>{event.description}</p>
                            </div>

                            {/* Timeline Dot */}
                            <div style={styles.timelineDot} />
                        </motion.div>
                    ))}
                </div>

                {/* Couple Photos */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.8, duration: 0.6 }}
                    style={styles.photosSection}
                >
                    <div style={styles.photoGrid}>
                        <motion.div
                            whileHover={{ scale: 1.05, rotate: -2 }}
                            transition={{ duration: 0.3 }}
                            style={styles.photoCard}
                        >
                            <img
                                src="/images/couple-1.jpg"
                                alt="Forster & Tamia"
                                style={styles.photo}
                            />
                            <div style={styles.photoOverlay}>
                                <p style={styles.photoCaption}>Traditional Elegance</p>
                            </div>
                        </motion.div>

                        <motion.div
                            whileHover={{ scale: 1.05, rotate: 2 }}
                            transition={{ duration: 0.3 }}
                            style={styles.photoCard}
                        >
                            <img
                                src="/images/couple-2.jpg"
                                alt="Forster & Tamia"
                                style={styles.photo}
                            />
                            <div style={styles.photoOverlay}>
                                <p style={styles.photoCaption}>Love & Joy</p>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>

                {/* Cultural Pattern Divider */}
                <div style={styles.patternDivider}>
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
                </div>
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
    timeline: {
        position: "relative",
        display: "flex",
        flexDirection: "column",
        gap: "40px",
        marginBottom: "80px",
        padding: "0 20px",
    },
    timelineItem: {
        position: "relative",
        width: "100%",
        maxWidth: "500px",
    },
    timelineCard: {
        backgroundColor: "#faf8f3",
        padding: "30px",
        borderRadius: "16px",
        boxShadow: "0 4px 15px rgba(0, 0, 0, 0.08)",
        border: "2px solid #f5f5dc",
        position: "relative",
    },
    yearBadge: {
        display: "inline-block",
        backgroundColor: "#000000",
        color: "#ffffff",
        padding: "8px 20px",
        borderRadius: "20px",
        fontSize: "0.875rem",
        fontWeight: "700",
        marginBottom: "15px",
        letterSpacing: "1px",
    },
    eventTitle: {
        fontFamily: "'Playfair Display', serif",
        fontSize: "1.75rem",
        color: "#1f2937",
        marginBottom: "10px",
    },
    eventDescription: {
        fontSize: "1rem",
        color: "#6b7280",
        lineHeight: "1.6",
    },
    timelineDot: {
        position: "absolute",
        top: "30px",
        left: "50%",
        transform: "translateX(-50%)",
        width: "16px",
        height: "16px",
        backgroundColor: "#d4af37",
        borderRadius: "50%",
        border: "4px solid #ffffff",
        boxShadow: "0 0 0 4px #d4af37",
        zIndex: 1,
    },
    photosSection: {
        marginTop: "60px",
    },
    photoGrid: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        gap: "30px",
        maxWidth: "900px",
        margin: "0 auto",
    },
    photoCard: {
        position: "relative",
        borderRadius: "20px",
        overflow: "hidden",
        boxShadow: "0 10px 30px rgba(0, 0, 0, 0.15)",
        cursor: "pointer",
    },
    photo: {
        width: "100%",
        height: "400px",
        objectFit: "cover",
        display: "block",
    },
    photoOverlay: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        background: "linear-gradient(to top, rgba(0, 0, 0, 0.7), transparent)",
        padding: "30px 20px 20px",
        opacity: 0,
        transition: "opacity 0.3s ease",
    },
    photoCaption: {
        color: "#ffffff",
        fontSize: "1.25rem",
        fontWeight: "600",
        textAlign: "center",
    },
    patternDivider: {
        display: "flex",
        justifyContent: "center",
        marginTop: "60px",
        opacity: 0.6,
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

