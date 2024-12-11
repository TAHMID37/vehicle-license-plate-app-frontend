// "use client";

// import { useState } from "react";
// import { Camera, Upload } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { useToast } from "@/hooks/use-toast";
// import ProcessResult from "@/components/process-result";

// export default function ProcessPage() {
//   const [file, setFile] = useState<File | null>(null);
//   const [state, setState] = useState<"enter" | "exit">("enter");
//   const [loading, setLoading] = useState(false);
//   const [result, setResult] = useState<any>(null);
//   const { toast } = useToast();

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!file) {
//       toast({
//         title: "Error",
//         description: "Please select an image file",
//         variant: "destructive",
//       });
//       return;
//     }

//     setLoading(true);
//     const formData = new FormData();
//     formData.append("file", file);
//     formData.append("state", state);

//     try {
//       const response = await fetch("http://localhost:8000/process/", {
//         method: "POST",
//         body: formData,
//       });
//       const data = await response.json();
//       setResult(data);
//     } catch (error) {
//       toast({
//         title: "Error",
//         description: "Failed to process vehicle",
//         variant: "destructive",
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <Card className="max-w-2xl mx-auto">
//         <CardHeader>
//           <CardTitle className="text-2xl font-bold text-center">
//             Process Vehicle Entry/Exit
//           </CardTitle>
//         </CardHeader>
//         <CardContent>
//           <form onSubmit={handleSubmit} className="space-y-6">
//             <div className="space-y-2">
//               <label className="block text-sm font-medium">Process Type</label>
//               <Select value={state} onValueChange={(value: "enter" | "exit") => setState(value)}>
//                 <SelectTrigger>
//                   <SelectValue placeholder="Select process type" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="enter">Vehicle Entry</SelectItem>
//                   <SelectItem value="exit">Vehicle Exit</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>

//             <div className="space-y-2">
//               <label className="block text-sm font-medium">Vehicle Image</label>
//               <div className="flex items-center justify-center w-full">
//                 <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer hover:bg-muted/50">
//                   <div className="flex flex-col items-center justify-center pt-5 pb-6">
//                     {file ? (
//                       <div className="text-center">
//                         <Camera className="mx-auto h-12 w-12 text-muted-foreground" />
//                         <p className="mt-2 text-sm text-muted-foreground">
//                           {file.name}
//                         </p>
//                       </div>
//                     ) : (
//                       <div className="text-center">
//                         <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
//                         <p className="mt-2 text-sm text-muted-foreground">
//                           Click to upload or drag and drop
//                         </p>
//                       </div>
//                     )}
//                   </div>
//                   <input
//                     type="file"
//                     className="hidden"
//                     accept="image/*"
//                     onChange={(e) => setFile(e.target.files?.[0] || null)}
//                   />
//                 </label>
//               </div>
//             </div>

//             <Button type="submit" className="w-full" disabled={loading}>
//               {loading ? "Processing..." : "Process Vehicle"}
//             </Button>
//           </form>

//           {result && <ProcessResult result={result} />}
//         </CardContent>
//       </Card>
//     </div>
//   );
// }

"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FileUpload } from "@/components/ui/file-upload";
import { processVehicle } from "@/lib/api";

export default function ProcessPage() {
  const [file, setFile] = useState<File | null>(null);
  const [state, setState] = useState<"enter" | "exit">("enter");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      toast.error("Please select an image file");
      return;
    }

    setLoading(true);
    try {
      const data = await processVehicle(file, state);
      toast.success(data.message, {
        description: data.charged_amount 
          ? `Duration: ${data.duration_hours?.toFixed(2)} hours | Amount: ৳${data.charged_amount?.toFixed(2)}`
          : undefined,
      });
    } catch (error) {
      toast.error("Failed to process vehicle");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Process Vehicle Entry/Exit
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium">Process Type</label>
              <Select value={state} onValueChange={(value: "enter" | "exit") => setState(value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select process type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="enter">Vehicle Entry</SelectItem>
                  <SelectItem value="exit">Vehicle Exit</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium">Vehicle Image</label>
              <FileUpload
                onFileSelect={(files) => setFile(files?.[0] || null)}
                selectedFiles={file ? [file] as unknown as FileList : null}
              />
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Processing..." : "Process Vehicle"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}