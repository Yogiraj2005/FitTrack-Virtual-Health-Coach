
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckCircle2, XCircle, Camera, RefreshCw } from "lucide-react";

// List of exercises that can be scanned
const EXERCISES = [
  { id: "squat", name: "Squat" },
  { id: "pushup", name: "Push-up" },
  { id: "lunge", name: "Lunge" },
  { id: "plank", name: "Plank" },
  { id: "deadlift", name: "Deadlift" }
];

// Mock feedback messages for demonstration purposes
const FEEDBACK_MESSAGES = {
  good: [
    "Great form! Keep it up.",
    "Excellent posture and alignment.",
    "Your form looks perfect.",
    "You're maintaining proper technique."
  ],
  needs_improvement: [
    "Try to keep your back straighter.",
    "Lower your hips a bit more.",
    "Keep your knees aligned with your toes.",
    "Make sure to fully extend at the top of the movement.",
    "Try to maintain a neutral spine position."
  ]
};

const FormScanner = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [selectedExercise, setSelectedExercise] = useState<string>("squat");
  const [isScanning, setIsScanning] = useState(false);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [feedback, setFeedback] = useState<{ good: boolean; message: string } | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);

  // Request camera permissions and setup video stream
  const setupCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user" }
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        setStream(mediaStream);
        setHasPermission(true);
      }
    } catch (error) {
      console.error("Error accessing camera:", error);
      setHasPermission(false);
    }
  };

  // Cleanup function to stop camera stream
  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
      setStream(null);
    }
  };

  // Start the scanning process
  const startScanning = () => {
    if (!isScanning) {
      setIsScanning(true);
      setFeedback(null);
      setTimeout(() => {
        analyzePose();
      }, 3000); // Wait 3 seconds before providing feedback
    }
  };

  // Mock pose analysis - in a real app this would use a ML model
  const analyzePose = () => {
    if (!isScanning) return;
    
    // Capture current frame to canvas for analysis
    if (videoRef.current && canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");
      if (ctx) {
        canvasRef.current.width = videoRef.current.videoWidth;
        canvasRef.current.height = videoRef.current.videoHeight;
        ctx.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
        
        // In a real implementation, we would pass this image data to a pose estimation model
        // For this demo, we'll just randomly generate feedback
        
        // Randomly determine if form is good or needs improvement
        const isGoodForm = Math.random() > 0.4; // 60% chance of good form for demo
        
        // Get random feedback message
        const feedbackType = isGoodForm ? "good" : "needs_improvement";
        const messages = FEEDBACK_MESSAGES[feedbackType];
        const randomMessage = messages[Math.floor(Math.random() * messages.length)];
        
        setFeedback({
          good: isGoodForm,
          message: randomMessage
        });
      }
    }
    
    setIsScanning(false);
  };

  // Initialize camera when component mounts
  useEffect(() => {
    setupCamera();
    
    // Cleanup function when component unmounts
    return () => {
      stopCamera();
    };
  }, []);

  return (
    <div className="flex flex-col items-center space-y-6">
      <div className="flex w-full justify-between mb-2">
        <Select value={selectedExercise} onValueChange={setSelectedExercise}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Select exercise" />
          </SelectTrigger>
          <SelectContent>
            {EXERCISES.map(exercise => (
              <SelectItem key={exercise.id} value={exercise.id}>{exercise.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        <Button 
          onClick={isScanning ? undefined : startScanning}
          disabled={!hasPermission || isScanning}
          className={isScanning ? "bg-red-600 hover:bg-red-700" : "bg-fitness-primary hover:bg-fitness-primary/90"}
        >
          {isScanning ? (
            <>
              <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
              Analyzing...
            </>
          ) : (
            <>
              <Camera className="h-4 w-4 mr-2" />
              Start Scanning
            </>
          )}
        </Button>
      </div>
      
      {hasPermission === false && (
        <Alert variant="destructive">
          <XCircle className="h-4 w-4" />
          <AlertTitle>Camera Access Denied</AlertTitle>
          <AlertDescription>
            Please allow camera access to use the form scanner. Check your browser settings.
          </AlertDescription>
        </Alert>
      )}
      
      <div className="relative w-full max-w-2xl mx-auto aspect-video bg-black rounded-lg overflow-hidden">
        <video 
          ref={videoRef}
          autoPlay 
          playsInline 
          muted 
          className="w-full h-full object-cover"
        />
        <canvas ref={canvasRef} className="hidden" /> {/* Canvas used for processing frames */}
        
        {isScanning && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40">
            <div className="text-white text-xl font-bold">Analyzing your form...</div>
          </div>
        )}
      </div>
      
      {feedback && (
        <Alert variant={feedback.good ? "default" : "destructive"} className={feedback.good ? "border-green-500 bg-green-50" : ""}>
          {feedback.good ? (
            <CheckCircle2 className="h-4 w-4 text-green-600" />
          ) : (
            <XCircle className="h-4 w-4" />
          )}
          <AlertTitle>{feedback.good ? "Good Form" : "Form Needs Improvement"}</AlertTitle>
          <AlertDescription>{feedback.message}</AlertDescription>
        </Alert>
      )}
      
      <div className="w-full max-w-2xl text-sm text-gray-500">
        <h3 className="font-medium mb-2">How to use:</h3>
        <ol className="list-decimal pl-5 space-y-1">
          <li>Select the exercise you want to perform</li>
          <li>Position yourself so your full body is visible in the camera</li>
          <li>Click "Start Scanning" and begin your exercise</li>
          <li>Hold the position while the analysis is performed</li>
          <li>Review feedback to improve your form</li>
        </ol>
        <p className="mt-2 italic">
          Note: This is a demonstration of form scanning capability. In a production environment, 
          this would use a trained machine learning model for accurate pose estimation and analysis.
        </p>
      </div>
    </div>
  );
};

export default FormScanner;
