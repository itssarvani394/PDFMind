'use client'
/**
* Enhanced PDFMind Dashboard - Modern AI Document Assistant
* Features: Gradient backgrounds, smooth animations, glass morphism effects
*/
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Uppy from '@uppy/core';
import { Dashboard } from '@uppy/react';
import XHR from '@uppy/xhr-upload';
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FileText, 
  Brain, 
  Sparkles, 
  Upload, 
  Send, 
  Loader2,
  CheckCircle,
  AlertCircle,
  Zap,
  BookOpen
} from "lucide-react";

import { UserButton } from "@clerk/nextjs";
import '@uppy/core/dist/style.min.css';
import '@uppy/dashboard/dist/style.min.css';
import '../app/dashboard.css';
import toast from "react-hot-toast";
import Markdown from "react-markdown";

export function DashboardComponent() {
  const [question, setQuestion] = useState('');
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState(0);
  const [backendUrl] = useState(process.env.NEXT_PUBLIC_BACKEND_URL || 'http://127.0.0.1:8000');
  
  const [uppy] = useState(() => new Uppy({
    restrictions: { allowedFileTypes: ['application/pdf'] },
  })
    .use(XHR, {
      endpoint: `${backendUrl}/upload/`,
      bundle: true,
      formData: true,
      fieldName: 'files',
    })
    .on('complete', (result) => {
      setLoading(false);
      setUploadedFiles(result.successful.length);
      console.log(result.successful.map(item => item.response?.body));
      toast.success('Files uploaded successfully');
      // Trigger the processing after upload
      fetch(`${backendUrl}/process/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(res => res.json())
        .then(data => {
          if (data.status === 'success') {
            setResponse(data.generation);
            toast.success('Question Processed');
          } else {
            toast.error('Processing failed');
          }
        })
        .catch(err => {
          console.log('Processing error:', err);
          toast.error(`Error processing question: ${err.message || 'Unknown error'}`);
        });
    })
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-40 left-40 w-60 h-60 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
      </div>

      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 flex justify-between items-center p-6"
      >
        <div className="flex items-center space-x-3">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center"
          >
            <Brain className="w-6 h-6 text-white" />
          </motion.div>
          <div>
            <h1 className="text-2xl font-bold gradient-text">
              PDFMind
            </h1>
            <p className="text-sm text-gray-300">AI Document Assistant</p>
          </div>
        </div>
        <UserButton />
      </motion.div>

      <div className="relative z-10 flex h-[calc(100vh-120px)]">
        {/* Sidebar */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-80 bg-white/10 backdrop-blur-lg border-r border-white/20 p-6"
        >
          <div className="space-y-6">
            {/* Upload Section */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Upload className="w-5 h-5 text-purple-400" />
                <h2 className="text-lg font-semibold">Upload Documents</h2>
              </div>
              
              <div className="glass rounded-xl p-4 card-hover">
                <Dashboard
                  uppy={uppy}
                  proudlyDisplayPoweredByUppy={false}
                  hideUploadButton
                  theme="dark"
                />
              </div>

              {uploadedFiles > 0 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex items-center space-x-2 text-green-400"
                >
                  <CheckCircle className="w-5 h-5" />
                  <span className="text-sm">{uploadedFiles} file(s) uploaded</span>
                </motion.div>
              )}
            </div>

            {/* Process Button */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl btn-glow"
                disabled={question.length === 0 || loading}
                onClick={() => {
                  setLoading(true);
                  fetch(`${backendUrl}/question/`, {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ ques: question }),
                  })
                    .then(res => res.json())
                    .then(data => {
                      console.log(data);
                      uppy.upload();
                    })
                    .catch(err => {
                      console.log('Question submission error:', err);
                      toast.error(`Error submitting question: ${err.message || 'Unknown error'}`);
                      setLoading(false);
                    });
                }}
              >
                {loading ? (
                  <div className="flex items-center space-x-2">
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Processing...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <Zap className="w-5 h-5" />
                    <span>Process Question</span>
                  </div>
                )}
              </Button>
            </motion.div>

            {/* Status Indicators */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-300">Status</span>
                <div className="flex items-center space-x-2">
                  <div className={`w-2 h-2 rounded-full ${loading ? 'bg-yellow-400 status-pulse' : 'bg-green-400'}`}></div>
                  <span className={loading ? 'text-yellow-400' : 'text-green-400'}>
                    {loading ? 'Processing' : 'Ready'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Main Content */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex-1 p-6"
        >
          <div className="h-full flex flex-col">
            {/* Question Input */}
            <div className="mb-6">
              <div className="flex items-center space-x-2 mb-4">
                <BookOpen className="w-6 h-6 text-purple-400" />
                <h2 className="text-xl font-semibold">Ask Your Question</h2>
              </div>
              
              <div className="relative">
                <Input
                  className="w-full bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder-gray-400 rounded-xl py-4 px-6 text-lg input-focus transition-all duration-300"
                  placeholder="What would you like to know about your document?"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  disabled={loading}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && !loading && question.trim()) {
                      setLoading(true);
                      fetch(`${backendUrl}/question/`, {
                        method: 'POST',
                        headers: {
                          'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ ques: question }),
                      })
                        .then(res => res.json())
                        .then(data => {
                          console.log(data);
                          uppy.upload();
                        })
                        .catch(err => {
                          console.log('Question submission error:', err);
                          toast.error(`Error submitting question: ${err.message || 'Unknown error'}`);
                          setLoading(false);
                        });
                    }
                  }}
                />
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                >
                  <Button
                    size="sm"
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-lg p-2"
                    disabled={loading || !question.trim()}
                    onClick={() => {
                      setLoading(true);
                      fetch(`${backendUrl}/question/`, {
                        method: 'POST',
                        headers: {
                          'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ ques: question }),
                      })
                        .then(res => res.json())
                        .then(data => {
                          console.log(data);
                          uppy.upload();
                        })
                        .catch(err => {
                          console.log('Question submission error:', err);
                          toast.error(`Error submitting question: ${err.message || 'Unknown error'}`);
                          setLoading(false);
                        });
                    }}
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </motion.div>
              </div>
            </div>

            {/* Response Area */}
            <div className="flex-1">
              <AnimatePresence>
                {response ? (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                    className="h-full glass rounded-2xl p-6 overflow-y-auto card-hover"
                  >
                    <div className="flex items-center space-x-2 mb-4">
                      <Sparkles className="w-5 h-5 text-purple-400" />
                      <h3 className="text-lg font-semibold">AI Response</h3>
                    </div>
                    <div className="prose prose-invert max-w-none">
                      <Markdown className="text-gray-100 leading-relaxed">
                        {response}
                      </Markdown>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="h-full flex items-center justify-center"
                  >
                    <div className="text-center space-y-4">
                      <motion.div
                        animate={{ 
                          scale: [1, 1.1, 1],
                          rotate: [0, 5, -5, 0]
                        }}
                        transition={{ 
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                        className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto"
                      >
                        <Brain className="w-10 h-10 text-white" />
                      </motion.div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-300 mb-2">
                          Ready to Answer Your Questions
                        </h3>
                        <p className="text-gray-400">
                          Upload a PDF and ask anything about its content
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
