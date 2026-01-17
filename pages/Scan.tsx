
import React, { useState, useRef, useEffect } from 'react';
import { AnalysisResult } from '../types';
import { analyzeFaceImage } from '../services/ai';
import GlassCard from '../components/GlassCard';

interface ScanProps {
  user: any;
  onAnalysisComplete: (res: AnalysisResult) => void;
}

const Scan: React.FC<ScanProps> = ({ onAnalysisComplete }) => {
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    startCamera();
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user' },
        audio: false
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err) {
      console.error("Camera error:", err);
      alert("Please allow camera access to start the scan.");
    }
  };

  const captureAndAnalyze = async () => {
    if (!videoRef.current || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const video = videoRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const imageData = canvas.toDataURL('image/jpeg');
      setCapturedImage(imageData);
      
      // Start scanning animation
      setIsScanning(true);
      let progress = 0;
      const interval = setInterval(() => {
        progress += 2;
        setScanProgress(progress);
        if (progress >= 100) {
          clearInterval(interval);
          completeAnalysis(imageData);
        }
      }, 60);
    }
  };

  const completeAnalysis = async (image: string) => {
    const result = await analyzeFaceImage(image);
    onAnalysisComplete(result);
  };

  return (
    <div className="flex flex-col min-h-screen pt-12 px-6">
      <div className="mb-8 text-center">
        <h2 className="text-gray-500 text-xs font-black uppercase tracking-widest mb-1">Optical Scan Phase</h2>
        <h1 className="text-2xl font-black text-white">Capture Face</h1>
      </div>

      <div className="relative aspect-[3/4] w-full max-w-sm mx-auto rounded-3xl overflow-hidden border-2 border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] bg-black">
        {capturedImage ? (
          <img src={capturedImage} alt="Capture" className="w-full h-full object-cover" />
        ) : (
          <video
            ref={videoRef}
            autoPlay
            playsInline
            className="w-full h-full object-cover scale-x-[-1]"
          />
        )}
        
        {isScanning && (
          <div className="scanner-line"></div>
        )}

        {!isScanning && !capturedImage && (
          <div className="absolute inset-0 pointer-events-none border-[30px] border-black/40 flex items-center justify-center">
             <div className="w-full h-full border-2 border-[#00ff88]/30 border-dashed rounded-[40px]"></div>
          </div>
        )}

        {isScanning && (
           <div className="absolute bottom-10 left-0 right-0 px-10 text-center">
             <div className="bg-black/60 backdrop-blur-md rounded-full px-6 py-2 border border-[#00ff88]/30">
                <span className="text-[#00ff88] text-[10px] font-black uppercase tracking-widest animate-pulse">
                  Analyzing Symmetry {scanProgress}%
                </span>
             </div>
           </div>
        )}
      </div>

      <canvas ref={canvasRef} className="hidden" />

      <div className="mt-12 flex flex-col items-center gap-6">
        <button
          onClick={captureAndAnalyze}
          disabled={isScanning}
          className={`w-20 h-20 rounded-full flex items-center justify-center border-4 border-white/10 transition-all ${
            isScanning ? 'bg-gray-800' : 'bg-white active:scale-90 hover:scale-105 shadow-[0_0_30px_rgba(255,255,255,0.3)]'
          }`}
        >
          <div className={`w-16 h-16 rounded-full border-2 border-[#0a0a0a] ${isScanning ? 'bg-gray-700' : 'bg-white'}`}></div>
        </button>

        <p className="text-center text-gray-500 text-[10px] font-bold uppercase tracking-widest max-w-[200px]">
          Center your face in the grid. Ensure even lighting for accurate measurement.
        </p>
      </div>

      <button 
        onClick={() => window.location.reload()}
        className="mt-auto mb-10 text-gray-600 text-[10px] font-black uppercase tracking-widest"
      >
        Cancel Protocol
      </button>
    </div>
  );
};

export default Scan;
