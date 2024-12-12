// "use client";

// import { useState } from "react";
// import { Upload, FolderUp } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { useToast } from "@/hooks/use-toast";
// import { Alert, AlertDescription } from "@/components/ui/alert";

// export default function RegisterPage() {
//   const [files, setFiles] = useState<FileList | null>(null);
//   const [loading, setLoading] = useState(false);
//   const [result, setResult] = useState<any>(null);
//   const { toast } = useToast();

//   const handleFileUpload = async () => {
//     if (!files?.length) {
//       toast({
//         title: "Error",
//         description: "Please select image files",
//         variant: "destructive",
//       });
//       return;
//     }

//     setLoading(true);
//     const formData = new FormData();
//     Array.from(files).forEach((file) => {
//       formData.append("files", file);
//     });

//     try {
//       const response = await fetch("http://localhost:8000/register-from-images/", {
//         method: "POST",
//         body: formData,
//       });
//       const data = await response.json();
//       setResult(data);
//       toast({
//         title: "Success",
//         description: "Vehicles registered successfully",
//       });
//     } catch (error) {
//       toast({
//         title: "Error",
//         description: "Failed to register vehicles",
//         variant: "destructive",
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleFolderRegistration = async () => {
//     setLoading(true);
//     try {
//       const response = await fetch("http://localhost:8000/register-from-folder/", {
//         method: "POST",
//       });
//       const data = await response.json();
//       toast({
//         title: "Success",
//         description: data.message,
//       });
//     } catch (error) {
//       toast({
//         title: "Error",
//         description: "Failed to register vehicles from folder",
//         variant: "destructive",
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <div className="max-w-4xl mx-auto space-y-6">
//         <Card>
//           <CardHeader>
//             <CardTitle className="text-2xl font-bold text-center">
//               Register Vehicles
//             </CardTitle>
//           </CardHeader>
//           <CardContent className="space-y-6">
//             <div className="grid md:grid-cols-2 gap-6">
//               <div className="space-y-4">
//                 <h3 className="text-lg font-semibold">Upload Images</h3>
//                 <div className="flex items-center justify-center w-full">
//                   <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer hover:bg-muted/50">
//                     <div className="flex flex-col items-center justify-center pt-5 pb-6">
//                       <Upload className="h-12 w-12 text-muted-foreground mb-2" />
//                       <p className="text-sm text-muted-foreground">
//                         Click to upload or drag and drop multiple images
//                       </p>
//                       {files && (
//                         <p className="mt-2 text-sm text-muted-foreground">
//                           {files.length} files selected
//                         </p>
//                       )}
//                     </div>
//                     <input
//                       type="file"
//                       className="hidden"
//                       multiple
//                       accept="image/*"
//                       onChange={(e) => setFiles(e.target.files)}
//                     />
//                   </label>
//                 </div>
//                 <Button
//                   onClick={handleFileUpload}
//                   className="w-full"
//                   disabled={loading}
//                 >
//                   {loading ? "Registering..." : "Register from Images"}
//                 </Button>
//               </div>

//               <div className="space-y-4">
//                 <h3 className="text-lg font-semibold">Register from Folder</h3>
//                 <div className="flex items-center justify-center w-full h-64 border-2 border-dashed rounded-lg">
//                   <div className="text-center">
//                     <FolderUp className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
//                     <p className="text-sm text-muted-foreground">
//                       Process images from the server folder
//                     </p>
//                   </div>
//                 </div>
//                 <Button
//                   onClick={handleFolderRegistration}
//                   className="w-full"
//                   disabled={loading}
//                 >
//                   {loading ? "Processing..." : "Register from Folder"}
//                 </Button>
//               </div>
//             </div>

//             {result && (
//               <div className="space-y-4">
//                 {result.registered_vehicles?.map((item: any, index: number) => (
//                   <Alert key={index}>
//                     <AlertDescription>{item.message}</AlertDescription>
//                   </Alert>
//                 ))}
//                 {result.errors?.map((error: string, index: number) => (
//                   <Alert key={index} variant="destructive">
//                     <AlertDescription>{error}</AlertDescription>
//                   </Alert>
//                 ))}
//               </div>
//             )}
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// }

// "use client";

// import { useState } from "react";
// import { FolderUp } from "lucide-react";
// import { toast } from "sonner";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Alert, AlertDescription } from "@/components/ui/alert";
// import { FileUpload } from "@/components/ui/file-upload";
// import { registerVehiclesFromImages, registerVehiclesFromFolder } from "@/lib/api";

// export default function RegisterPage() {
//   const [files, setFiles] = useState<FileList | null>(null);
//   const [loading, setLoading] = useState(false);
//   const [result, setResult] = useState<any>(null);

//   const handleFileUpload = async () => {
//     if (!files?.length) {
//       toast.error("Please select image files");
//       return;
//     }

//     setLoading(true);
//     try {
//       const data = await registerVehiclesFromImages(files);
//       console.log("data", data);
//       setResult(data);
//       toast.success("Vehicles registered successfully", {
//         description: `${data.registered_vehicles?.length || 0} vehicles registered`,
//       });
//     } catch (error) {
//       toast.error("Failed to register vehicles");
//     } finally {
//       setLoading(false);
//     }

//     console.log("HI");
//   };

//   const handleFolderRegistration = async () => {
//     setLoading(true);
//     try {
//       const data = await registerVehiclesFromFolder();
//       toast.success(data.message);
//     } catch (error) {
//       toast.error("Failed to register vehicles from folder");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <div className="max-w-4xl mx-auto space-y-6">
//         <Card>
//           <CardHeader>
//             <CardTitle className="text-2xl font-bold text-center">
//               Register Vehicles
//             </CardTitle>
//           </CardHeader>
//           <CardContent className="space-y-6">
//             <div className="grid md:grid-cols-2 gap-6">
//               <div className="space-y-4">
//                 <h3 className="text-lg font-semibold">Upload Images</h3>
//                 <FileUpload
//                   multiple
//                   onFileSelect={setFiles}
//                   selectedFiles={files}
//                 />
//                 <Button
//                   onClick={handleFileUpload}
//                   className="w-full"
//                   disabled={loading}
//                 >
//                   {loading ? "Registering..." : "Register from Images"}
//                 </Button>
//               </div>

//               <div className="space-y-4">
//                 <h3 className="text-lg font-semibold">Register from Folder</h3>
//                 <div className="flex items-center justify-center w-full h-64 border-2 border-dashed rounded-lg">
//                   <div className="text-center">
//                     <FolderUp className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
//                     <p className="text-sm text-muted-foreground">
//                       Process images from the server folder
//                     </p>
//                   </div>
//                 </div>
//                 <Button
//                   onClick={handleFolderRegistration}
//                   className="w-full"
//                   disabled={loading}
//                 >
//                   {loading ? "Processing..." : "Register from Folder"}
//                 </Button>
//               </div>
//             </div>

//             {result && (
//               <div className="space-y-4">
//                 {result.registered_vehicles?.map((item: any, index: number) => (
//                   <Alert key={index}>
//                     <AlertDescription>{item.message}</AlertDescription>
//                   </Alert>
//                 ))}
//                 {result.errors?.map((error: string, index: number) => (
//                   <Alert key={index} variant="destructive">
//                     <AlertDescription>{error}</AlertDescription>
//                   </Alert>
//                 ))}
//               </div>
//             )}
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// }

// "use client";

// import { useState, useEffect } from "react";
// import { FolderUp } from "lucide-react";
// import { toast } from "sonner";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Alert, AlertDescription } from "@/components/ui/alert";
// import { FileUpload } from "@/components/ui/file-upload";
// import { registerVehiclesFromImages, registerVehiclesFromFolder } from "@/lib/api";

// export default function RegisterPage() {
//   const [files, setFiles] = useState<FileList | null>(null);
//   const [loading, setLoading] = useState(false);
//   const [result, setResult] = useState<any>(null);

//   const handleFileUpload = async () => {
//     if (!files?.length) {
//       toast.error("Please select image files");
//       return;
//     }

//     setLoading(true);
//     try {
//       const data = await registerVehiclesFromImages(files);
//       console.log("API Response:", data);
//       setResult(data);
//       toast.success("Vehicles registered successfully", {
//         description: `${data.registered_vehicles?.length || 0} vehicles registered`,
//       });
//     } catch (error) {
//       toast.error("Failed to register vehicles");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleFolderRegistration = async () => {
//     setLoading(true);
//     try {
//       const data = await registerVehiclesFromFolder();
//       toast.success(data.message);
//     } catch (error) {
//       toast.error("Failed to register vehicles from folder");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Debugging to verify result structure
//   useEffect(() => {
//     if (result) {
//       console.log("Processed Result:", result);
//     }
//   }, [result]);

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <div className="max-w-4xl mx-auto space-y-6">
//         <Card>
//           <CardHeader>
//             <CardTitle className="text-2xl font-bold text-center">
//               Register Vehicles
//             </CardTitle>
//           </CardHeader>
//           <CardContent className="space-y-6">
//             <div className="grid md:grid-cols-2 gap-6">
//               <div className="space-y-4">
//                 <h3 className="text-lg font-semibold">Upload Images</h3>
//                 <FileUpload
//                   multiple
//                   onFileSelect={setFiles}
//                   selectedFiles={files}
//                 />
//                 <Button
//                   onClick={handleFileUpload}
//                   className="w-full"
//                   disabled={loading}
//                 >
//                   {loading ? "Registering..." : "Register from Images"}
//                 </Button>
//               </div>

//               <div className="space-y-4">
//                 <h3 className="text-lg font-semibold">Register from Folder</h3>
//                 <div className="flex items-center justify-center w-full h-64 border-2 border-dashed rounded-lg">
//                   <div className="text-center">
//                     <FolderUp className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
//                     <p className="text-sm text-muted-foreground">
//                       Process images from the server folder
//                     </p>
//                   </div>
//                 </div>
//                 <Button
//                   onClick={handleFolderRegistration}
//                   className="w-full"
//                   disabled={loading}
//                 >
//                   {loading ? "Processing..." : "Register from Folder"}
//                 </Button>
//               </div>
//             </div>

//             {result && (
//               <div className="space-y-4">
//                 {/* Display Registered Vehicles */}
//                 {result.registered_vehicles?.map(
//                   (item: { license_plate: string }, index: number) => (
//                     <Alert key={index}>
//                       <AlertDescription>
//                         Vehicle Registered: {item.license_plate}
//                       </AlertDescription>
//                     </Alert>
//                   )
//                 )}

//                 {/* Display Errors */}
//                 {result.errors?.map(
//                   (error: { file: string; error: string } | string, index: number) => (
//                     <Alert key={index} variant="destructive">
//                       <AlertDescription>
//                         {typeof error === "string"
//                           ? error
//                           : `File: ${error.file}, Error: ${error.error}`}
//                       </AlertDescription>
//                     </Alert>
//                   )
//                 )}
//               </div>
//             )}
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// }

"use client";

import { useState, useEffect } from "react";
import { FolderUp } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { FileUpload } from "@/components/ui/file-upload";
import { registerVehiclesFromImages, registerVehiclesFromFolder } from "@/lib/api";

export default function RegisterPage() {
  const [files, setFiles] = useState<FileList | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleFileUpload = async () => {
    if (!files?.length) {
      toast.error("Please select image files");
      return;
    }

    setLoading(true);
    try {
      const data = await registerVehiclesFromImages(files);
      console.log("API Response:", data);

      // Check if result has expected structure
      if (data?.registered_vehicles?.length || data?.errors?.length) {
        // setResult(data);

        // toast.success("Upload complete", {
        //   description: `${data.registered_vehicles?.length || 0} vehicles registered`,
        // });
        for (let i = 0; i < data.registered_vehicles.length; i++) {
          toast.success(data.registered_vehicles[i].message);
        }
        for (let i = 0; i < data.errors.length; i++) {
          toast.error(data.errors[i].error);
        }
      } else {
        toast.error("No vehicles registered. Check the image files.");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      toast.error("Failed to register vehicles");
    } finally {
      setLoading(false);
    }
  };

  const handleFolderRegistration = async () => {
    setLoading(true);
    try {
      const data = await registerVehiclesFromFolder();
      if (data?.message) {
        toast.success(data.message);
      } else {
        toast.error("Failed to process images from folder.");
      }
    } catch (error) {
      console.error("Error during folder registration:", error);
      toast.error("Failed to register vehicles from folder");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (result) {
      console.log("Processed Result:", result);
    }
  }, [result]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">
              Register Vehicles
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Image Upload Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Upload Images</h3>
                <FileUpload
                  multiple
                  onFileSelect={setFiles}
                  selectedFiles={files}
                />
                <Button
                  onClick={handleFileUpload}
                  className="w-full"
                  disabled={loading}
                >
                  {loading ? "Registering..." : "Register from Images"}
                </Button>
              </div>

              {/* Folder Registration Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Register from Folder</h3>
                <div className="flex items-center justify-center w-full h-64 border-2 border-dashed rounded-lg">
                  <div className="text-center">
                    <FolderUp className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">
                      Process images from the server folder
                    </p>
                  </div>
                </div>
                <Button
                  onClick={handleFolderRegistration}
                  className="w-full"
                  disabled={loading}
                >
                  {loading ? "Processing..." : "Register from Folder"}
                </Button>
              </div>
            </div>

            {/* Result Section */}
            {result && (
              <div className="space-y-4">
                {/* Registered Vehicles */}
                {result.registered_vehicles?.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="font-bold">Successfully Registered Vehicles:</h4>
                    {result.registered_vehicles.map(
                      (item: { license_plate: string }, index: number) => (
                        <Alert key={index}>
                          <AlertDescription>
                            Vehicle Registered: {item.license_plate}
                          </AlertDescription>
                        </Alert>
                      )
                    )}
                  </div>
                )}

                {/* Errors */}
                {result.errors?.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="font-bold text-red-500">Errors:</h4>
                    {result.errors.map(
                      (error: { file: string; error: string } | string, index: number) => (
                        <Alert key={index} variant="destructive">
                          <AlertDescription>
                            {typeof error === "string"
                              ? error
                              : `File: ${error.file}, Error: ${error.error}`}
                          </AlertDescription>
                        </Alert>
                      )
                    )}
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
