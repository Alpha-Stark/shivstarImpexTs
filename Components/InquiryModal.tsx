import React, { useState } from 'react';
import styles from '../style/InquiryModal.module.css';

type InquiryModalProps = {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (name: string, phone: string, message: string) => void;
};

const InquiryModal = ({ isOpen, onClose, onSubmit }: InquiryModalProps) => {
    const [name, setName] = useState<string>('');
    const [phone, setPhone] = useState<string>('');
    const [message, setMessage] = useState<string>('');

    const handleSubmit = () => {
        onSubmit(name, phone, message);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <h2 className={styles.modalTitle}>Inquire about the Product</h2>
                <input
                    type="text"
                    className={styles.modalInput}
                    placeholder="Enter Your Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    type="text"
                    className={styles.modalInput}
                    placeholder="Enter Your Phone Number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                />
                <textarea
                    className={styles.modalTextarea}
                    placeholder="Enter Your Message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <div className={styles.modalActions}>
                    <button className={styles.modalButton} onClick={onClose}>
                        Cancel
                    </button>
                    <button className={styles.modalButton} onClick={handleSubmit}>
                        Send
                    </button>
                </div>
                <div className={styles.contactInfo}>
                    <p>Or call us at: <a href="tel:+1234567890">+1 (234) 567-890</a></p>
                </div>
            </div>
        </div>
    );
};

export default InquiryModal;
