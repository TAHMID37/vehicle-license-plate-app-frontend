"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface ProcessResultProps {
  result: {
    message: string;
    duration_hours?: number;
    charged_amount?: number;
  };
}

export default function ProcessResult({ result }: ProcessResultProps) {
  const [open, setOpen] = useState(true);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Process Result</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p className="text-lg">{result.message}</p>
          {result.duration_hours && (
            <p>Duration: {result.duration_hours.toFixed(2)} hours</p>
          )}
          {result.charged_amount && (
            <p>Amount Charged: ৳{result.charged_amount.toFixed(2)}</p>
          )}
          <Button onClick={() => setOpen(false)} className="w-full">
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}