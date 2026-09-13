import React, { useState, useEffect } from 'react';
import { X, Save, MessageSquare } from 'lucide-react';
import api from '../../api/axios';

const CoverLetterModal = ({ isOpen, onClose, application, masterResume, onSaveSuccess }) => {
  const [text, setText] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (isOpen) {
      if (application?.cover_letter) {
        setText(application.cover_letter);
      } else {
        // Auto-generate a "Mock" LinkedIn message based on available data
        const position = application?.position_title || "[Role]";
        const company = application?.company_name || "[Company]";
        
        let mockMessage = `Hi Hiring Manager,\n\nI recently came across the ${position} position at ${company} and I'm very interested in learning more.`;
        
        if (masterResume?.parsed_text) {
           mockMessage += ` Given my background and experience outlined in my profile, I believe I could be a strong fit for your team.`;
        }
        
        mockMessage += `\n\nI'd love to connect and discuss how my skills align with your current needs at ${company}.\n\nBest regards,\n[Your Name]`;
        
        setText(mockMessage);
      }
    }
  }, [isOpen, application, masterResume]);

  if (!isOpen || !application) return null;

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const response = await api.patch(`/api/applications/${application.id}/`, {
        cover_letter: text
      });
      onSaveSuccess(response.data);
      onClose();
    } catch (error) {
      console.error("Failed to save cover letter / message", error);
      alert("Failed to save. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    alert("Message copied to clipboard!");
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-brand-900 w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden border border-gray-200 dark:border-brand-800 flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-brand-800 bg-gray-50 dark:bg-brand-900/50">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/40 rounded-lg">
              <MessageSquare size={24} className="text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h2 className="text-xl font-black text-gray-900 dark:text-white">
                Message Hiring Manager ({application.company_name})
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                Review and edit your personalized LinkedIn outreach message.
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
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Your message goes here..."
            className="w-full h-full min-h-[300px] p-4 bg-gray-50 dark:bg-brand-950 border border-gray-200 dark:border-brand-800 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800 dark:text-gray-200 resize-none font-mono text-sm leading-relaxed"
          />
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 dark:border-brand-800 bg-gray-50 dark:bg-brand-900/50 flex justify-end gap-3">
          <button
            onClick={handleCopy}
            className="px-6 py-2.5 font-bold text-blue-700 bg-blue-100 hover:bg-blue-200 dark:text-blue-300 dark:bg-blue-900/40 dark:hover:bg-blue-800/60 rounded-xl transition-colors cursor-pointer"
          >
            Copy to Clipboard
          </button>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="flex items-center gap-2 px-6 py-2.5 font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors disabled:opacity-50 cursor-pointer"
          >
            {isSaving ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <Save size={18} />
            )}
            Save Message
          </button>
        </div>
      </div>
    </div>
  );
};

export default CoverLetterModal;
