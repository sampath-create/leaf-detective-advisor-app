
import { useParams, Link } from "react-router-dom";
import { diseases } from "@/data/diseases";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Bug, ChevronLeft, Leaf, TestTube } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const DiseaseDetails = () => {
  const { id } = useParams();
  const disease = diseases.find(d => d.id === id);

  if (!disease) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Disease not found</h1>
            <Link to="/diseases">
              <Button>Back to Diseases</Button>
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <Link to="/diseases" className="inline-flex items-center text-gray-600 hover:text-primary mb-6">
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back to Diseases
        </Link>

        <div className="max-w-3xl mx-auto">
          <div className={`p-6 border rounded-lg bg-amber-50 border-amber-200 mb-8`}>
            <div className="flex items-center gap-2 mb-4">
              <Bug className="h-6 w-6 text-amber-600" />
              <h1 className="text-2xl font-bold">{disease.name}</h1>
            </div>
            <p className="text-gray-700 mb-6">{disease.description}</p>

            <div className="mb-6">
              <h2 className="font-medium mb-3 text-gray-800">Common Symptoms:</h2>
              <ul className="list-disc pl-5 space-y-2">
                {disease.symptoms.map((symptom, index) => (
                  <li key={index} className="text-gray-700">{symptom}</li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="font-medium mb-3 flex items-center gap-2 text-gray-800">
                <TestTube className="h-4 w-4 text-primary" />
                Recommended Treatments:
              </h2>
              <Accordion type="single" collapsible className="w-full">
                {disease.pesticides.map((pesticide, index) => (
                  <AccordionItem key={index} value={`pesticide-${index}`}>
                    <AccordionTrigger className="text-left hover:no-underline">
                      <span className="font-medium">{pesticide.name}</span>
                    </AccordionTrigger>
                    <AccordionContent>
                      <p className="mb-2 text-gray-600">{pesticide.description}</p>
                      <div className="bg-white p-3 rounded-md border border-gray-100">
                        <p className="text-sm font-medium text-gray-700">Usage Instructions:</p>
                        <p className="text-sm text-gray-600">{pesticide.usage}</p>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DiseaseDetails;
