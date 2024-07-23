import React, { useState } from 'react';
import styles from '../style/gift.module.css';
import gift from '../giftBox.png';
import Image from 'next/image';
import CustomModal from './CustomModal';

export const Gifts = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const handleModalSubmit = (amount: number, email: string) => {
        // Handle the gift card submission logic here
        console.log('Gift Card Amount:', amount);
        console.log('Recipient Email:', email);
        // Display toast notification or any other feedback mechanism
    };

    return (
        <>
            <section className={styles.Gift}>
                <div className={styles.giftImage}>
                    <Image src={gift} alt="Gift Box" />
                </div>

                <div className={styles.giftText}>
                    <h1>
                        <b>GIFT CARD</b>
                    </h1>
                    <br />
                    <p>Looking for the perfect gift?</p>
                    <p id="pjustify">Look no further! Our extensive collection of jewelry gifts includes something for everyone - from elegant and timeless pieces for her to bold and sophisticated designs for him</p>
                    <br />
                    <br />
                    <span>
                        <button className={styles.sendGiftButton} onClick={openModal}>
                            SEND GIFT CARD
                        </button>
                    </span>
                </div>
            </section>

            <CustomModal isOpen={isModalOpen} onClose={closeModal} onSubmit={handleModalSubmit} />
        </>
    );
};

export default Gifts;
