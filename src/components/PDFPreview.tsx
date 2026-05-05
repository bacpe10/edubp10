"use client";

import { useState, useEffect, useRef } from "react";
import { pdfjs, Document, Page } from "react-pdf";

// Use a reliable CDN for the worker
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

// Import styles for annotation and text layers
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

interface PDFPreviewProps {
  file: string;
}

export default function PDFPreview({ file }: PDFPreviewProps) {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [containerWidth, setContainerWidth] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
  }

  useEffect(() => {
    if (containerRef.current) {
      const updateWidth = () => {
        if (containerRef.current) {
          setContainerWidth(containerRef.current.offsetWidth);
        }
      };
      
      updateWidth();
      window.addEventListener("resize", updateWidth);
      return () => window.removeEventListener("resize", updateWidth);
    }
  }, []);

  return (
    <div ref={containerRef} className="w-full h-full bg-slate-50 overflow-y-auto no-scrollbar">
      <Document
        file={file}
        onLoadSuccess={onDocumentLoadSuccess}
        loading={
          <div className="flex flex-col items-center justify-center p-20 gap-4">
            <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            <p className="text-slate-500 font-bold text-xs uppercase tracking-widest">Se încarcă previzualizarea...</p>
          </div>
        }
        error={
          <div className="p-10 text-center text-red-500">
            <span className="material-symbols-outlined text-4xl mb-2">error</span>
            <p className="font-bold">Eroare la încărcarea PDF-ului</p>
          </div>
        }
      >
        {/* We only show the first 3 pages for the preview */}
        {Array.from(new Array(Math.min(numPages || 0, 3)), (el, index) => (
          <div key={`page_${index + 1}`} className="mb-4 shadow-sm bg-white overflow-hidden">
            <Page
              pageNumber={index + 1}
              width={containerWidth}
              renderAnnotationLayer={false}
              renderTextLayer={false}
              loading={<div className="h-96 bg-slate-100 animate-pulse" />}
            />
          </div>
        ))}
        
        {numPages && numPages > 3 && (
          <div className="p-8 text-center bg-white border-t border-slate-100">
            <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest italic">
              + încă {numPages - 3} pagini deblocate după achiziție
            </p>
          </div>
        )}
      </Document>
    </div>
  );
}
