// OCRComponent.js

import React, { useState } from 'react';
import Tesseract from 'tesseract.js';
import './OCRComponent.css';

function OCRComponent() {
    const [imageFile, setImageFile] = useState(null);
    const [extractedText, setExtractedText] = useState('');
    const [customFileName, setCustomFileName] = useState('');

    const handleFileChange = (e) => {
        setImageFile(e.target.files[0]);
    };

    const handleCustomFileNameChange = (e) => {
        setCustomFileName(e.target.value);
    };

    const performOCR = () => {
        Tesseract.recognize(
            imageFile,
            'eng', // Language
            { logger: (m) => console.log(m) }
        ).then(({ data: { text } }) => {
            setExtractedText(text);
        });
    };

    const downloadWordDocument = () => {
        const blob = new Blob([extractedText], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = customFileName + '.docx';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    return (
        <div className="container">
            <h1 className="heading">MY OCR Project</h1>
            <div className="input-container">
                <label htmlFor="imageFile">Upload PDF file:</label>
                <input type="file" id="imageFile" onChange={handleFileChange} />
            </div>
            <div className="input-container">
                <label htmlFor="customFileName">File Name:</label>
                <input type="text" id="customFileName" placeholder="Enter custom file name" onChange={handleCustomFileNameChange} />
            </div>
            <div className="button-container">
                <button onClick={performOCR} disabled={!imageFile}>Extract Text</button>
                <button onClick={downloadWordDocument} disabled={!extractedText || !customFileName}>Download Text</button>
            </div>
            <div className="result-container">
                <textarea value={extractedText} readOnly />
            </div>
        </div>
    );
}

export default OCRComponent;
