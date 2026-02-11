import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import RSVPModal from "./RSVPModal";


export default function Hero() {
    const ref = useRef(null);
    const { scrollY } = useScroll();
    const isInView = useInView(ref, { once: true });

    const [guestName, setGuestName] = useState("");
    const [showRSVPModal, setShowRSVPModal] = useState(false);
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    });

    // Parallax effect
    const y = useTransform(scrollY, [0, 500], [0, 150]);

    useEffect(() => {
        const savedName = localStorage.getItem("weddingGuestName");
        if (savedName) {
            setGuestName(savedName);
        }
    }, []);

    useEffect(() => {
        const calculateTimeLeft = () => {
            const weddingDate = new Date("2026-04-03T14:00:00");
            const now = new Date();
            const difference = weddingDate - now;

            if (difference > 0) {
                setTimeLeft({
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                    minutes: Math.floor((difference / 1000 / 60) % 60),
                    seconds: Math.floor((difference / 1000) % 60),
                });
            }
        };

        calculateTimeLeft();
        const timer = setInterval(calculateTimeLeft, 1000);
        return () => clearInterval(timer);
    }, []);

    // Collage images configuration
    const collageImages = [
        { src: "/images/couple-1.jpg", delay: 0, rotation: -8, scale: 1.1 },
        { src: "/images/couple-2.jpg", delay: 0.5, rotation: 5, scale: 1.2 },
        { src: "/images/couple-1.jpg", delay: 1, rotation: -12, scale: 0.9 },
        { src: "/images/couple-2.jpg", delay: 1.5, rotation: 10, scale: 1.15 },
        { src: "/images/couple-1.jpg", delay: 2, rotation: -5, scale: 1.05 },
    ];

    return (
        <section ref={ref} style={styles.section}>
            {/* Animated Photo Collage Background */}
            <div style={styles.collageContainer}>
                {collageImages.map((image, index) => (
                    <motion.div
                        key={index}
                        style={{
                            ...styles.collageImage,
                            top: `${15 + (index * 15)}%`,
                            left: `${10 + (index * 18)}%`,
                        }}
                        initial={{
                            opacity: 0,
                            scale: 0.8,
                            rotate: image.rotation
                        }}
                        animate={{
                            opacity: [0.3, 0.5, 0.3],
                            scale: [image.scale, image.scale * 1.1, image.scale],
                            rotate: [image.rotation, image.rotation + 5, image.rotation],
                            y: [0, -20, 0],
                        }}
                        transition={{
                            delay: image.delay,
                            duration: 8 + index,
                            repeat: Infinity,
                            repeatType: "reverse",
                            ease: "easeInOut",
                        }}
                    >
                        <img
                            src={image.src}
                            alt="Wedding moment"
                            style={styles.collageImg}
                        />
                    </motion.div>
                ))}

                {/* Gradient Overlay */}
                <div style={styles.overlay} />
            </div>

            {/* Content */}
            <motion.div style={{ ...styles.content, y }}>
                {/* Personalized Greeting */}
                {guestName && (
                    <motion.p
                        initial={{ opacity: 0, y: -20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.3, duration: 0.8 }}
                        style={styles.greeting}
                    >
                        WELCOME, {guestName.toUpperCase()}!
                    </motion.p>
                )}

                {/* Subtitle */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    style={styles.subtitle}
                >
                    WE ARE GETTING MARRIED
                </motion.p>

                {/* Names */}
                <motion.h1
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.7, duration: 1 }}
                    style={styles.title}
                >
                    Forster <span style={styles.ampersand}>&</span> Tamia
                </motion.h1>

                {/* Date */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.9, duration: 0.8 }}
                    style={styles.date}
                >
                    3 April 2026
                </motion.p>

                {/* Decorative Line */}
                <motion.div
                    initial={{ width: 0 }}
                    animate={isInView ? { width: "150px" } : {}}
                    transition={{ delay: 1.1, duration: 0.8 }}
                    style={styles.decorativeLine}
                />

                {/* Countdown Timer */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 1.3, duration: 0.8 }}
                    style={styles.countdown}
                >
                    <div style={styles.countdownItem}>
                        <div style={styles.countdownNumber}>{timeLeft.days}</div>
                        <div style={styles.countdownLabel}>DAYS</div>
                    </div>
                    <div style={styles.countdownDivider}>:</div>
                    <div style={styles.countdownItem}>
                        <div style={styles.countdownNumber}>{timeLeft.hours}</div>
                        <div style={styles.countdownLabel}>HOURS</div>
                    </div>
                    <div style={styles.countdownDivider}>:</div>
                    <div style={styles.countdownItem}>
                        <div style={styles.countdownNumber}>{timeLeft.minutes}</div>
                        <div style={styles.countdownLabel}>MINUTES</div>
                    </div>
                    <div style={styles.countdownDivider}>:</div>
                    <div style={styles.countdownItem}>
                        <div style={styles.countdownNumber}>{timeLeft.seconds}</div>
                        <div style={styles.countdownLabel}>SECONDS</div>
                    </div>
                </motion.div>

                {/* RSVP Button */}
                <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 1.5, duration: 0.8 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowRSVPModal(true)}
                    style={styles.rsvpButton}
                >
                    RSVP Now
                </motion.button>
            </motion.div>

            {/* RSVP Modal */}
            <RSVPModal
                isOpen={showRSVPModal}
                onClose={() => setShowRSVPModal(false)}
            />

        </section>
    );
}

