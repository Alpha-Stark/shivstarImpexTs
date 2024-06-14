import React from "react";
import styles from "../style/Abouts.module.css";

const Abouts = () => {
    return (
        <section className={styles.aboutSection}>
            <section className={styles.HomePage_about}>
                <div className={styles.HomePage_firstDiv}>
                    <div className={styles.HomePage_firstDiv_child}>
                        <h1>About</h1>
                        <p className={`${styles.text_black} text-black text-opacity-70 font-sans text-base font-medium mb-8 w-3/4`}>Shivstar Impex is More Than Just Gliding</p>
                        <p className="text-black text-opacity-70 font-sans text-base font-medium mb-8 w-3/4">Our Company is an exclusive supplier of Diamonds with the world's best quality. We take pride in offering our customers only the highest quality products.</p>
                        <p className="text-black text-opacity-70 font-sans text-base font-medium mb-8 w-3/4">We are constantly expanding our range to meet the needs of our customers and offer them the latest and most fashionable trends in Diamonds. We are confident that our collection of Diamonds will allow everyone to express their individual style and create a unique image</p>
                        <span>OUR STORES</span>
                    </div>
                    <div className={styles.HomePage_frstDiv2}>
                        <h1>SI</h1>
                    </div>
                </div>
                <div className={styles.HomePage_secondDiv}>
                    <div className={styles.divimge}>
                        <img src="https://gem-garden-jewelry-store.vercel.app/static/media/meeting.c96f8779b2d55da20832.png" alt="Meeting img" />
                    </div>
                    <div className={styles.HomePage_secondDiv_child}>
                        <h1>Arrange a Meeting with Personal Consultant</h1>
                        <p>Find a Boutique Near You or Visit our Flagship Store</p>
                        <span className={styles.spantag}>LEARN MORE</span>
                    </div>
                </div>
            </section>
        </section>
    );
};

export default Abouts;
