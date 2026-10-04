import { useState, useEffect, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

export default function RSVP() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    const [formData, setFormData] = useState({
        fullName: "",
        phone: "",
    });

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    useEffect(() => {
        // Check if already submitted
        const rsvpStatus = localStorage.getItem("weddingRSVPSubmitted");
        if (rsvpStatus === "true") {
            setIsSubmitted(true);
        }

        // Pre-fill name from welcome screen
        const guestName = localStorage.getItem("weddingGuestName");
        if (guestName) {
            setFormData(prev => ({ ...prev, fullName: guestName }));
        }
    }, []);

    const validateForm = () => {
        const newErrors = {};

        if (!formData.fullName.trim()) {
            newErrors.fullName = "Full name is required";
        } else if (formData.fullName.trim().split(' ').length < 2) {
            newErrors.fullName = "Please enter your full name";
        }

        if (!formData.phone.trim()) {
            newErrors.phone = "Phone number is required";
        } else if (!/^\+?[\d\s-()]+$/.test(formData.phone)) {
            newErrors.phone = "Phone number is invalid";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);

        try {
            // Submit to Google Sheets
            const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyUaMC4vsB7iiIqGGjzVT0KkDm9UZEm83nktT7zMopDDS95vv4VQc3GWkQ0DiINDoux/exec";

            console.log("📝 Submitting RSVP to Google Sheets...");

            const timestamp = new Date().toISOString();
            const params = new URLSearchParams({
                fullName: formData.fullName,
                phone: formData.phone,
                timestamp: timestamp,
            });

            // Send via POST with URLSearchParams in URL and JSON in body using text/plain
            // This is CORS-safelisted, avoids preflight OPTIONS failure, and ensures
            // Google Apps Script captures the data via either e.parameter or e.postData.contents
            await fetch(`${GOOGLE_SCRIPT_URL}?${params.toString()}`, {
                method: "POST",
                mode: "no-cors",
                headers: {
                    "Content-Type": "text/plain;charset=utf-8",
                },
                body: JSON.stringify({
                    fullName: formData.fullName,
                    phone: formData.phone,
                    timestamp: timestamp,
                }),
            });

            console.log("✅ RSVP request dispatched to Google Sheets!");

            // Save to localStorage
            localStorage.setItem("weddingRSVP", JSON.stringify(formData));
            localStorage.setItem("weddingRSVPSubmitted", "true");

            setIsSubmitting(false);
            setIsSubmitted(true);
        } catch (error) {
            console.error("❌ Error submitting RSVP:", error);
            console.log("💾 Saving locally as backup...");

            // Still save locally even if submission fails
            localStorage.setItem("weddingRSVP", JSON.stringify(formData));
            localStorage.setItem("weddingRSVPSubmitted", "true");
            setIsSubmitting(false);
            setIsSubmitted(true);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        // Clear error for this field
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: "" }));
        }
    };

    if (isSubmitted) {
        return (
            <section id="rsvp-section" style={styles.section}>
                <div style={styles.container}>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6 }}
                        style={styles.confirmationCard}
                    >
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                            style={styles.checkmark}
                        >
                            ✓
                        </motion.div>

                        <h2 style={styles.confirmationTitle}>Thank You!</h2>
                        <p style={styles.confirmationText}>
                            We've received your RSVP and can't wait to celebrate with you on our special day!
                        </p>

                        <div style={styles.confirmationDetails}>
                            <p><strong>Name:</strong> {formData.fullName}</p>
                            <p><strong>Phone:</strong> {formData.phone}</p>
                        </div>

                        <p style={styles.confirmationNote}>
                            A confirmation has been saved. See you on 22 December 2026! ❤️
                        </p>

                        {/* 
                        <button
                            type="button"
                            onClick={() => {
                                setIsSubmitted(false);
                                localStorage.removeItem("weddingRSVPSubmitted");
                            }}
                            style={styles.editResponseButton}
                        >
                            Submit Another Response
                        </button> 
                        */}
                    </motion.div>
                </div>
            </section>
        );
    }

    return (
        <section id="rsvp-section" ref={ref} style={styles.section}>
            <div style={styles.container}>
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    style={styles.header}
                >
                    <div style={styles.decorativeLine} />
                    <h2 style={styles.title}>RSVP</h2>
                    <p style={styles.subtitle}>
                        Kindly confirm your attendance by 01/12/2026
                    </p>
                </motion.div>

                {/* Direct Contacts */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    style={styles.contactsGrid}
                >
                    <a href="tel:0773445842" style={styles.contactCard}>
                        <span style={styles.contactIcon}>📞</span>
                        <div style={styles.contactInfo}>
                            <span style={styles.contactName}>Sisa</span>
                            <span style={styles.contactNumber}>0773445842</span>
                        </div>
                    </a>
                    <a href="tel:0772682234" style={styles.contactCard}>
                        <span style={styles.contactIcon}>📞</span>
                        <div style={styles.contactInfo}>
                            <span style={styles.contactName}>Prudence</span>
                            <span style={styles.contactNumber}>0772682234</span>
                        </div>
                    </a>
                </motion.div>

                {/* RSVP Form */}
                <motion.form
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0, y: 40 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.3, duration: 0.6 }}
                    style={styles.form}
                >
                    {/* Full Name */}
                    <div style={styles.formGroup}>
                        <label htmlFor="fullName" style={styles.label}>
                            Full Name *
                        </label>
                        <input
                            type="text"
                            id="fullName"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            style={{
                                ...styles.input,
                                borderColor: errors.fullName ? "#ef4444" : "#e5e7eb",
                            }}
                            placeholder="Your full name"
                        />
                        {errors.fullName && <p style={styles.error}>{errors.fullName}</p>}
                    </div>

                    {/* Phone */}
                    <div style={styles.formGroup}>
                        <label htmlFor="phone" style={styles.label}>
                            Phone Number *
                        </label>
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            style={{
                                ...styles.input,
                                borderColor: errors.phone ? "#ef4444" : "#e5e7eb",
                            }}
                            placeholder="+263 123 456 789"
                        />
                        {errors.phone && <p style={styles.error}>{errors.phone}</p>}
                    </div>

                    {/* Submit Button */}
                    <motion.button
                        type="submit"
                        disabled={isSubmitting}
                        whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                        whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                        className="btn-primary"
                        style={{
                            ...styles.submitButton,
                            opacity: isSubmitting ? 0.7 : 1,
                        }}
                    >
                        {isSubmitting ? (
                            <>
                                <span style={styles.spinner} />
                                Submitting...
                            </>
                        ) : (
                            "Confirm Attendance"
                        )}
                    </motion.button>
                </motion.form>

                {/* Quote & Notice Footer */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.4, duration: 0.6 }}
                    style={styles.quoteCard}
                >
                    <p style={styles.quoteText}>
                        ✨ “Two hearts, one journey, one beautiful beginning.” ✨
                    </p>
                    <p style={styles.presenceText}>
                        Your presence will make our celebration complete.
                    </p>
                    <div style={styles.noticeContainer}>
                        <span style={styles.noticeTag}>#STRICTLY BY INVITE</span>
                        <span style={styles.noticeTag}>#NO CHILDREN AND NO PLUS ONE</span>
                    </div>
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
        maxWidth: "800px",
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
    form: {
        backgroundColor: "#ffffff",
        padding: "50px 40px",
        borderRadius: "24px",
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
    },
    formGrid: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
        gap: "25px",
        marginBottom: "25px",
    },
    formGroup: {
        marginBottom: "25px",
    },
    label: {
        display: "block",
        fontSize: "0.95rem",
        fontWeight: "600",
        color: "#1f2937",
        marginBottom: "8px",
    },
    input: {
        width: "100%",
        padding: "14px 18px",
        fontSize: "1rem",
        border: "2px solid #e5e7eb",
        borderRadius: "12px",
        transition: "all 0.2s ease",
        fontFamily: "'Inter', sans-serif",
        backgroundColor: "#ffffff",
    },
    textarea: {
        width: "100%",
        padding: "14px 18px",
        fontSize: "1rem",
        border: "2px solid #e5e7eb",
        borderRadius: "12px",
        transition: "all 0.2s ease",
        fontFamily: "'Inter', sans-serif",
        backgroundColor: "#ffffff",
        resize: "vertical",
    },
    error: {
        color: "#ef4444",
        fontSize: "0.875rem",
        marginTop: "5px",
    },
    submitButton: {
        width: "100%",
        marginTop: "10px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "10px",
    },
    spinner: {
        width: "16px",
        height: "16px",
        border: "2px solid #ffffff",
        borderTopColor: "transparent",
        borderRadius: "50%",
        animation: "spin 0.8s linear infinite",
        display: "inline-block",
    },
    confirmationCard: {
        backgroundColor: "#ffffff",
        padding: "60px 40px",
        borderRadius: "24px",
        boxShadow: "0 10px 40px rgba(0, 0, 0, 0.1)",
        textAlign: "center",
    },
    checkmark: {
        width: "80px",
        height: "80px",
        borderRadius: "50%",
        backgroundColor: "#22c55e",
        color: "#ffffff",
        fontSize: "3rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        margin: "0 auto 30px",
        boxShadow: "0 4px 20px rgba(34, 197, 94, 0.3)",
    },
    confirmationTitle: {
        fontFamily: "'Playfair Display', serif",
        fontSize: "2.5rem",
        color: "#000000",
        marginBottom: "20px",
    },
    confirmationText: {
        fontSize: "1.125rem",
        color: "#6b7280",
        marginBottom: "30px",
        lineHeight: "1.6",
    },
    confirmationDetails: {
        backgroundColor: "#faf8f3",
        padding: "25px",
        borderRadius: "12px",
        marginBottom: "25px",
        textAlign: "left",
    },
    confirmationNote: {
        fontSize: "1rem",
        color: "#d4af37",
        fontWeight: "600",
    },
    contactsGrid: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
        gap: "20px",
        marginBottom: "35px",
    },
    contactCard: {
        display: "flex",
        alignItems: "center",
        gap: "16px",
        padding: "18px 24px",
        backgroundColor: "#ffffff",
        borderRadius: "16px",
        border: "2px solid #d4af37",
        boxShadow: "0 4px 15px rgba(212, 175, 55, 0.15)",
        textDecoration: "none",
        color: "#1f2937",
    },
    contactIcon: {
        fontSize: "1.75rem",
    },
    contactInfo: {
        display: "flex",
        flexDirection: "column",
    },
    contactName: {
        fontSize: "0.85rem",
        color: "#6b7280",
        fontWeight: "600",
        textTransform: "uppercase",
        letterSpacing: "0.5px",
    },
    contactNumber: {
        fontSize: "1.25rem",
        fontWeight: "700",
        color: "#000000",
        fontFamily: "'Playfair Display', serif",
    },
    quoteCard: {
        marginTop: "40px",
        textAlign: "center",
        padding: "35px 25px",
        backgroundColor: "#ffffff",
        borderRadius: "20px",
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.06)",
        border: "1px solid rgba(212, 175, 55, 0.3)",
    },
    quoteText: {
        fontFamily: "'Playfair Display', serif",
        fontSize: "clamp(1.1rem, 2.5vw, 1.35rem)",
        color: "#d4af37",
        fontStyle: "italic",
        fontWeight: "600",
        marginBottom: "12px",
    },
    presenceText: {
        fontSize: "1.05rem",
        color: "#1f2937",
        fontWeight: "500",
        marginBottom: "20px",
    },
    noticeContainer: {
        display: "flex",
        flexWrap: "wrap",
        gap: "10px",
        justifyContent: "center",
    },
    noticeTag: {
        backgroundColor: "#fef3c7",
        color: "#92400e",
        padding: "8px 16px",
        borderRadius: "20px",
        fontSize: "0.85rem",
        fontWeight: "700",
        letterSpacing: "0.5px",
        border: "1px solid #fde68a",
    },
    editResponseButton: {
        marginTop: "20px",
        backgroundColor: "transparent",
        border: "1px solid #d4af37",
        color: "#d4af37",
        borderRadius: "20px",
        padding: "8px 20px",
        fontSize: "0.85rem",
        fontWeight: "600",
        cursor: "pointer",
        transition: "all 0.2s ease",
    },
};

// Add spinner animation
if (typeof document !== "undefined") {
    const style = document.createElement("style");
    style.textContent = `
        @keyframes spin {
            to { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(style);
}

