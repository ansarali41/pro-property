"use client";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, AlertTriangle, CheckCircle } from "lucide-react";

const mockWorkOrders = [
  {
    id: "1",
    title: "Fix Leaking Faucet",
    property: "123 Main St, Apt 4B",
    status: "IN_PROGRESS",
    priority: "MEDIUM",
    createdAt: "2024-03-15",
  },
  {
    id: "2",
    title: "AC Maintenance",
    property: "456 Oak Ave",
    status: "PENDING",
    priority: "HIGH",
    createdAt: "2024-03-14",
  },
  {
    id: "3",
    title: "Replace Light Fixtures",
    property: "789 Pine St",
    status: "COMPLETED",
    priority: "LOW",
    createdAt: "2024-03-13",
  },
];

const statusStyles = {
  PENDING: "bg-yellow-100 text-yellow-800",
  IN_PROGRESS: "bg-blue-100 text-blue-800",
  COMPLETED: "bg-green-100 text-green-800",
};

const priorityIcons = {
  LOW: null,
  MEDIUM: <Clock className="h-4 w-4" />,
  HIGH: <AlertTriangle className="h-4 w-4 text-red-500" />,
};

export function WorkOrders() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Title</TableHead>
          <TableHead>Property</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Priority</TableHead>
          <TableHead>Created</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {mockWorkOrders.map((order) => (
          <TableRow key={order.id}>
            <TableCell className="font-medium">{order.title}</TableCell>
            <TableCell>{order.property}</TableCell>
            <TableCell>
              <Badge variant="secondary" className={statusStyles[order.status]}>
                {order.status}
              </Badge>
            </TableCell>
            <TableCell className="flex items-center gap-2">
              {priorityIcons[order.priority]}
              {order.priority}
            </TableCell>
            <TableCell>{order.createdAt}</TableCell>
            <TableCell>
              <Button variant="ghost" size="sm">
                View Details
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}