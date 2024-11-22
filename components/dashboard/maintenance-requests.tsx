"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Clock, CheckCircle } from "lucide-react";

const mockRequests = [
  {
    id: "1",
    title: "Leaking Faucet",
    description: "Kitchen sink faucet is dripping constantly",
    status: "PENDING",
    priority: "MEDIUM",
    submittedAt: "2024-03-15",
    property: "123 Main St, Apt 4B",
  },
  {
    id: "2",
    title: "AC Not Working",
    description: "Air conditioning unit making loud noise and not cooling",
    status: "IN_PROGRESS",
    priority: "HIGH",
    submittedAt: "2024-03-14",
    property: "456 Oak Ave",
  },
  {
    id: "3",
    title: "Light Fixture Replacement",
    description: "Living room ceiling light needs replacement",
    status: "COMPLETED",
    priority: "LOW",
    submittedAt: "2024-03-13",
    property: "789 Pine St",
  },
];

const statusStyles = {
  PENDING: "bg-yellow-100 text-yellow-800",
  IN_PROGRESS: "bg-blue-100 text-blue-800",
  COMPLETED: "bg-green-100 text-green-800",
};

const priorityIcons = {
  LOW: <Clock className="h-4 w-4" />,
  MEDIUM: <Clock className="h-4 w-4 text-yellow-500" />,
  HIGH: <AlertTriangle className="h-4 w-4 text-red-500" />,
};

export function MaintenanceRequests() {
  return (
    <div className="space-y-4">
      {mockRequests.map((request) => (
        <Card key={request.id}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <h3 className="font-medium">{request.title}</h3>
                <Badge variant="secondary" className={statusStyles[request.status]}>
                  {request.status}
                </Badge>
              </div>
              <div className="flex items-center space-x-2">
                {priorityIcons[request.priority]}
                <span className="text-sm">{request.priority}</span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mb-2">{request.description}</p>
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>{request.property}</span>
              <span>Submitted: {request.submittedAt}</span>
            </div>
            <div className="mt-4 flex justify-end space-x-2">
              <Button variant="outline" size="sm">View Details</Button>
              {request.status !== "COMPLETED" && (
                <Button size="sm">Update Status</Button>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}