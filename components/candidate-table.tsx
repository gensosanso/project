"use client";

import { Card, CardContent } from "@/components/ui/card";
import { DataTable } from "@/components/data-table";
import { candidateColumns } from "@/components/columns/campaign-candidate-columns";

interface CandidateTableProps {
  candidates: any[];
}

export default function CandidateTable({ candidates }: CandidateTableProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <DataTable columns={candidateColumns} data={candidates} />
      </CardContent>
    </Card>
  );
}