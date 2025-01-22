"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "~/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Textarea } from "~/components/ui/textarea";
import Header from "~/components/Header";
import { createTeams } from "~/server/actions";

// Define schema for validation
const formSchema = z.object({
  names: z.string().min(1, "Enter at least one team name"),
});

export default function UploadPage() {
  const [loading, setLoading] = useState(false);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { names: "" },
  });

  async function onSubmit(values: { names: string }) {
    setLoading(true);
    const filtered_name = values.names.replace("Team Name", "");
    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ names: filtered_name }),
      });

      if (!response.ok) throw new Error("Failed to add teams");

      const data = (await response.json()) as { message: string };
      alert(data.message);
      form.reset();
    } catch (error) {
      if (error instanceof Error) {
        alert("Error: " + error.message);
      } else {
        alert("An unknown error occurred");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex flex-col gap-8">
      <Header />
      <div className="flex flex-col gap-4 px-4">
        <h1 className="self-start text-2xl font-semibold">Upload Teams</h1>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex w-[450px] flex-col gap-4 self-center"
          >
            <FormField
              control={form.control}
              name="names"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Team Names</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter team names, one per line"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={loading}>
              {loading ? "Adding..." : "Upload Teams"}
            </Button>
          </form>
        </Form>
      </div>
    </main>
  );
}
