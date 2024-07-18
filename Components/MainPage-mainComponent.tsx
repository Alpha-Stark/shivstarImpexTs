import React from "react";
import styles from "@/style/mainPage.module.css"

export const MainPageMainComponent = () => {
    return (
        <div className={styles.stopmostcontainer}>
            <div className={styles.hstack}>
                <div className={styles.vstack}>
                    <h2 className={styles.heading}>
                        Your Diamond Search Start Here
                    </h2>
                    <p className={styles.text}>
                        Elevate Your Style With Our Stunning Collection of Lab Grown Diamond
                        {/* Discover the perfect diamond pieces for your unique style at our store */}
                    </p>
                    <p className={styles.text2}>
                        DISCOVER
                    </p>
                </div>
            </div>
            <div className={styles.mainhands}></div>
        </div>
    );
};
