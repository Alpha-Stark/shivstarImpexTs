'use client'

import { useCallback, Dispatch, SetStateAction } from 'react'
import { useDropzone } from '@uploadthing/react/hooks'
import { generateClientDropzoneAccept } from 'uploadthing/client'
import { Button } from './ui/button'
import styles from '../style/FileUploader.module.css'

type FileUploaderProps = {
    onFieldChange: (url: string) => void
    photo: string
    setFiles: Dispatch<SetStateAction<File[]>>
}

export function FileUploader({ photo, onFieldChange, setFiles }: FileUploaderProps) {
    const onDrop = useCallback(async (acceptedFiles: File[]) => {
        setFiles(acceptedFiles)
        if (acceptedFiles.length > 0) {
            const fileUrl = await convertFileToUrl(acceptedFiles[0])
            onFieldChange(fileUrl)
        }
    }, [setFiles, onFieldChange])

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: generateClientDropzoneAccept(['image/*']),
    })

    return (
        <div
            {...getRootProps()}
            className={styles.uploadContainer}>
            <input {...getInputProps()} className={styles.cursorPointer} />

            {photo ? (
                <div className={`${styles.flex} ${styles.hFull} ${styles.wFull} ${styles.flex1} ${styles.justifyCenter}`}>
                    <img
                        src={photo}
                        alt="image"
                        width={250}
                        height={250}
                        className={`${styles.wFull} ${styles.objectCover} ${styles.objectCenter}`}
                    />
                </div>
            ) : (
                <div className={`${styles.flexCenter} ${styles.flexCol} ${styles.py5} ${styles.textGrey500} ${styles.hFull}`}>
                    <img src="/assets/icons/upload.svg" width={77} height={77} alt="file upload" />
                    <h3 className={`${styles.mb2} ${styles.mt2}`}>Drag photo here</h3>
                    <p className={styles.mb4}>SVG, PNG, JPG</p>
                    <Button type="button" className={styles.roundedFull}>
                        Select from computer
                    </Button>
                </div>
            )}
        </div>
    )
}

const convertFileToUrl = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = () => resolve(reader.result as string)
        reader.onerror = error => reject(error)
        reader.readAsDataURL(file)
    })
}
