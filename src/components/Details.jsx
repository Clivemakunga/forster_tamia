import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function Details() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    const details = [
        {
            icon: "📅",
            title: "Date",
            info: "22 December 2026",
            color: "#0b1f4b",
        },
        {
            icon: "🕐",
            title: "Time",
            info: "09:30 AM",
            color: "#5fa8d3",
        },
        {
            icon: "📍",
            title: "Venue",
            info: "JOYOUS KINGDOM EVENTS",
            color: "#0b1f4b",
        },
        {
            icon: "💙",
            title: "Dress Code",
            info: "SHADES OF BLUE",
            color: "#0b1f4b",
        },
    ];

    const schedule = [
        { time: "09:00 AM", event: "Guest Arrival" },
        { time: "09:30 AM", event: "Wedding Ceremony Begins" },
        { time: "11:30 AM", event: "Photo Session & Refreshments" },
        { time: "01:00 PM", event: "Wedding Reception & Lunch" },
        { time: "03:30 PM", event: "Cake Cutting & First Dance" },
        { time: "05:00 PM", event: "Celebration & Music" },
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
                    <p style={styles.locationVenue}>JOYOUS KINGDOM EVENTS</p>
                    <p style={styles.locationText}>
                        Address: 18735 Richmond (just after Northlea High School)
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
                        #STRICTLY BY INVITE • #NO CHILDREN AND NO PLUS ONE
                    </p>
                </motion.div>
            </div>
        </section>
    );
}

const styles = {
    section: {
        padding: "100px 20px",
        backgroundColor: "#f2f8fd",
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
        background: "linear-gradient(90deg, transparent, #b8c2cf, transparent)",
        margin: "0 auto 20px",
    },
    title: {
        fontFamily: "'Playfair Display', serif",
        fontSize: "clamp(2.5rem, 5vw, 3.5rem)",
        color: "#0b1f4b",
        marginBottom: "15px",
    },
    subtitle: {
        fontSize: "1.125rem",
        color: "#5a6b85",
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
        color: "#1b2a4a",
        marginBottom: "10px",
    },
    cardInfo: {
        fontSize: "1.125rem",
        color: "#5a6b85",
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
        color: "#0b1f4b",
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
        backgroundColor: "#f2f8fd",
        borderRadius: "12px",
        border: "2px solid #dcebf7",
    },
    scheduleTime: {
        fontSize: "1.125rem",
        fontWeight: "700",
        color: "#5fa8d3",
        minWidth: "100px",
        fontFamily: "'Playfair Display', serif",
    },
    scheduleDivider: {
        width: "3px",
        height: "40px",
        backgroundColor: "#0b1f4b",
        borderRadius: "2px",
    },
    scheduleEvent: {
        fontSize: "1rem",
        color: "#1b2a4a",
        fontWeight: "500",
        flex: 1,
    },
    locationNote: {
        textAlign: "center",
        padding: "30px",
        backgroundColor: "rgba(0, 0, 0, 0.03)",
        borderRadius: "16px",
        border: "2px dashed #5fa8d3",
    },
    noteText: {
        fontSize: "1rem",
        color: "#1b2a4a",
        lineHeight: "1.6",
        maxWidth: "800px",
        margin: "0 auto",
    },
    locationTitle: {
        fontSize: "1.25rem",
        color: "#0b1f4b",
        fontWeight: "700",
        marginBottom: "10px",
    },
    locationVenue: {
        fontSize: "1.35rem",
        color: "#5fa8d3",
        fontFamily: "'Playfair Display', serif",
        fontWeight: "700",
        marginBottom: "6px",
    },
    importantNote: {
        textAlign: "center",
        padding: "30px",
        backgroundColor: "#e6f1fb",
        borderRadius: "16px",
        border: "2px solid #5fa8d3",
        marginTop: "20px",
    },
    importantTitle: {
        fontSize: "1.25rem",
        color: "#0b1f4b",
        fontWeight: "700",
        marginBottom: "10px",
    },
    importantText: {
        fontSize: "1rem",
        color: "#1b2a4a",
        fontWeight: "600",
        lineHeight: "1.6",
    },
};

