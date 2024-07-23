'use client'

import { useTransition, useState } from 'react'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import styles from '../style/DeleteConfirmation.module.css'

import { deleteProduct } from "@/lib/actions/product.action"

export const DeleteConfirmation = ({ productId }: { productId: string }) => {
    const pathname = usePathname() || '/products'
    let [isPending, startTransition] = useTransition()
    const [isOpen, setIsOpen] = useState(false)

    const openDialog = () => setIsOpen(true)
    const closeDialog = () => setIsOpen(false)

    return (
        <>
            <button onClick={openDialog} className={styles.triggerButton}>
                <Image src="/assets/icons/delete.svg" alt="delete" width={20} height={20} />
            </button>

            {isOpen && (
                <div className={styles.alertDialog}>
                    <div className={styles.alertDialogContent}>
                        <div className={styles.alertDialogHeader}>
                            <h2 className={styles.alertDialogTitle}>Are you sure you want to delete?</h2>
                            <p className={styles.alertDialogDescription}>
                                This will permanently delete this product
                            </p>
                        </div>

                        <div className={styles.alertDialogFooter}>
                            <button onClick={closeDialog} className={`${styles.button} ${styles.cancelButton}`}>
                                Cancel
                            </button>
                            <button
                                onClick={() =>
                                    startTransition(async () => {
                                        await deleteProduct({ productId, path: pathname })
                                        closeDialog()
                                    })
                                }
                                className={`${styles.button} ${styles.deleteButton}`}
                            >
                                {isPending ? 'Deleting...' : 'Delete'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
