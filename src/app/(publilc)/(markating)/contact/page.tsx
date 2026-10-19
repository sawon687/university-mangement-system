
"use client";

import { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle2,
  Clock,
  MessageSquare,
  Sparkles,
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // TODO: Submit formData to your backend API.
    // This demo only displays a success state.
    setSubmitted(true);
  };

  const updateField = (
    field: keyof typeof formData,
    value: string,
  ) => {
    setFormData((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  const contactItems = [
    {
      title: "Email us",
      value: "support@unisphere.edu",
      description: "Send us your questions anytime.",
      icon: Mail,
      href: "mailto:support@unisphere.edu",
    },
    {
      title: "Call us",
      value: "+880 1234 567890",
      description: "Talk directly with our team.",
      icon: Phone,
      href: "tel:+8801234567890",
    },
    {
      title: "Office location",
      value: "Gulshan Avenue, Dhaka",
      description: "Bangladesh",
      icon: MapPin,
      href: "https://maps.google.com/?q=Gulshan+Avenue+Dhaka",
    },
  ];

  return (
    <main className="min-h-screen overflow-hidden bg-background text-foreground">
      {/* Hero */}
      <section className="relative isolate border-b border-border/60">
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute -top-32 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-orange-500/10 blur-3xl sm:h-96 sm:w-96" />
          <div className="absolute right-0 top-20 h-52 w-52 rounded-full bg-primary/5 blur-3xl" />
        </div>

        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24"
        >
          <div className="mx-auto max-w-3xl text-center">
            <Badge
              variant="outline"
              className="mb-5 gap-2 rounded-full border-orange-500/30 bg-orange-500/5 px-4 py-1.5 text-orange-600 dark:text-orange-400"
            >
              <Sparkles className="h-3.5 w-3.5" />
              Contact Us
            </Badge>

            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              We&apos;d love to hear
              <span className="mt-2 block text-orange-600 dark:text-orange-400">
                from you.
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
              Have questions about UniSphere or need a custom institutional
              demo? Our team is here to help you.
            </p>
          </div>
        </motion.div>
      </section>

      {/* Contact Content */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-5 lg:gap-8">
          {/* Contact Information */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2"
          >
            <Card className="h-full rounded-2xl border-border/70 bg-card shadow-sm">
              <CardHeader className="p-6 sm:p-8">
                <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-xl bg-orange-500/10 text-orange-600 dark:text-orange-400">
                  <MessageSquare className="h-6 w-6" />
                </div>

                <CardTitle className="text-2xl">
                  Get in touch
                </CardTitle>

                <CardDescription className="text-sm leading-6">
                  Choose your preferred way to contact our team. We&apos;ll
                  be happy to help.
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-6 px-6 pb-6 sm:px-8 sm:pb-8">
                {contactItems.map((item, index) => {
                  const Icon = item.icon;

                  return (
                    <motion.a
                      key={item.title}
                      href={item.href}
                      target={
                        item.title === "Office location"
                          ? "_blank"
                          : undefined
                      }
                      rel={
                        item.title === "Office location"
                          ? "noreferrer"
                          : undefined
                      }
                      initial={
                        shouldReduceMotion
                          ? false
                          : { opacity: 0, y: 12 }
                      }
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.35,
                        delay: shouldReduceMotion ? 0 : index * 0.08,
                      }}
                      className="group flex items-start gap-4 rounded-xl border border-transparent p-3 transition-colors hover:border-border hover:bg-muted/50"
                    >
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange-500/10 text-orange-600 transition-colors group-hover:bg-orange-500 group-hover:text-white dark:text-orange-400 dark:group-hover:text-white">
                        <Icon className="h-5 w-5" />
                      </div>

                      <div className="min-w-0">
                        <p className="text-sm font-semibold">
                          {item.title}
                        </p>

                        <p className="mt-1 break-words text-sm font-medium text-muted-foreground transition-colors group-hover:text-orange-600 dark:group-hover:text-orange-400">
                          {item.value}
                        </p>

                        <p className="mt-1 text-xs leading-5 text-muted-foreground">
                          {item.description}
                        </p>
                      </div>
                    </motion.a>
                  );
                })}

                <div className="rounded-xl border border-border/70 bg-muted/40 p-4">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                    <p className="text-sm font-semibold">
                      Support hours
                    </p>
                  </div>

                  <p className="mt-2 text-sm text-muted-foreground">
                    Sunday – Thursday
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    9:00 AM – 6:00 PM
                  </p>
                  <p className="mt-2 text-xs text-muted-foreground">
                    Bangladesh time (BST)
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-3"
          >
            <Card className="h-full rounded-2xl border-border/70 bg-card shadow-sm">
              {submitted ? (
                <CardContent className="flex min-h-[480px] flex-col items-center justify-center px-6 py-12 text-center">
                  <motion.div
                    initial={
                      shouldReduceMotion
                        ? false
                        : { scale: 0.7, opacity: 0 }
                    }
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.35 }}
                    className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                  >
                    <CheckCircle2 className="h-9 w-9" />
                  </motion.div>

                  <Badge
                    variant="outline"
                    className="mt-5 border-emerald-500/30 bg-emerald-500/5 text-emerald-600 dark:text-emerald-400"
                  >
                    Success
                  </Badge>

                  <h2 className="mt-4 text-2xl font-bold tracking-tight">
                    Thank you for reaching out!
                  </h2>

                  <p className="mt-3 max-w-md text-sm leading-6 text-muted-foreground">
                    Your form passed the client-side checks. Connect the form
                    to your backend to deliver the message to the UniSphere
                    support team.
                  </p>

                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setSubmitted(false)}
                    className="mt-6 rounded-xl"
                  >
                    Send another message
                  </Button>
                </CardContent>
              ) : (
                <>
                  <CardHeader className="p-6 pb-0 sm:p-8 sm:pb-0">
                    <CardTitle className="text-2xl">
                      Send us a message
                    </CardTitle>

                    <CardDescription className="leading-6">
                      Fill in the details below and tell us how we can help.
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="p-6 sm:p-8">
                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="contact-name">
                            Full name
                          </Label>

                          <Input
                            id="contact-name"
                            name="name"
                            autoComplete="name"
                            required
                            minLength={2}
                            maxLength={100}
                            value={formData.name}
                            onChange={(e) =>
                              updateField("name", e.target.value)
                            }
                            placeholder="Your full name"
                            className="h-11 rounded-xl bg-background"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="contact-email">
                            Email address
                          </Label>

                          <Input
                            id="contact-email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            required
                            maxLength={254}
                            value={formData.email}
                            onChange={(e) =>
                              updateField("email", e.target.value)
                            }
                            placeholder="you@university.edu"
                            className="h-11 rounded-xl bg-background"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="contact-subject">
                          Subject
                        </Label>

                        <Input
                          id="contact-subject"
                          name="subject"
                          required
                          minLength={3}
                          maxLength={150}
                          value={formData.subject}
                          onChange={(e) =>
                            updateField("subject", e.target.value)
                          }
                          placeholder="How can we help you?"
                          className="h-11 rounded-xl bg-background"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="contact-message">
                          Message
                        </Label>

                        <Textarea
                          id="contact-message"
                          name="message"
                          required
                          minLength={10}
                          maxLength={5000}
                          rows={6}
                          value={formData.message}
                          onChange={(e) =>
                            updateField("message", e.target.value)
                          }
                          placeholder="Tell us a little more about your question..."
                          className="min-h-36 resize-y rounded-xl bg-background leading-6"
                        />

                        <p className="text-right text-xs text-muted-foreground">
                          {formData.message.length}/5000 characters
                        </p>
                      </div>

                      <Button
                        type="submit"
                        className="group h-11 w-full gap-2 rounded-xl bg-orange-600 font-semibold text-white shadow-sm transition-all hover:bg-orange-700 sm:w-auto dark:bg-orange-500 dark:hover:bg-orange-600"
                      >
                        <Send className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        Send message
                      </Button>

                      <p className="text-xs leading-5 text-muted-foreground">
                        Please don&apos;t include passwords or other
                        sensitive account information in your message.
                      </p>
                    </form>
                  </CardContent>
                </>
              )}
            </Card>
          </motion.div>
        </div>
      </section>
    </main>
  );
}