import React, { useState, useEffect } from 'react';
import { X, Save, Edit3 } from 'lucide-react';
import api from '../../api/axios';

const TailoredResumeModal = ({ isOpen, onClose, application, masterResume, onSaveSuccess }) => {
  const [text, setText] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (isOpen) {
      if (application?.tailored_resume_text) {
        setText(application.tailored_resume_text);
      } else if (masterResume?.parsed_text) {
        setText(masterResume.parsed_text);
      } else {
        setText('');
      }
    }
  }, [isOpen, application, masterResume]);

  if (!isOpen || !application) return null;

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const response = await api.patch(`/api/applications/${application.id}/`, {
        tailored_resume_text: text
      });
      onSaveSuccess(response.data);
      onClose();
    } catch (error) {
      console.error("Failed to save tailored resume", error);
      alert("Failed to save tailored resume. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-brand-900 w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden border border-gray-200 dark:border-brand-800 flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-brand-800 bg-gray-50 dark:bg-brand-900/50">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 dark:bg-purple-900/40 rounded-lg">
              <Edit3 size={24} className="text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <h2 className="text-xl font-black text-gray-900 dark:text-white">
                Tailor Resume for {application.company_name}
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                Make specific tweaks for the {application.position_title} role.
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-brand-800 rounded-lg transition-colors cursor-pointer"
          >
            <X size={24} />
          </button>
        </div>

        {/* Editor Body */}
        <div className="flex-1 p-6 overflow-y-auto bg-white dark:bg-brand-900">
          {(!masterResume?.parsed_text && !application.tailored_resume_text) && (
            <div className="mb-4 p-4 bg-yellow-50 text-yellow-800 rounded-xl border border-yellow-200 text-sm font-medium">
              You haven't extracted text from your Master Resume yet. Please go to your Account Profile to set it up!
            </div>
          )}
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Your tailored resume text goes here..."
            className="w-full h-full min-h-[400px] p-4 bg-gray-50 dark:bg-brand-950 border border-gray-200 dark:border-brand-800 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-gray-800 dark:text-gray-200 resize-none font-mono text-sm leading-relaxed"
          />
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 dark:border-brand-800 bg-gray-50 dark:bg-brand-900/50 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-6 py-2.5 font-bold text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-brand-800 rounded-xl transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="flex items-center gap-2 px-6 py-2.5 font-bold text-white bg-purple-600 hover:bg-purple-700 rounded-xl transition-colors disabled:opacity-50 cursor-pointer"
          >
            {isSaving ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <Save size={18} />
            )}
            Save Tailored Resume
          </button>
        </div>
      </div>
    </div>
  );
};

export default TailoredResumeModal;
