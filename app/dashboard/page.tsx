// "use client";

// import { useState, useEffect } from "react";
// import { Trash2 } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { useToast } from "@/hooks/use-toast";
// import {
//   AlertDialog,
//   AlertDialogAction,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
// } from "@/components/ui/alert-dialog";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { format } from "date-fns";

// export default function DashboardPage() {
//   const [registeredVehicles, setRegisteredVehicles] = useState<any[]>([]);
//   const [vehicleLogs, setVehicleLogs] = useState<any[]>([]);
//   const [deleteId, setDeleteId] = useState<number | null>(null);
//   const { toast } = useToast();

//   const fetchRegisteredVehicles = async () => {
//     try {
//       const response = await fetch("http://localhost:8000/registered-vehicles/");
//       const data = await response.json();
//       setRegisteredVehicles(data);
//     } catch (error) {
//       toast({
//         title: "Error",
//         description: "Failed to fetch registered vehicles",
//         variant: "destructive",
//       });
//     }
//   };

//   const fetchVehicleLogs = async () => {
//     try {
//       const response = await fetch("http://localhost:8000/vehicles_log/", {
//         headers: {
//           'content-type': 'application/json',
//         },
//       });
//       const data = await response.json();
//       setVehicleLogs(data);
//     } catch (error) {
//       toast({
//         title: "Error",
//         description: "Failed to fetch vehicle logs",
//         variant: "destructive",
//       });
//     }
//   };

//   useEffect(() => {
//     fetchRegisteredVehicles();
//     fetchVehicleLogs();
//   }, []);

//   const handleDelete = async () => {
//     if (!deleteId) return;

//     try {
//       const response = await fetch(
//         `http://localhost:8000/registered-vehicles/${deleteId}`,
//         {
//           method: "DELETE",
//         }
//       );
//       const data = await response.json();
//       toast({
//         title: "Success",
//         description: data.message,
//       });
//       fetchRegisteredVehicles();
//     } catch (error) {
//       toast({
//         title: "Error",
//         description: "Failed to delete vehicle",
//         variant: "destructive",
//       });
//     }
//     setDeleteId(null);
//   };

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-3xl font-bold mb-8 text-center">
//         Parking Management Dashboard
//       </h1>

//       <Tabs defaultValue="logs" className="space-y-6">
//         <TabsList className="grid w-full grid-cols-2">
//           <TabsTrigger value="logs">Vehicle Logs</TabsTrigger>
//           <TabsTrigger value="registered">Registered Vehicles</TabsTrigger>
//         </TabsList>

//         <TabsContent value="logs">
//           <div className="rounded-lg border bg-card">
//             <Table>
//               <TableHeader>
//                 <TableRow>
//                   <TableHead>License Plate</TableHead>
//                   <TableHead>Entry Time</TableHead>
//                   <TableHead>Exit Time</TableHead>
//                   <TableHead>Duration (Hours)</TableHead>
//                   <TableHead>Amount (৳)</TableHead>
//                 </TableRow>
//               </TableHeader>
//               <TableBody>
//                 {vehicleLogs.map((log) => {
//                   const entryTime = new Date(log.entry_time);
//                   const exitTime = log.exit_time ? new Date(log.exit_time) : null;
//                   const duration =
//                     exitTime &&
//                     (exitTime.getTime() - entryTime.getTime()) / (1000 * 60 * 60);

//                   return (
//                     <TableRow key={log.id}>
//                       <TableCell>{log.license_plate}</TableCell>
//                       <TableCell>
//                         {format(entryTime, "MMM d, yyyy HH:mm:ss")}
//                       </TableCell>
//                       <TableCell>
//                         {exitTime
//                           ? format(exitTime, "MMM d, yyyy HH:mm:ss")
//                           : "Active"}
//                       </TableCell>
//                       <TableCell>
//                         {duration ? duration.toFixed(2) : "N/A"}
//                       </TableCell>
//                       <TableCell>
//                         {log.charged_amount
//                           ? log.charged_amount.toFixed(2)
//                           : "N/A"}
//                       </TableCell>
//                     </TableRow>
//                   );
//                 })}
//               </TableBody>
//             </Table>
//           </div>
//         </TabsContent>

