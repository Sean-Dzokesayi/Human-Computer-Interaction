
import React, { useState } from 'react';
import DocViewer from "@cyntler/react-doc-viewer";
// example.ts
// import fs from "fs/promises";
// import { Document, VectorStoreIndex } from "llamaindex";
// import { Document } from 'llamaindex';

const DocumentViewerPdf = ({ documentUri }) => {
   const [selectedPdf, setSelectedPdf] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedPdf(URL.createObjectURL(file));
  };

  return (
    <div>
      <input
        type="file"
        accept="application/pdf"
        onChange={handleFileChange}
      />

      <p>{selectedPdf}</p>
      {selectedPdf && (
        <embed
          src={selectedPdf}
          type="application/pdf"
          frameBorder="0"
          scrolling="auto"
          height="550px"
          width="600px"
          border="2px solid red"
          float="left"
        ></embed>
      )}
    </div>
  );
};

export default DocumentViewerPdf;

