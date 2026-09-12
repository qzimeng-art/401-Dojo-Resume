import React, { useState, useRef } from 'react';
import { X, Upload, CheckCircle2, AlertCircle, FileText, RefreshCw } from 'lucide-react';
import api from '../../api/axios';

const MasterResumeUploadModal = ({ isOpen, onClose, isDemo = false, onUploadSuccess }) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadState, setUploadState] = useState('idle'); // 'idle' | 'uploading' | 'success' | 'error'
  const [progress, setProgress] = useState(0);
  const [selectedFile, setSelectedFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [successResponse, setSuccessResponse] = useState(null);
  const fileInputRef = useRef(null);

  if (!isOpen) return null;

  const resetModalState = () => {
    setUploadState('idle');
    setProgress(0);
    setSelectedFile(null);
    setErrorMessage('');
    setSuccessResponse(null);
  };

  const handleClose = () => {
    resetModalState();
    onClose();
  };

  const validateFile = (file) => {
    if (!file) return false;
    const name = file.name.toLowerCase();
    const isValidExtension = name.endsWith('.pdf') || name.endsWith('.doc') || name.endsWith('.docx');
    if (!isValidExtension) {
      setErrorMessage('Unsupported file type. Please upload a PDF or Word document (.pdf, .doc, .docx).');
      setUploadState('error');
      return false;
    }
    return true;
  };

  const handleFileSelect = (file) => {
    if (!validateFile(file)) return;

    setSelectedFile(file);
    setErrorMessage('');
    setUploadState('uploading');
    setProgress(0);

    // Perform API Upload to Django backend (saves to SQLite)
    const formData = new FormData();
    formData.append('file', file);

    api.post('/api/master-resume/', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
      onUploadProgress: (progressEvent) => {
        if (progressEvent.total) {
          const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setProgress(percent);
        }
      }
    })
    .then((res) => {
      setProgress(100);
      setTimeout(() => {
        const filePayload = res.data?.data || {
          original_filename: file.name,
          file_size: file.size,
          file_type: file.name.toLowerCase().endsWith('.pdf') ? 'PDF' : 'Word',
          uploaded_at: new Date().toISOString()
        };
        setUploadState('success');
        setSuccessResponse({
          message: res.data?.message || 'Master resume uploaded successfully!',
          file: filePayload
        });
        if (isDemo) {
          try {
            localStorage.setItem('demo_master_resume', JSON.stringify(filePayload));
          } catch (e) {
            console.error(e);
          }
        }
        if (onUploadSuccess) onUploadSuccess(filePayload);
      }, 300);
    })
    .catch((err) => {
      console.error("Upload error:", err);
      if (isDemo) {
        // Fallback for demo mode if backend server is offline
        let currentProgress = 0;
        const interval = setInterval(() => {
          currentProgress += Math.floor(Math.random() * 25) + 15;
          if (currentProgress >= 100) {
            currentProgress = 100;
            clearInterval(interval);
            setTimeout(() => {
              const filePayload = {
                original_filename: file.name,
                file_size: file.size,
                file_type: file.name.toLowerCase().endsWith('.pdf') ? 'PDF' : 'Word',
                uploaded_at: new Date().toISOString()
              };
              setUploadState('success');
              setSuccessResponse({
                message: 'Master resume uploaded successfully!',
                file: filePayload
              });
              try {
                localStorage.setItem('demo_master_resume', JSON.stringify(filePayload));
              } catch (e) {
                console.error(e);
              }
              if (onUploadSuccess) onUploadSuccess(filePayload);
            }, 300);
          }
          setProgress(currentProgress);
        }, 180);
      } else {
        setUploadState('error');
        setErrorMessage(err.response?.data?.detail || 'Failed to upload master resume. Please try again.');
      }
    });
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files?.length) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleInputChange = (e) => {
    if (e.target.files?.length) {
      handleFileSelect(e.target.files[0]);
    }
  };

  const formatFileSize = (bytes) => {
    if (!bytes) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-3xl w-full relative shadow-2xl overflow-hidden border border-gray-100 transition-all">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-5 right-5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full p-2 transition-all z-10"
        >
          <X size={22} />
        </button>

        <div className="p-8 sm:p-12">
          {/* Header */}
          <div className="mb-6">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
              Upload Master Resume
            </h2>
          </div>

          {/* Upload Area / States */}
          {uploadState === 'idle' && (
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`border-2 border-dashed rounded-3xl p-8 sm:p-10 transition-all text-center flex flex-col md:flex-row items-center justify-between gap-8 ${
                isDragOver ? 'border-blue-500 bg-blue-50/50 scale-[1.01]' : 'border-gray-300 bg-gray-50/50 hover:border-blue-400'
              }`}
            >
              {/* Left Action Column */}
              <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleInputChange}
                  accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                  className="hidden"
                />

                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="bg-[#1473E6] hover:bg-[#0d66d0] text-white text-base sm:text-lg font-bold px-8 py-3.5 rounded-full flex items-center gap-3 shadow-md hover:shadow-lg transition-all transform active:scale-95 cursor-pointer"
                >
                  <Upload size={22} />
                  Select your document
                </button>

                <p className="text-gray-900 font-semibold text-base mt-4">
                  or drag and drop here
                </p>
                <p className="text-gray-500 text-xs sm:text-sm mt-1">
                  (both pdf and word are supported)
                </p>
              </div>

              {/* Right Decorative Graphic Illustration */}
              <div className="w-full md:w-64 flex items-center justify-center relative py-4">
                <div className="relative flex items-center justify-center gap-4">
                  {/* DOC Card */}
                  <div className="w-24 h-32 bg-white border border-gray-200 rounded-xl shadow-md p-3 flex flex-col justify-between transform -rotate-6 transition-transform hover:rotate-0">
                    <div className="flex items-center justify-between">
                      <span className="bg-blue-600 text-white text-[10px] font-black px-1.5 py-0.5 rounded">DOC</span>
                      <FileText size={16} className="text-blue-600" />
                    </div>
                    <div className="space-y-1.5 my-2">
                      <div className="h-1.5 bg-gray-200 rounded w-full"></div>
                      <div className="h-1.5 bg-gray-200 rounded w-4/5"></div>
                      <div className="h-1.5 bg-gray-200 rounded w-3/4"></div>
                      <div className="h-1.5 bg-gray-200 rounded w-full"></div>
                    </div>
                    <div className="h-2 bg-blue-100 rounded w-1/2"></div>
                  </div>

                  {/* PDF Card */}
                  <div className="w-24 h-32 bg-red-50/80 border border-red-200 rounded-xl shadow-md p-3 flex flex-col justify-between transform rotate-6 transition-transform hover:rotate-0">
                    <div className="flex items-center justify-between">
                      <span className="bg-red-600 text-white text-[10px] font-black px-1.5 py-0.5 rounded">PDF</span>
                      <FileText size={16} className="text-red-600" />
                    </div>
                    <div className="space-y-1.5 my-2">
                      <div className="h-1.5 bg-red-200 rounded w-full"></div>
                      <div className="h-1.5 bg-red-200 rounded w-4/5"></div>
                      <div className="h-1.5 bg-red-200 rounded w-2/3"></div>
                      <div className="h-1.5 bg-red-200 rounded w-full"></div>
                    </div>
                    <div className="h-2 bg-red-200 rounded w-1/2"></div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Uploading Progress State */}
          {uploadState === 'uploading' && (
            <div className="border-2 border-blue-200 rounded-3xl p-8 sm:p-10 bg-blue-50/30 text-center">
              <div className="max-w-md mx-auto space-y-6">
                <div className="inline-flex p-4 bg-blue-100 text-blue-600 rounded-2xl animate-pulse">
                  <FileText size={40} />
                </div>
                
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-1">Uploading Master Resume...</h3>
                  <p className="text-sm text-gray-500 font-medium truncate">
                    {selectedFile?.name} ({formatFileSize(selectedFile?.size)})
                  </p>
                </div>

                {/* Progress Bar */}
                <div className="space-y-2">
                  <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden p-0.5 border border-gray-100">
                    <div
                      className="bg-blue-600 h-full rounded-full transition-all duration-300 ease-out"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between items-center text-xs font-bold text-gray-500">
                    <span>Processing file</span>
                    <span className="text-blue-600 text-sm font-black">{progress}%</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Upload Success State */}
          {uploadState === 'success' && (
            <div className="border-2 border-green-200 rounded-3xl p-8 sm:p-10 bg-green-50/40 text-center">
              <div className="max-w-lg mx-auto space-y-6">
                <div className="inline-flex p-4 bg-green-100 text-green-600 rounded-full shadow-lg shadow-green-100">
                  <CheckCircle2 size={48} />
                </div>

                <div>
                  <h3 className="text-2xl font-black text-gray-900">Upload Successful!</h3>
                  <p className="text-sm text-green-700 font-medium mt-1">
                    {successResponse?.message || 'Your master resume has been uploaded successfully.'}
                  </p>
                </div>

                {/* File Metadata Card */}
                <div className="bg-white rounded-2xl p-4 border border-green-200 shadow-sm flex items-center justify-between text-left">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="p-2.5 bg-gray-100 rounded-xl text-gray-700 flex-shrink-0">
                      <FileText size={24} />
                    </div>
                    <div className="min-w-0">
                      <p className="font-bold text-gray-900 text-sm truncate">
                        {successResponse?.file?.original_filename || selectedFile?.name}
                      </p>
                      <p className="text-xs text-gray-500 font-medium">
                        {formatFileSize(successResponse?.file?.file_size || selectedFile?.size)} • {successResponse?.file?.file_type || 'Document'}
                      </p>
                    </div>
                  </div>
                  <span className="bg-green-100 text-green-800 text-xs font-black px-2.5 py-1 rounded-full uppercase tracking-wider flex-shrink-0 ml-2">
                    Uploaded
                  </span>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={handleClose}
                    className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white font-bold px-8 py-3 rounded-full transition-all shadow-md cursor-pointer"
                  >
                    Done
                  </button>
                  <button
                    type="button"
                    onClick={resetModalState}
                    className="w-full sm:w-auto bg-white hover:bg-gray-100 text-gray-700 font-semibold px-6 py-3 rounded-full border border-gray-300 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <RefreshCw size={16} />
                    Upload New Version
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Error State */}
          {uploadState === 'error' && (
            <div className="border-2 border-red-200 rounded-3xl p-8 sm:p-10 bg-red-50/40 text-center">
              <div className="max-w-md mx-auto space-y-6">
                <div className="inline-flex p-4 bg-red-100 text-red-600 rounded-full">
                  <AlertCircle size={44} />
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gray-900">Upload Failed</h3>
                  <p className="text-sm text-red-600 mt-2 font-medium">
                    {errorMessage}
                  </p>
                </div>

                <div className="flex items-center justify-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={resetModalState}
                    className="bg-red-600 hover:bg-red-700 text-white font-bold px-8 py-3 rounded-full transition-all shadow-md cursor-pointer"
                  >
                    Try Again
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MasterResumeUploadModal;

