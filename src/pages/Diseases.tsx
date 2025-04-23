
import { diseases } from "@/data/diseases";
import Header from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bug, Leaf } from "lucide-react";
import { Link } from "react-router-dom";

const Diseases = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-2 mb-8">
          <Bug className="h-6 w-6 text-amber-600" />
          <h1 className="text-3xl font-bold">Plant Diseases Catalog</h1>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {diseases.filter(d => d.id !== "healthy").map((disease) => (
            <Link 
              key={disease.id} 
              to={`/diseases/${disease.id}`}
              className="transition-transform hover:scale-105"
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bug className="h-5 w-5 text-amber-600" />
                    {disease.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{disease.description}</p>
                  <div className="bg-amber-50 p-3 rounded-md border border-amber-100">
                    <p className="text-sm font-medium text-amber-800">
                      {disease.symptoms[0]}...
                    </p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Diseases;