//         <TabsContent value="registered">
//           <div className="rounded-lg border bg-card">
//             <Table>
//               <TableHeader>
//                 <TableRow>
//                   <TableHead>License Plate</TableHead>
//                   <TableHead className="w-[100px]">Actions</TableHead>
//                 </TableRow>
//               </TableHeader>
//               <TableBody>
//                 {registeredVehicles.map((vehicle) => (
//                   <TableRow key={vehicle.id}>
//                     <TableCell>{vehicle.license_plate}</TableCell>
//                     <TableCell>
//                       <Button
//                         variant="destructive"
//                         size="sm"
//                         onClick={() => setDeleteId(vehicle.id)}
//                       >
//                         <Trash2 className="h-4 w-4" />
//                       </Button>
//                     </TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </div>
//         </TabsContent>
//       </Tabs>

//       <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
//         <AlertDialogContent>
//           <AlertDialogHeader>
//             <AlertDialogTitle>Are you sure?</AlertDialogTitle>
//             <AlertDialogDescription>
//               This action cannot be undone. This will permanently delete the
//               vehicle from the registered vehicles list.
//             </AlertDialogDescription>
//           </AlertDialogHeader>
//           <AlertDialogFooter>
//             <AlertDialogCancel>Cancel</AlertDialogCancel>
//             <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
//           </AlertDialogFooter>
//         </AlertDialogContent>
//       </AlertDialog>
//     </div>
//   );
// }

"use client";

import { useState, useEffect } from "react";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { format } from "date-fns";
import { 
  fetchRegisteredVehicles, 
  fetchVehicleLogs, 
  deleteVehicle 
} from "@/lib/api";

export default function DashboardPage() {
  const [registeredVehicles, setRegisteredVehicles] = useState<any[]>([]);
  const [vehicleLogs, setVehicleLogs] = useState<any[]>([]);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const loadData = async () => {
    try {
      const [vehicles, logs] = await Promise.all([
        fetchRegisteredVehicles(),
        fetchVehicleLogs(),
      ]);
      setRegisteredVehicles(vehicles);
      setVehicleLogs(logs);
    } catch (error) {
      toast.error("Failed to fetch data");
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleDelete = async () => {
    if (!deleteId) return;

    try {
      const data = await deleteVehicle(deleteId);
      toast.success(data.message);
      loadData();
    } catch (error) {
      toast.error("Failed to delete vehicle");
    }
    setDeleteId(null);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Parking Management Dashboard
      </h1>

      <Tabs defaultValue="logs" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="logs">Vehicle Logs</TabsTrigger>
          <TabsTrigger value="registered">Registered Vehicles</TabsTrigger>
        </TabsList>

        <TabsContent value="logs">
          <div className="rounded-lg border bg-card">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>License Plate</TableHead>
                  <TableHead>Entry Time</TableHead>
                  <TableHead>Exit Time</TableHead>
                  <TableHead>Duration (Hours)</TableHead>
                  <TableHead>Amount (৳)</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {vehicleLogs.map((log) => {
                  const entryTime = new Date(log.entry_time);
                  const exitTime = log.exit_time ? new Date(log.exit_time) : null;
                  const duration =
                    exitTime &&
                    (exitTime.getTime() - entryTime.getTime()) / (1000 * 60 * 60);

                  return (
                    <TableRow key={log.id}>
                      <TableCell>{log.license_plate}</TableCell>
                      <TableCell>
                        {format(entryTime, "MMM d, yyyy HH:mm:ss")}
                      </TableCell>
                      <TableCell>
                        {exitTime
                          ? format(exitTime, "MMM d, yyyy HH:mm:ss")
                          : "Active"}
                      </TableCell>
                      <TableCell>
                        {duration ? duration.toFixed(2) : "N/A"}
                      </TableCell>
                      <TableCell>
                        {log.charged_amount
                          ? log.charged_amount.toFixed(2)
                          : "N/A"}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        <TabsContent value="registered">
          <div className="rounded-lg border bg-card">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>License Plate</TableHead>
                  <TableHead className="w-[100px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {registeredVehicles.map((vehicle) => (
                  <TableRow key={vehicle.id}>
                    <TableCell>{vehicle.license_plate}</TableCell>
                    <TableCell>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => setDeleteId(vehicle.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
      </Tabs>

      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              vehicle from the registered vehicles list.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}