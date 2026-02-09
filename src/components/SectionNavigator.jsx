import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Hero from "./Hero";
import Story from "./Story";
import Details from "./Details";
import Gallery from "./Gallery";
import RSVP from "./RSVP";

export default function SectionNavigator() {
    const [currentSection, setCurrentSection] = useState(0);
    const [unlockedSections, setUnlockedSections] = useState([0]); // Hero is unlocked by default

    const sections = [
        { id: 0, name: "HERO", component: Hero, nextButton: "See Our Story" },
        { id: 1, name: "STORY", component: Story, nextButton: "View Details" },
        { id: 2, name: "DETAILS", component: Details, nextButton: "View Gallery" },
        { id: 3, name: "GALLERY", component: Gallery, nextButton: "RSVP Now" },
        { id: 4, name: "RSVP", component: RSVP, nextButton: null },
    ];

    const unlockNextSection = () => {
        const nextSectionId = currentSection + 1;
        if (nextSectionId < sections.length) {
            setUnlockedSections(prev => [...prev, nextSectionId]);
            setCurrentSection(nextSectionId);

            // Scroll to top of new section
            setTimeout(() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }, 100);
        }
    };

    const navigateToSection = (sectionId) => {
        if (unlockedSections.includes(sectionId)) {
            setCurrentSection(sectionId);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };



    const CurrentComponent = sections[currentSection].component;
    const nextButtonText = sections[currentSection].nextButton;

    return (
        <div style={styles.container}>
            {/* Breadcrumb Navigation - Shows unlocked sections */}
            {unlockedSections.length > 1 && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={styles.breadcrumb}
                >
                    {sections
                        .filter(section => unlockedSections.includes(section.id))
                        .map((section) => (
                            <button
                                key={section.id}
                                onClick={() => navigateToSection(section.id)}
                                style={{
                                    ...styles.breadcrumbItem,
                                    ...(currentSection === section.id ? styles.breadcrumbActive : {}),
                                }}
                            >
                                {section.name}
                            </button>
                        ))}
                </motion.div>
            )}

            {/* Current Section */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentSection}
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.5 }}
                    style={styles.sectionWrapper}
                >
                    <CurrentComponent hideDefaultButton={true} />
                </motion.div>
            </AnimatePresence>

            {/* Envelope-style Next Button */}
            {nextButtonText && (
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{
                        opacity: 1,
                        x: 0,
                        y: [0, -8, 0]
                    }}
                    transition={{
                        opacity: { delay: 1.5, duration: 0.6 },
                        x: { delay: 1.5, duration: 0.6 },
                        y: {
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }
                    }}
                    style={styles.envelopeContainer}
                >
                    <motion.button
                        whileHover={{ scale: 1.08, boxShadow: "0 6px 20px rgba(212, 175, 55, 0.5)" }}
                        whileTap={{ scale: 0.95 }}
                        onClick={unlockNextSection}
                        style={styles.envelopeButton}
                    >
                        <div style={styles.envelopeBody}>
                            <div style={styles.envelopeIcon}>✉️</div>
                            <div style={styles.envelopeText}>{nextButtonText}</div>
                            <div style={styles.envelopeSubtext}>CLICK TO OPEN</div>
                        </div>
                    </motion.button>
                </motion.div>
            )}
        </div>
    );
}

const styles = {
    container: {
        position: "relative",
        minHeight: "100vh",
        overflow: "hidden",
    },
    breadcrumb: {
        position: "fixed",
        top: "15px",
        left: "50%",
        transform: "translateX(-50%)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "6px",
        zIndex: 1000,
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        backdropFilter: "blur(10px)",
        padding: "8px 16px",
        borderRadius: "30px",
        boxShadow: "0 2px 10px rgba(0, 0, 0, 0.08)",
        border: "1px solid rgba(212, 175, 55, 0.2)",
        maxWidth: "90vw",
        flexWrap: "wrap",
    },
    breadcrumbItem: {
        padding: "6px 12px",
        fontSize: "0.7rem",
        fontWeight: "600",
        color: "#6b7280",
        backgroundColor: "transparent",
        border: "none",
        borderRadius: "15px",
        cursor: "pointer",
        transition: "all 0.3s ease",
        textTransform: "uppercase",
        letterSpacing: "0.3px",
        whiteSpace: "nowrap",
    },
    breadcrumbActive: {
        color: "#ffffff",
        backgroundColor: "#d4af37",
        boxShadow: "0 1px 4px rgba(212, 175, 55, 0.3)",
    },
    sectionWrapper: {
        minHeight: "100vh",
    },
    envelopeContainer: {
        position: "fixed",
        bottom: "30px",
        left: "30px",
        zIndex: 999,
    },
    envelopeButton: {
        position: "relative",
        background: "rgba(212, 175, 55, 0.2)",
        backdropFilter: "blur(10px)",
        border: "2px solid rgba(212, 175, 55, 0.5)",
        cursor: "pointer",
        padding: "14px 18px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "12px",
        boxShadow: "0 4px 15px rgba(212, 175, 55, 0.3)",
        transition: "all 0.3s ease",
        minWidth: "100px",
    },
    envelopeFlap: {
        display: "none",
    },
    envelopeBody: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "4px",
    },
    envelopeIcon: {
        fontSize: "1.5rem",
        marginBottom: "4px",
    },
    envelopeText: {
        fontSize: "0.75rem",
        fontWeight: "700",
        color: "#1f2937",
        marginBottom: "2px",
        fontFamily: "'Playfair Display', serif",
        lineHeight: "1.1",
        textAlign: "center",
    },
    envelopeSubtext: {
        fontSize: "0.55rem",
        color: "#6b7280",
        textTransform: "uppercase",
        letterSpacing: "0.5px",
        fontWeight: "600",
        opacity: 0.9,
    },
};

