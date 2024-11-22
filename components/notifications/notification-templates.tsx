"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";

const templateSchema = z.object({
  name: z.string().min(1),
  type: z.enum([
    "PAYMENT_REMINDER",
    "MAINTENANCE_REMINDER",
    "LEASE_EXPIRATION",
    "WELCOME",
    "CUSTOM"
  ]),
  subject: z.string().min(1),
  template: z.string().min(1),
});

type TemplateFormValues = z.infer<typeof templateSchema>;

interface NotificationTemplatesProps {
  onSuccess?: () => void;
}

export function NotificationTemplates({ onSuccess }: NotificationTemplatesProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<TemplateFormValues>({
    resolver: zodResolver(templateSchema),
  });

  const onSubmit = async (values: TemplateFormValues) => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/notification-templates", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!response.ok) throw new Error();

      toast({
        title: "Success",
        description: "Template created successfully",
      });

      form.reset();
      onSuccess?.();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to create template",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Template Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter template name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Template Type</FormLabel>
              <Select onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select template type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="PAYMENT_REMINDER">Payment Reminder</SelectItem>
                  <SelectItem value="MAINTENANCE_REMINDER">Maintenance Reminder</SelectItem>
                  <SelectItem value="LEASE_EXPIRATION">Lease Expiration</SelectItem>
                  <SelectItem value="WELCOME">Welcome Message</SelectItem>
                  <SelectItem value="CUSTOM">Custom Template</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="subject"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Subject</FormLabel>
              <FormControl>
                <Input placeholder="Enter subject" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="template"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Template Content</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter template content..."
                  className="min-h-[200px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Creating..." : "Create Template"}
        </Button>
      </form>
    </Form>
  );
}