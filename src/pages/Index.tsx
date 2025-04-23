
import { useState, useEffect } from "react";
import Header from "@/components/Header";
import ImageUploader from "@/components/ImageUploader";
import AnalysisResult from "@/components/AnalysisResult";
import LeafCard from "@/components/LeafCard";
import { Leaf, Sprout, Search } from "lucide-react";
import { analyzeLeaf, diseases } from "@/data/diseases";

interface AnalysisHistory {
  id: string;
  imageUrl: string;
  disease: typeof diseases[number];
  timestamp: string;
}

const Index = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [diseaseResult, setDiseaseResult] = useState<typeof diseases[number] | null>(null);
  const [history, setHistory] = useState<AnalysisHistory[]>([]);

  // Load history from local storage on component mount
  useEffect(() => {
    const savedHistory = localStorage.getItem("leafDetectiveHistory");
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
  }, []);

  // Save history to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem("leafDetectiveHistory", JSON.stringify(history));
  }, [history]);

  const handleImageSelect = (imageUrl: string) => {
    setSelectedImage(imageUrl);
    setAnalyzing(true);
    setDiseaseResult(null);

    // Call the analyze function (simulated API in this demo)
    analyzeLeaf(imageUrl).then((result) => {
      setDiseaseResult(result);
      setAnalyzing(false);

      // Add to history
      const newAnalysis: AnalysisHistory = {
        id: Date.now().toString(),
        imageUrl,
        disease: result,
        timestamp: new Date().toLocaleString(),
      };

      setHistory((prev) => [newAnalysis, ...prev].slice(0, 10)); // Keep only the 10 most recent analyses
    });
  };

  const handleReset = () => {
    setSelectedImage(null);
    setDiseaseResult(null);
  };

  const handleHistoryItemSelect = (item: AnalysisHistory) => {
    setSelectedImage(item.imageUrl);
    setDiseaseResult(item.disease);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 leaf-bg">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        {!selectedImage ? (
          <>
            <section className="text-center max-w-3xl mx-auto mb-12">
              <div className="flex justify-center mb-4">
                <Leaf className="h-12 w-12 text-primary" />
              </div>
              <h1 className="text-4xl font-bold mb-4 gradient-heading">
                Leaf Detective
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Upload a leaf image to identify plant diseases and get recommended treatments
              </p>
              <div className="flex flex-wrap justify-center gap-8 mb-12">
                <div className="flex flex-col items-center max-w-[180px]">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                    <Upload className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-medium text-gray-800 mb-1">Upload Image</h3>
                  <p className="text-sm text-gray-500 text-center">
                    Take a clear photo of the affected leaf
                  </p>
                </div>
                <div className="flex flex-col items-center max-w-[180px]">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                    <Search className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-medium text-gray-800 mb-1">Analyze</h3>
                  <p className="text-sm text-gray-500 text-center">
                    Our system will identify any plant diseases
                  </p>
                </div>
                <div className="flex flex-col items-center max-w-[180px]">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                    <Sprout className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-medium text-gray-800 mb-1">Get Solutions</h3>
                  <p className="text-sm text-gray-500 text-center">
                    Receive treatment recommendations
                  </p>
                </div>
              </div>
              
              <ImageUploader onImageSelect={handleImageSelect} />
            </section>

            {history.length > 0 && (
              <section className="mt-16">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-800">Recent Analyses</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {history.map((item) => (
                    <LeafCard
                      key={item.id}
                      imageUrl={item.imageUrl}
                      diseaseName={item.disease.name}
                      timestamp={item.timestamp}
                      isHealthy={item.disease.id === "healthy"}
                      onSelect={() => handleHistoryItemSelect(item)}
                    />
                  ))}
                </div>
              </section>
            )}
          </>
        ) : (
          <>
            <div className="max-w-2xl mx-auto mb-8">
              <div className="flex justify-center mb-4">
                <img
                  src={selectedImage}
                  alt="Selected leaf"
                  className="max-h-64 object-contain rounded-lg"
                />
              </div>
            </div>
            <AnalysisResult 
              disease={diseaseResult} 
              isLoading={analyzing} 
              onReset={handleReset} 
            />
          </>
        )}
      </main>

      <footer className="py-6 border-t bg-white">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center">
            <Leaf className="h-4 w-4 text-primary mr-2" />
            <p className="text-sm text-gray-500">
              © {new Date().getFullYear()} Leaf Detective
            </p>
          </div>
          <p className="text-xs text-gray-400 mt-2 md:mt-0">
            Developed by VVITU STUDENTS. For educational purposes. Not a substitute for professional plant care advice.
          </p>
        </div>
      </footer>
    </div>
  );
};

const Upload = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" x2="12" y1="3" y2="15" />
    </svg>
  );
};

export default Index;
