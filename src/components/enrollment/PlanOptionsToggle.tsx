
import React from 'react';
import { Button } from "@/components/ui/button";

interface PlanOptionsToggleProps {
  showAllOptions: boolean;
  handleToggleOptions: () => void;
}

const PlanOptionsToggle: React.FC<PlanOptionsToggleProps> = ({ showAllOptions, handleToggleOptions }) => {
  return (
    <div className="flex justify-center mt-8">
      <Button 
        variant="default"
        onClick={handleToggleOptions}
        className="transition-all duration-500 ease-in-out transform hover:scale-105"
      >
        {showAllOptions ? "Show Primary Options Only" : "See All Payment Options & Installments"}
      </Button>
    </div>
  );
};

export default PlanOptionsToggle;
