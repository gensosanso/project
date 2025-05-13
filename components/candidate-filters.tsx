"use client";

import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { FilterCriteria } from "@/types";

interface CandidateFiltersProps {
  onFilterChange: (filters: FilterCriteria) => void;
}

export default function CandidateFilters({ onFilterChange }: CandidateFiltersProps) {
  const [filters, setFilters] = useState<FilterCriteria>({
    educationLevel: [],
    ageRange: { min: 18, max: 60 },
    specialization: [],
    yearsOfExperience: 0,
  });

  // Handle education level change
  const handleEducationChange = (checked: boolean | "indeterminate", level: string) => {
    if (checked === "indeterminate") return;

    setFilters((prev) => {
      const newEducationLevel = checked
        ? [...(prev.educationLevel || []), level]
        : (prev.educationLevel || []).filter((l) => l !== level);

      const newFilters = {
        ...prev,
        educationLevel: newEducationLevel,
      };
      
      onFilterChange(newFilters);
      return newFilters;
    });
  };

  // Handle specialization change
  const handleSpecializationChange = (checked: boolean | "indeterminate", specialization: string) => {
    if (checked === "indeterminate") return;

    setFilters((prev) => {
      const newSpecialization = checked
        ? [...(prev.specialization || []), specialization]
        : (prev.specialization || []).filter((s) => s !== specialization);

      const newFilters = {
        ...prev,
        specialization: newSpecialization,
      };
      
      onFilterChange(newFilters);
      return newFilters;
    });
  };

  // Handle years of experience change
  const handleExperienceChange = (value: number[]) => {
    setFilters((prev) => {
      const newFilters = {
        ...prev,
        yearsOfExperience: value[0],
      };
      
      onFilterChange(newFilters);
      return newFilters;
    });
  };

  // Handle age range change
  const handleAgeRangeChange = (value: number[]) => {
    setFilters((prev) => {
      const newFilters = {
        ...prev,
        ageRange: { min: value[0], max: value[1] },
      };
      
      onFilterChange(newFilters);
      return newFilters;
    });
  };

  // Reset all filters
  const resetFilters = () => {
    const defaultFilters = {
      educationLevel: [],
      ageRange: { min: 18, max: 60 },
      specialization: [],
      yearsOfExperience: 0,
    };
    setFilters(defaultFilters);
    onFilterChange(defaultFilters);
  };

  const educationLevels = [
    { id: "bac", label: "Baccalauréat" },
    { id: "bac+2", label: "Bac+2" },
    { id: "bac+3", label: "Bac+3" },
    { id: "bac+4", label: "Bac+4" },
    { id: "bac+5", label: "Bac+5" },
    { id: "doctorat", label: "Doctorat" },
  ];

  const specializations = [
    { id: "informatique", label: "Informatique" },
    { id: "finance", label: "Finance" },
    { id: "marketing", label: "Marketing" },
    { id: "ressources humaines", label: "Ressources Humaines" },
    { id: "commerce", label: "Commerce" },
  ];

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Filtres</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Education Level Filter */}
        <div className="space-y-3">
          <h3 className="font-medium">Niveau d&apos;études</h3>
          <div className="space-y-2">
            {educationLevels.map((level) => (
              <div key={level.id} className="flex items-center space-x-2">
                <Checkbox
                  id={`education-${level.id}`}
                  checked={filters.educationLevel?.includes(level.id)}
                  onCheckedChange={(checked) =>
                    handleEducationChange(checked, level.id)
                  }
                />
                <Label
                  htmlFor={`education-${level.id}`}
                  className="text-sm font-normal"
                >
                  {level.label}
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* Experience Filter */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-medium">Expérience minimale</h3>
            <span className="text-sm font-medium">
              {filters.yearsOfExperience} ans
            </span>
          </div>
          <Slider
            value={[filters.yearsOfExperience || 0]}
            min={0}
            max={15}
            step={1}
            onValueChange={handleExperienceChange}
          />
        </div>

        {/* Age Range Filter */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-medium">Âge</h3>
            <span className="text-sm font-medium">
              {filters.ageRange?.min} - {filters.ageRange?.max} ans
            </span>
          </div>
          <Slider
            value={[
              filters.ageRange?.min || 18,
              filters.ageRange?.max || 60,
            ]}
            min={18}
            max={70}
            step={1}
            onValueChange={handleAgeRangeChange}
          />
        </div>

        {/* Specialization Filter */}
        <div className="space-y-3">
          <h3 className="font-medium">Spécialisation</h3>
          <div className="space-y-2">
            {specializations.map((spec) => (
              <div key={spec.id} className="flex items-center space-x-2">
                <Checkbox
                  id={`spec-${spec.id}`}
                  checked={filters.specialization?.includes(spec.id)}
                  onCheckedChange={(checked) =>
                    handleSpecializationChange(checked, spec.id)
                  }
                />
                <Label
                  htmlFor={`spec-${spec.id}`}
                  className="text-sm font-normal"
                >
                  {spec.label}
                </Label>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col justify-between pt-3 border-t">
        <Button variant="ghost" onClick={resetFilters}>
          Réinitialiser
        </Button>
        <Button onClick={() => onFilterChange(filters)}>Appliquer</Button>
      </CardFooter>
    </Card>
  );
}