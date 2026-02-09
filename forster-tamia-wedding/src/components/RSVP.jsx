import { useState, useEffect, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

export default function RSVP() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    const [formData, setFormData] = useState({
        name: "",
        surname: "",
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
            setFormData(prev => ({ ...prev, name: guestName }));
        }
    }, []);

    const validateForm = () => {
        const newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = "Name is required";
        }

        if (!formData.surname.trim()) {
            newErrors.surname = "Surname is required";
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

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Save to localStorage
        localStorage.setItem("weddingRSVP", JSON.stringify(formData));
        localStorage.setItem("weddingRSVPSubmitted", "true");

        setIsSubmitting(false);
        setIsSubmitted(true);
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
            <section style={styles.section}>
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
                            <p><strong>Name:</strong> {formData.name} {formData.surname}</p>
                            <p><strong>Phone:</strong> {formData.phone}</p>
                        </div>

                        <p style={styles.confirmationNote}>
                            A confirmation has been saved. See you on February 14, 2027! ❤️
                        </p>
                    </motion.div>
                </div>
            </section>
        );
    }

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
                    <h2 style={styles.title}>RSVP</h2>
                    <p style={styles.subtitle}>
                        Please confirm your attendance
                    </p>
                </motion.div>

                {/* RSVP Form */}
                <motion.form
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0, y: 40 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.3, duration: 0.6 }}
                    style={styles.form}
                >
                    {/* Name */}
                    <div style={styles.formGroup}>
                        <label htmlFor="name" style={styles.label}>
                            Name *
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            style={{
                                ...styles.input,
                                borderColor: errors.name ? "#ef4444" : "#e5e7eb",
                            }}
                            placeholder="Your first name"
                        />
                        {errors.name && <p style={styles.error}>{errors.name}</p>}
                    </div>

                    {/* Surname */}
                    <div style={styles.formGroup}>
                        <label htmlFor="surname" style={styles.label}>
                            Surname *
                        </label>
                        <input
                            type="text"
                            id="surname"
                            name="surname"
                            value={formData.surname}
                            onChange={handleChange}
                            style={{
                                ...styles.input,
                                borderColor: errors.surname ? "#ef4444" : "#e5e7eb",
                            }}
                            placeholder="Your last name"
                        />
                        {errors.surname && <p style={styles.error}>{errors.surname}</p>}
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
        background: "linear-gradient(90deg, transparent, #f97316, transparent)",
        margin: "0 auto 20px",
    },
    title: {
        fontFamily: "'Playfair Display', serif",
        fontSize: "clamp(2.5rem, 5vw, 3.5rem)",
        color: "#1e40af",
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
        color: "#1e40af",
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
        color: "#f97316",
        fontWeight: "600",
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

