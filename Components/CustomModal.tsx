import React, { useState } from 'react';
import styles from '../style/CustomModal.module.css';

type CustomModalProps = {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (amount: number, email: string) => void;
};

const CustomModal = ({ isOpen, onClose, onSubmit }: CustomModalProps) => {
    const [amount, setAmount] = useState<number>("" as any);
    const [email, setEmail] = useState("");

    const handleSubmit = () => {
        onSubmit(amount, email);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <h2 className={styles.modalTitle}>SEND GIFT CARD</h2>
                <p>Delight your friends and family with the magic of a surprise gift card!</p>
                <input
                    type="number"
                    className={styles.modalInput}
                    placeholder="Enter Amount"
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                />
                <input
                    type="email"
                    className={styles.modalInput}
                    placeholder="Enter Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <div className={styles.modalActions}>
                    <button className={styles.modalButton} onClick={onClose}>
                        Cancel
                    </button>
                    <button className={styles.modalButton} onClick={handleSubmit}>
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CustomModal;
