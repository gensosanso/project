"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Le titre doit contenir au moins 2 caractères",
  }),
  description: z.string().min(10, {
    message: "La description doit contenir au moins 10 caractères",
  }),
  questions: z.array(z.object({
    question: z.string().min(5, {
      message: "La question doit contenir au moins 5 caractères",
    }),
    required: z.boolean().default(false),
  })),
  requireCV: z.boolean().default(true),
  requireCoverLetter: z.boolean().default(false),
});

interface FormGeneratorProps {
  onFormUpdate: (formData: z.infer<typeof formSchema>, newFormUrl: string) => void;
  initialData?: z.infer<typeof formSchema>;
  onClose?: () => void;
}

export default function CampaignFormGenerator({ onFormUpdate, initialData, onClose }: FormGeneratorProps) {
  const [questions, setQuestions] = useState<{ question: string; required: boolean }[]>(
    initialData?.questions || []
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      title: "",
      description: "",
      questions: [],
      requireCV: true,
      requireCoverLetter: false,
    },
  });

  const addQuestion = () => {
    setQuestions([...questions, { question: "", required: false }]);
  };

  const removeQuestion = (index: number) => {
    const newQuestions = questions.filter((_, i) => i !== index);
    setQuestions(newQuestions);
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      // Generate a new unique form URL
      const newFormUrl = `${window.location.origin}/apply/${Math.random().toString(36).substring(2, 15)}`;
      
      // Pass the form data and new URL to the parent component
      onFormUpdate(values, newFormUrl);
      
      toast.success("Formulaire mis à jour avec succès!");
      
      if (onClose) {
        onClose();
      }
    } catch (error) {
      console.error(error);
      toast.error("Une erreur est survenue lors de la mise à jour du formulaire");
    }
  };

  return (
    <div className="space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Titre du formulaire</FormLabel>
                <FormControl>
                  <Input placeholder="Ex: Candidature - Développeur Full Stack" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Décrivez brièvement le poste et les attentes..." 
                    className="min-h-[100px]"
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Questions spécifiques</h3>
              <Button type="button" variant="outline" onClick={addQuestion}>
                Ajouter une question
              </Button>
            </div>

            {questions.map((_, index) => (
              <div key={index} className="space-y-4 p-4 border rounded-lg">
                <FormField
                  control={form.control}
                  name={`questions.${index}.question`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Question {index + 1}</FormLabel>
                      <FormControl>
                        <Input placeholder="Votre question..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`questions.${index}.required`}
                  render={({ field }) => (
                    <FormItem className="flex items-center space-x-2">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel className="font-normal">
                        Question obligatoire
                      </FormLabel>
                    </FormItem>
                  )}
                />

                <Button
                  type="button"
                  variant="ghost"
                  className="text-destructive"
                  onClick={() => removeQuestion(index)}
                >
                  Supprimer cette question
                </Button>
              </div>
            ))}
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Documents requis</h3>
            
            <FormField
              control={form.control}
              name="requireCV"
              render={({ field }) => (
                <FormItem className="flex items-center space-x-2">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel className="font-normal">
                    CV obligatoire
                  </FormLabel>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="requireCoverLetter"
              render={({ field }) => (
                <FormItem className="flex items-center space-x-2">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel className="font-normal">
                    Lettre de motivation obligatoire
                  </FormLabel>
                </FormItem>
              )}
            />
          </div>

          <div className="flex justify-end gap-2">
            {onClose && (
              <Button type="button" variant="outline" onClick={onClose}>
                Annuler
              </Button>
            )}
            <Button type="submit">
              Mettre à jour le formulaire
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}