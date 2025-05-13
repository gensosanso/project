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
import { toast } from "sonner";
import { Campaign } from "@/types";

interface ApplicationFormProps {
  campaign: Campaign;
}

export default function ApplicationForm({ campaign }: ApplicationFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Dynamically generate the form schema based on campaign form configuration
  const generateFormSchema = (campaign: Campaign) => {
    if (!campaign.form) return null;

    const schemaFields: Record<string, any> = {
      firstName: z.string().min(2, {
        message: "Le prénom doit contenir au moins 2 caractères",
      }),
      lastName: z.string().min(2, {
        message: "Le nom doit contenir au moins 2 caractères",
      }),
      email: z.string().email({
        message: "Adresse email invalide",
      }),
      phone: z.string().min(8, {
        message: "Numéro de téléphone invalide",
      }),
    };

    // Add custom questions to schema
    campaign.form.questions.forEach((q, index) => {
      schemaFields[`question_${index}`] = q.required
        ? z.string().min(1, { message: "Ce champ est requis" })
        : z.string().optional();
    });

    return z.object(schemaFields);
  };

  if (!campaign || !campaign.form) {
    return <div>Chargement...</div>;
  }

  const formSchema = generateFormSchema(campaign);
  if (!formSchema) return <div>Erreur de configuration du formulaire</div>;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      ...campaign.form.questions.reduce((acc, _, index) => ({
        ...acc,
        [`question_${index}`]: "",
      }), {}),
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    try {
      // Here, we'll send the form data
      console.log("Form data:", values);
      
      toast.success("Candidature soumise avec succès!");
      form.reset();
    } catch (error) {
      console.error(error);
      toast.error("Une erreur est survenue lors de l'envoi de votre candidature");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto pt-24 pb-16 px-4">
      <div className="max-w-3xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>{campaign.form.title}</CardTitle>
            <CardDescription>
              {campaign.form.description}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Prénom</FormLabel>
                        <FormControl>
                          <Input placeholder="Votre prénom" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nom</FormLabel>
                        <FormControl>
                          <Input placeholder="Votre nom" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="votre@email.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Téléphone</FormLabel>
                        <FormControl>
                          <Input placeholder="+237 6XX XXX XXX" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Custom questions */}
                {campaign.form.questions.map((question, index) => (
                  <FormField
                    key={index}
                    control={form.control}
                    name={`question_${index}`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          {question.question}
                          {question.required && <span className="text-destructive ml-1">*</span>}
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Votre réponse..."
                            className="min-h-[100px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ))}

                {/* Document upload section */}
                {(campaign.form.requireCV || campaign.form.requireCoverLetter) && (
                  <div className="border-2 border-dashed rounded-lg p-6">
                    <div className="text-center">
                      <h3 className="font-medium mb-2">Documents requis</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Format accepté : PDF, DOC, DOCX (max 5MB)
                      </p>
                      {campaign.form.requireCV && (
                        <div className="mb-4">
                          <FormLabel>CV</FormLabel>
                          <Input
                            type="file"
                            className="max-w-sm mx-auto"
                            accept=".pdf,.doc,.docx"
                          />
                        </div>
                      )}
                      {campaign.form.requireCoverLetter && (
                        <div>
                          <FormLabel>Lettre de motivation</FormLabel>
                          <Input
                            type="file"
                            className="max-w-sm mx-auto"
                            accept=".pdf,.doc,.docx"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                )}

                <Button
                  type="submit"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Envoi en cours..." : "Envoyer ma candidature"}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}