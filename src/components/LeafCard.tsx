
import { useState } from "react";
import { Leaf, Bug } from "lucide-react";
import { Button } from "@/components/ui/button";

interface LeafCardProps {
  imageUrl: string;
  diseaseName: string;
  timestamp: string;
  isHealthy: boolean;
  onSelect: () => void;
}

const LeafCard = ({ imageUrl, diseaseName, timestamp, isHealthy, onSelect }: LeafCardProps) => {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <div 
      className="leaf-card relative overflow-hidden"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="relative">
        <img 
          src={imageUrl} 
          alt={`Leaf with ${diseaseName}`} 
          className="w-full h-32 object-cover rounded-md mb-2"
        />
        <div 
          className={`absolute inset-0 flex items-center justify-center bg-black/50 transition-opacity duration-200 ${
            isHovering ? "opacity-100" : "opacity-0"
          }`}
        >
          <Button size="sm" variant="secondary" onClick={onSelect}>
            View Details
          </Button>
        </div>
      </div>
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-1">
            {isHealthy ? (
              <Leaf className="h-3.5 w-3.5 text-green-600" />
            ) : (
              <Bug className="h-3.5 w-3.5 text-amber-600" />
            )}
            <h3 className="font-medium text-sm">{diseaseName}</h3>
          </div>
          <p className="text-xs text-gray-500">{timestamp}</p>
        </div>
      </div>
    </div>
  );
};

export default LeafCard;
