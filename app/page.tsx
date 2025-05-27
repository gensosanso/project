import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Users, FileText, BarChart3, Mail } from "lucide-react";

export default function Home() {
  const features = [
    {
      title: "Gestion des Candidats",
      description: "Inscrivez et gérez les candidats durant tout le processus de recrutement.",
      icon: <Users className="h-10 w-10 text-primary" />,
    },
    {
      title: "Tri Automatique",
      description: "Filtrez automatiquement les CV selon vos critères personnalisés.",
      icon: <FileText className="h-10 w-10 text-primary" />,
    },
    {
      title: "Communications",
      description: "Envoyez des e-mails automatiques via des modèles prédéfinis.",
      icon: <Mail className="h-10 w-10 text-primary" />,
    },
    {
      title: "Rapports & Analyses",
      description: "Analysez les données et générez des rapports détaillés.",
      icon: <BarChart3 className="h-10 w-10 text-primary" />,
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero section */}
      <section className="pt-24 pb-12 md:pt-32 md:pb-24">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                Simplifiez votre processus de recrutement
              </h1>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                Une solution complète pour digitaliser et optimiser chaque étape de votre recrutement
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Link href="/auth/register">
                <Button size="lg" className="px-8">
                  Commencer
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              {/* <Link href="/candidate/apply">
                <Button size="lg" variant="outline" className="px-8">
                  Postuler maintenant
                </Button>
              </Link> */}
            </div>
          </div>
        </div>
      </section>

      {/* Features section */}
      <section className="py-12 md:py-24 bg-muted/50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                Fonctionnalités principales
              </h2>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-lg dark:text-gray-400">
                Découvrez comment notre plateforme peut vous aider à gérer efficacement vos recrutements
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 mt-8">
            {features.map((feature, index) => (
              <Card key={index} className="transition-all hover:shadow-md">
                <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                  <div className="p-2 bg-primary/10 rounded-full">{feature.icon}</div>
                  <h3 className="text-xl font-bold">{feature.title}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to action */}
      <section className="py-12 md:py-24 bg-primary text-primary-foreground">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                Prêt à transformer votre processus de recrutement?
              </h2>
              <p className="text-primary-foreground/80 md:text-lg">
                Rejoignez les entreprises qui ont déjà optimisé leur recrutement grâce à notre solution digitale complète.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row justify-center lg:justify-end">
              <Link href="/auth/register">
                <Button size="lg" variant="secondary" className="px-8">
                  Créer un compte
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="border-primary-foreground/20 text-primary hover:bg-primary-foreground/10 px-8">
                  Nous contacter
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}