import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function Details() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    const details = [
        {
            icon: "📅",
            title: "Date",
            info: "3 April 2026",
            color: "#000000",
        },
        {
            icon: "🕐",
            title: "Time",
            info: "2:00 PM till late",
            color: "#d4af37",
        },
        {
            icon: "📍",
            title: "Venue",
            info: "Lakeside Events next to Mbokodo",
            color: "#000000",
        },
        {
            icon: "🖤",
            title: "Dress Code",
            info: "Strictly All Black",
            color: "#000000",
        },
    ];

    const schedule = [
        { time: "2:00 PM", event: "Guest Arrival & Reception" },
        { time: "3:00 PM", event: "Ceremony Begins" },
        { time: "4:30 PM", event: "Cocktail Hour" },
        { time: "6:00 PM", event: "Dinner & Celebration" },
        { time: "8:00 PM", event: "First Dance" },
        { time: "9:00 PM", event: "Party till late" },
    ];

    return (
        <section id="details-section" ref={ref} style={styles.section}>
            <div style={styles.container}>
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    style={styles.header}
                >
                    <div style={styles.decorativeLine} />
                    <h2 style={styles.title}>Wedding Details</h2>
                    <p style={styles.subtitle}>
                        Everything you need to know about our special day
                    </p>
                </motion.div>

                {/* Info Cards */}
                <div style={styles.cardsGrid}>
                    {details.map((detail, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            whileHover={{ y: -10, scale: 1.02 }}
                            style={styles.card}
                        >
                            <div
                                style={{
                                    ...styles.iconCircle,
                                    backgroundColor: detail.color,
                                }}
                            >
                                <span style={styles.icon}>{detail.icon}</span>
                            </div>
                            <h3 style={styles.cardTitle}>{detail.title}</h3>
                            <p style={styles.cardInfo}>{detail.info}</p>
                        </motion.div>
                    ))}
                </div>

                {/* Schedule Section */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.6, duration: 0.6 }}
                    style={styles.scheduleSection}
                >
                    <h3 style={styles.scheduleTitle}>Schedule of Events</h3>
                    <div style={styles.scheduleGrid}>
                        {schedule.map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                animate={isInView ? { opacity: 1, x: 0 } : {}}
                                transition={{ delay: 0.8 + index * 0.1, duration: 0.4 }}
                                style={styles.scheduleItem}
                            >
                                <div style={styles.scheduleTime}>{item.time}</div>
                                <div style={styles.scheduleDivider} />
                                <div style={styles.scheduleEvent}>{item.event}</div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Location Note */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 1.2, duration: 0.6 }}
                    style={styles.locationNote}
                >
                    <p style={styles.locationTitle}>📍 Venue Location</p>
                    <p style={styles.locationText}>
                        Lakeside Events is located next to Mbokodo. Ample parking available on-site.
                    </p>
                </motion.div>

                {/* Important Note */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 1.4, duration: 0.6 }}
                    style={styles.importantNote}
                >
                    <p style={styles.importantTitle}>⚠️ Important Notice</p>
                    <p style={styles.importantText}>
                        No children allowed • Strictly by invitation • No plus one
                    </p>
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
        maxWidth: "1200px",
        margin: "0 auto",
    },
    header: {
        textAlign: "center",
        marginBottom: "60px",
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
    cardsGrid: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
        gap: "30px",
        marginBottom: "80px",
    },
    card: {
        backgroundColor: "#ffffff",
        padding: "40px 30px",
        borderRadius: "20px",
        textAlign: "center",
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
        transition: "all 0.3s ease",
        border: "2px solid transparent",
    },
    iconCircle: {
        width: "80px",
        height: "80px",
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        margin: "0 auto 20px",
        boxShadow: "0 4px 15px rgba(0, 0, 0, 0.15)",
    },
    icon: {
        fontSize: "2.5rem",
    },
    cardTitle: {
        fontFamily: "'Playfair Display', serif",
        fontSize: "1.5rem",
        color: "#1f2937",
        marginBottom: "10px",
    },
    cardInfo: {
        fontSize: "1.125rem",
        color: "#6b7280",
        fontWeight: "500",
    },
    scheduleSection: {
        backgroundColor: "#ffffff",
        padding: "50px 40px",
        borderRadius: "24px",
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
        marginBottom: "40px",
    },
    scheduleTitle: {
        fontFamily: "'Playfair Display', serif",
        fontSize: "2rem",
        color: "#000000",
        textAlign: "center",
        marginBottom: "40px",
    },
    scheduleGrid: {
        display: "grid",
        gap: "20px",
        maxWidth: "700px",
        margin: "0 auto",
    },
    scheduleItem: {
        display: "flex",
        alignItems: "center",
        gap: "20px",
        padding: "20px",
        backgroundColor: "#faf8f3",
        borderRadius: "12px",
        border: "2px solid #f5f5dc",
    },
    scheduleTime: {
        fontSize: "1.125rem",
        fontWeight: "700",
        color: "#d4af37",
        minWidth: "100px",
        fontFamily: "'Playfair Display', serif",
    },
    scheduleDivider: {
        width: "3px",
        height: "40px",
        backgroundColor: "#000000",
        borderRadius: "2px",
    },
    scheduleEvent: {
        fontSize: "1rem",
        color: "#1f2937",
        fontWeight: "500",
        flex: 1,
    },
    locationNote: {
        textAlign: "center",
        padding: "30px",
        backgroundColor: "rgba(0, 0, 0, 0.03)",
        borderRadius: "16px",
        border: "2px dashed #d4af37",
    },
    noteText: {
        fontSize: "1rem",
        color: "#1f2937",
        lineHeight: "1.6",
        maxWidth: "800px",
        margin: "0 auto",
    },
    locationTitle: {
        fontSize: "1.25rem",
        color: "#000000",
        fontWeight: "700",
        marginBottom: "10px",
    },
    importantNote: {
        textAlign: "center",
        padding: "30px",
        backgroundColor: "#fef3c7",
        borderRadius: "16px",
        border: "2px solid #d4af37",
        marginTop: "20px",
    },
    importantTitle: {
        fontSize: "1.25rem",
        color: "#000000",
        fontWeight: "700",
        marginBottom: "10px",
    },
    importantText: {
        fontSize: "1rem",
        color: "#1f2937",
        fontWeight: "600",
        lineHeight: "1.6",
    },
};

