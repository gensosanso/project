"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";

// Recruitment stage badge component
function RecruitmentStageBadge({ stage }: { stage: string }) {
  const stageConfig: Record<string, { label: string; className: string }> = {
    applied: {
      label: "Candidature reçue",
      className: "bg-blue-100 text-blue-800 hover:bg-blue-100 dark:bg-blue-900 dark:text-blue-100",
    },
    screening: {
      label: "Présélection",
      className: "bg-purple-100 text-purple-800 hover:bg-purple-100 dark:bg-purple-900 dark:text-purple-100",
    },
    technical_test: {
      label: "Test technique",
      className: "bg-amber-100 text-amber-800 hover:bg-amber-100 dark:bg-amber-900 dark:text-amber-100",
    },
    interview: {
      label: "Entretien",
      className: "bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-900 dark:text-green-100",
    },
    offer: {
      label: "Offre",
      className: "bg-pink-100 text-pink-800 hover:bg-pink-100 dark:bg-pink-900 dark:text-pink-100",
    },
    hired: {
      label: "Embauché",
      className: "bg-emerald-100 text-emerald-800 hover:bg-emerald-100 dark:bg-emerald-900 dark:text-emerald-100",
    },
    rejected: {
      label: "Rejeté",
      className: "bg-red-100 text-red-800 hover:bg-red-100 dark:bg-red-900 dark:text-red-100",
    },
  };

  const config = stageConfig[stage] || {
    label: stage,
    className: "bg-gray-100 text-gray-800 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-100",
  };

  return <Badge className={config.className}>{config.label}</Badge>;
}

// Get candidate's initials for avatar
function getInitials(firstName: string, lastName: string) {
  return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
}

// Format date for display
function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

// Column definitions
export const candidateColumns: ColumnDef<any>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: "Nom",
    cell: ({ row }) => {
      const firstName = row.original.firstName;
      const lastName = row.original.lastName;
      
      return (
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8">
            <AvatarFallback className="bg-primary/10 text-primary">
              {getInitials(firstName, lastName)}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium">{`${lastName} ${firstName}`}</div>
            <div className="text-xs text-muted-foreground">{row.original.email}</div>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "education",
    header: "Formation",
    cell: ({ row }) => {
      const educationMap: Record<string, string> = {
        "bac": "Baccalauréat",
        "bac+2": "Bac+2",
        "bac+3": "Bac+3",
        "bac+4": "Bac+4",
        "bac+5": "Bac+5",
        "doctorat": "Doctorat",
      };
      
      return (
        <div>
          <div className="font-medium">{educationMap[row.original.educationLevel] || row.original.educationLevel}</div>
          <div className="text-xs text-muted-foreground">{row.original.specialization}</div>
        </div>
      );
    },
  },
  {
    accessorKey: "experience",
    header: "Expérience",
    cell: ({ row }) => {
      const years = row.original.yearsOfExperience;
      return (
        <div>{years} {years > 1 ? "ans" : "an"}</div>
      );
    },
  },
  {
    accessorKey: "recruitmentStage",
    header: "Étape",
    cell: ({ row }) => {
      return <RecruitmentStageBadge stage={row.original.recruitmentStage} />;
    },
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => {
      return <div>{formatDate(row.original.createdAt)}</div>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return (
        <div className="flex items-center justify-end">
          <Button variant="ghost" size="icon" className="mr-1">
            <FileText className="h-4 w-4" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-4 w-4" />
                <span className="sr-only">Menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem>Voir le profil</DropdownMenuItem>
              <DropdownMenuItem>Voir le CV</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Passer à l&apos;étape suivante</DropdownMenuItem>
              <DropdownMenuItem>Programmer un entretien</DropdownMenuItem>
              <DropdownMenuItem>Envoyer un email</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive">Rejeter</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];