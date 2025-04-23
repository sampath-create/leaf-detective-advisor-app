
import { useState, useEffect } from "react";
import { diseases } from "@/data/diseases";
import { Bug, Microscope, TestTube, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Skeleton } from "@/components/ui/skeleton";

interface AnalysisResultProps {
  disease: typeof diseases[number] | null;
  isLoading: boolean;
  onReset: () => void;
}

const AnalysisResult = ({ disease, isLoading, onReset }: AnalysisResultProps) => {
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (disease && disease.id === "healthy") {
      setShowConfetti(true);
      const timer = setTimeout(() => setShowConfetti(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [disease]);

  if (isLoading) {
    return (
      <div className="w-full max-w-2xl mx-auto mt-8 p-6 border rounded-lg">
        <div className="flex items-center gap-2 mb-4">
          <Microscope className="h-5 w-5 text-primary" />
          <Skeleton className="h-8 w-56" />
        </div>
        <Skeleton className="h-4 w-full mb-6" />
        <div className="space-y-4">
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-36 w-full" />
        </div>
      </div>
    );
  }

  if (!disease) return null;

  const isHealthy = disease.id === "healthy";

  return (
    <div className="w-full max-w-2xl mx-auto mt-8">
      <div className={`p-6 border rounded-lg ${isHealthy ? "bg-green-50 border-green-200" : "bg-amber-50 border-amber-200"}`}>
        <div className="flex items-center gap-2 mb-2">
          {isHealthy ? (
            <Leaf className="h-5 w-5 text-green-600" />
          ) : (
            <Bug className="h-5 w-5 text-amber-600" />
          )}
          <h2 className="text-xl font-bold">{disease.name}</h2>
        </div>

        <p className="text-gray-600 mb-6">{disease.description}</p>

        {!isHealthy && (
          <>
            <div className="mb-6">
              <h3 className="font-medium mb-2 text-gray-800">Common Symptoms:</h3>
              <ul className="list-disc pl-5 space-y-1">
                {disease.symptoms.map((symptom, index) => (
                  <li key={index} className="text-gray-600">
                    {symptom}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-medium mb-3 flex items-center gap-1 text-gray-800">
                <TestTube className="h-4 w-4 text-primary" />
                Recommended Treatments:
              </h3>

              <Accordion type="single" collapsible className="w-full">
                {disease.pesticides.map((pesticide, index) => (
                  <AccordionItem key={index} value={`pesticide-${index}`}>
                    <AccordionTrigger className="text-left hover:no-underline">
                      <span className="font-medium">{pesticide.name}</span>
                    </AccordionTrigger>
                    <AccordionContent>
                      <p className="mb-2 text-gray-600">{pesticide.description}</p>
                      <div className="bg-gray-50 p-3 rounded-md border border-gray-100">
                        <p className="text-sm font-medium text-gray-700">Usage Instructions:</p>
                        <p className="text-sm text-gray-600">{pesticide.usage}</p>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </>
        )}

        {isHealthy && (
          <div className="bg-green-100 p-4 rounded-md text-green-800 mb-6">
            <p className="font-medium">Good news! Your plant appears to be healthy.</p>
            <p className="text-sm mt-1">
              Continue with your current care routine to maintain plant health.
            </p>
          </div>
        )}

        <div className="mt-6 flex justify-end">
          <Button onClick={onReset} variant="outline">
            Analyze Another Leaf
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AnalysisResult;