const styles = {
    section: {
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        backgroundColor: "#000000",
    },
    collageContainer: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        overflow: "hidden",
    },
    collageImage: {
        position: "absolute",
        width: "400px",
        height: "500px",
        borderRadius: "20px",
        overflow: "hidden",
        boxShadow: "0 20px 60px rgba(0, 0, 0, 0.4)",
        border: "4px solid rgba(255, 255, 255, 0.2)",
    },
    collageImg: {
        width: "100%",
        height: "100%",
        objectFit: "cover",
        filter: "brightness(0.85)",
    },
    overlay: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "linear-gradient(135deg, rgba(0, 0, 0, 0.5) 0%, rgba(26, 26, 26, 0.4) 50%, rgba(212, 175, 55, 0.2) 100%)",
        zIndex: 1,
    },
    content: {
        position: "relative",
        zIndex: 2,
        textAlign: "center",
        padding: "40px 20px",
        maxWidth: "900px",
    },
    decorativeLine: {
        width: "150px",
        height: "3px",
        background: "linear-gradient(90deg, transparent, #d4af37, transparent)",
        margin: "0 auto 30px",
    },
    greeting: {
        fontSize: "1.25rem",
        color: "#faf8f3",
        marginBottom: "20px",
        fontWeight: "500",
        letterSpacing: "1px",
        textTransform: "uppercase",
    },
    subtitle: {
        fontSize: "1.125rem",
        color: "#faf8f3",
        marginBottom: "15px",
        fontWeight: "400",
        letterSpacing: "2px",
        textTransform: "uppercase",
    },
    title: {
        fontFamily: "'Playfair Display', serif",
        fontSize: "clamp(3rem, 8vw, 5.5rem)",
        color: "#ffffff",
        marginBottom: "20px",
        fontWeight: "800",
        lineHeight: "1.1",
        textShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
    },
    ampersand: {
        color: "#d4af37",
        fontStyle: "italic",
        margin: "0 15px",
    },
    date: {
        fontSize: "1.5rem",
        color: "#faf8f3",
        marginBottom: "50px",
        fontWeight: "500",
        letterSpacing: "1px",
    },
    countdown: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "4px",
        flexWrap: "nowrap",
        marginTop: "40px",
        marginBottom: "60px",
        maxWidth: "100%",
        overflow: "hidden",
    },
    countdownItem: {
        backgroundColor: "rgba(255, 255, 255, 0.15)",
        backdropFilter: "blur(10px)",
        borderRadius: "10px",
        padding: "8px 6px",
        width: "60px",
        flex: "0 0 auto",
        border: "2px solid rgba(255, 255, 255, 0.2)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
    },
    countdownNumber: {
        fontSize: "clamp(1.2rem, 4vw, 1.5rem)",
        fontWeight: "700",
        color: "#ffffff",
        fontFamily: "'Playfair Display', serif",
        lineHeight: "1",
    },
    countdownLabel: {
        fontSize: "clamp(0.5rem, 2vw, 0.6rem)",
        color: "#faf8f3",
        textTransform: "uppercase",
        letterSpacing: "0.5px",
        marginTop: "4px",
        lineHeight: "1",
    },
    countdownDivider: {
        fontSize: "clamp(1rem, 3vw, 1.2rem)",
        color: "#ffffff",
        fontWeight: "300",
        lineHeight: "1",
        flex: "0 0 auto",
    },
    scrollButton: {
        position: "absolute",
        bottom: "30px",
        left: "50%",
        transform: "translateX(-50%)",
        textAlign: "center",
        background: "rgba(255, 255, 255, 0.1)",
        backdropFilter: "blur(10px)",
        border: "2px solid rgba(212, 175, 55, 0.5)",
        borderRadius: "50px",
        padding: "15px 30px",
        cursor: "pointer",
        transition: "all 0.3s ease",
        zIndex: 10,
    },
    scrollArrow: {
        fontSize: "1.5rem",
        color: "#d4af37",
        marginBottom: "5px",
        fontWeight: "bold",
    },
    scrollText: {
        fontSize: "0.75rem",
        color: "#faf8f3",
        textTransform: "uppercase",
        letterSpacing: "1.5px",
        fontWeight: "500",
    },
    rsvpButton: {
        backgroundColor: "#d4af37",
        color: "#000000",
        border: "none",
        padding: "18px 50px",
        fontSize: "1.125rem",
        fontWeight: "700",
        borderRadius: "50px",
        cursor: "pointer",
        letterSpacing: "1.5px",
        textTransform: "uppercase",
        marginTop: "30px",
        boxShadow: "0 8px 25px rgba(212, 175, 55, 0.4)",
        transition: "all 0.3s ease",
    },
};

