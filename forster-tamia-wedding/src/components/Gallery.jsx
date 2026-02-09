import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";

export default function Gallery() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const [selectedImage, setSelectedImage] = useState(null);

    const images = [
        { src: "/images/couple-1.jpg", alt: "Forster & Tamia - Traditional Attire", caption: "Traditional Elegance" },
        { src: "/images/couple-2.jpg", alt: "Forster & Tamia - Together", caption: "Love & Joy" },
        { src: "/images/couple-1.jpg", alt: "Forster & Tamia - Celebration", caption: "Cultural Beauty" },
        { src: "/images/couple-2.jpg", alt: "Forster & Tamia - Happiness", caption: "Forever Together" },
    ];

    return (
        <>
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
                        <h2 style={styles.title}>Gallery</h2>
                        <p style={styles.subtitle}>
                            Moments captured in time
                        </p>
                    </motion.div>

                    {/* Gallery Grid */}
                    <div style={styles.gallery}>
                        {images.map((image, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                                transition={{ delay: index * 0.1, duration: 0.5 }}
                                whileHover={{ scale: 1.05, zIndex: 10 }}
                                style={styles.imageCard}
                                onClick={() => setSelectedImage(image)}
                            >
                                <img
                                    src={image.src}
                                    alt={image.alt}
                                    style={styles.image}
                                />
                                <div style={styles.imageOverlay}>
                                    <p style={styles.imageCaption}>{image.caption}</p>
                                    <p style={styles.viewText}>Click to view</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Lightbox Modal */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={styles.lightbox}
                        onClick={() => setSelectedImage(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            style={styles.lightboxContent}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                onClick={() => setSelectedImage(null)}
                                style={styles.closeButton}
                            >
                                ✕
                            </button>
                            <img
                                src={selectedImage.src}
                                alt={selectedImage.alt}
                                style={styles.lightboxImage}
                            />
                            <p style={styles.lightboxCaption}>{selectedImage.caption}</p>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
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
    gallery: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
        gap: "25px",
    },
    imageCard: {
        position: "relative",
        borderRadius: "16px",
        overflow: "hidden",
        cursor: "pointer",
        boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
        transition: "all 0.3s ease",
    },
    image: {
        width: "100%",
        height: "350px",
        objectFit: "cover",
        display: "block",
    },
    imageOverlay: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        background: "linear-gradient(to top, rgba(30, 64, 175, 0.9), transparent)",
        padding: "40px 20px 20px",
        opacity: 0,
        transition: "opacity 0.3s ease",
    },
    imageCaption: {
        color: "#ffffff",
        fontSize: "1.25rem",
        fontWeight: "600",
        marginBottom: "5px",
        fontFamily: "'Playfair Display', serif",
    },
    viewText: {
        color: "#faf8f3",
        fontSize: "0.875rem",
        textTransform: "uppercase",
        letterSpacing: "1px",
    },
    lightbox: {
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.95)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 10000,
        padding: "20px",
    },
    lightboxContent: {
        position: "relative",
        maxWidth: "90vw",
        maxHeight: "90vh",
        backgroundColor: "#ffffff",
        borderRadius: "16px",
        overflow: "hidden",
        boxShadow: "0 20px 60px rgba(0, 0, 0, 0.5)",
    },
    closeButton: {
        position: "absolute",
        top: "15px",
        right: "15px",
        width: "40px",
        height: "40px",
        borderRadius: "50%",
        backgroundColor: "#f97316",
        color: "#ffffff",
        border: "none",
        fontSize: "1.5rem",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 10,
        transition: "all 0.2s ease",
    },
    lightboxImage: {
        width: "100%",
        maxHeight: "80vh",
        objectFit: "contain",
        display: "block",
    },
    lightboxCaption: {
        padding: "20px",
        textAlign: "center",
        fontSize: "1.25rem",
        color: "#1f2937",
        fontFamily: "'Playfair Display', serif",
        fontWeight: "600",
    },
};

