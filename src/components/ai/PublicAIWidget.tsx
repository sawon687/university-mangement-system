"use client";

import { useState } from "react";
import {
  Bot,
  Send,
  Sparkles,
  GraduationCap,
  BookOpen,
  ClipboardCheck,
  CreditCard,
  LoaderCircle,
  MessageCircle,
  ArrowUpRight,
  Trash2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { useAiChatBox } from "@/hooks/ai.hook";

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
}

interface AIChatResponse {
  success: boolean;
  message: string;
  data: {
    answer: string;
  };
}

const quickQuestions = [
  {
    label: "Admission process",
    message: "How can I apply for admission to UniSphere?",
    icon: GraduationCap,
  },
  {
    label: "Available programs",
    message: "What programs and departments are available?",
    icon: BookOpen,
  },
  {
    label: "Eligibility & documents",
    message:
      "What are the admission requirements and required documents?",
    icon: ClipboardCheck,
  },
  {
    label: "Tuition fees",
    message:
      "How can I learn about tuition fees and payment methods?",
    icon: CreditCard,
  },
];

export default function PublicAIWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [error, setError] = useState("");

  const { mutate: sendChatMessage, isPending } = useAiChatBox();

  const sendMessage = (value?: string) => {
    const message = (value ?? input).trim();

    if (!message || isPending) return;

    if (message.length > 1000) {
      setError("Your question cannot exceed 1000 characters.");
      return;
    }

    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content: message,
    };

    setMessages((previous) => [...previous, userMessage]);
    setInput("");
    setError("");

    sendChatMessage(
      { message },
      {
        onSuccess: (response: AIChatResponse) => {
          const answer = response?.data?.answer;

          if (!answer) {
            setError("The AI returned an empty response. Please try again.");
            return;
          }

          const assistantMessage: ChatMessage = {
            id: crypto.randomUUID(),
            role: "assistant",
            content: answer,
          };

          setMessages((previous) => [
            ...previous,
            assistantMessage,
          ]);
        },
        onError: (err: Error) => {
          setError(
            err.message ||
              "Unable to connect to UniSphere AI. Please try again.",
          );
        },
      },
    );
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    sendMessage();
  };

  const clearChat = () => {
    if (isPending) return;

    setMessages([]);
    setInput("");
    setError("");
  };

  return (
    <>
      {/* Floating AI Button */}
      <Button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open UniSphere AI Assistant"
        className="fixed bottom-5 right-5 z-50 h-14 rounded-full bg-orange-600 px-4 text-white shadow-xl shadow-orange-600/20 transition-all duration-300 hover:-translate-y-1 hover:bg-orange-700 sm:px-5"
      >
        <span className="relative mr-1 flex size-8 items-center justify-center rounded-full bg-white/15">
          <MessageCircle className="size-5" />
          <span className="absolute -right-0.5 -top-0.5 size-2.5 rounded-full border-2 border-orange-600 bg-emerald-400" />
        </span>

        <span className="font-semibold">Ask UniSphere AI</span>
        <Sparkles className="ml-1 size-4" />
      </Button>

      {/* Responsive Chat Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="fixed bottom-0 right-0 left-auto top-auto flex h-[min(720px,88dvh)] w-full max-w-[440px] translate-x-0 translate-y-0 flex-col gap-0 overflow-hidden rounded-t-2xl border-border bg-background p-0 shadow-2xl sm:bottom-5 sm:right-5 sm:h-[min(680px,85dvh)] sm:rounded-2xl">
          {/* Header */}
          <DialogHeader className="shrink-0 border-b bg-orange-600 p-4 text-left text-white">
            <div className="flex items-center gap-3 pr-7">
              <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-white/15">
                <Bot className="size-6" />
              </div>

              <div className="min-w-0 flex-1">
                <DialogTitle className="text-base font-bold text-white">
                  UniSphere AI Assistant
                </DialogTitle>

                <DialogDescription className="mt-1 text-xs leading-relaxed text-white/80">
                  Your guide to admissions and university life
                </DialogDescription>
              </div>

              <span
                className="size-2.5 shrink-0 rounded-full bg-emerald-300"
                aria-label="Assistant available"
              />
            </div>
          </DialogHeader>

          {/* Chat Messages */}
          <div
            className="flex-1 space-y-4 overflow-y-auto p-4"
            aria-live="polite"
            aria-relevant="additions text"
          >
            {messages.length === 0 ? (
              <div className="flex min-h-full flex-col justify-center gap-5">
                <div className="flex flex-col items-center text-center">
                  <div className="mb-4 flex size-16 items-center justify-center rounded-2xl bg-orange-500/10 text-orange-600">
                    <GraduationCap className="size-9" />
                  </div>

                  <h3 className="text-xl font-bold tracking-tight">
                    Welcome to UniSphere!
                  </h3>

                  <p className="mt-2 max-w-xs text-sm leading-6 text-muted-foreground">
                    Ask me about university programs, admissions,
                    requirements, fees, and other university information.
                  </p>
                </div>

                <div className="space-y-2">
                  <p className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    <Sparkles className="size-3.5 text-orange-600" />
                    Suggested questions
                  </p>

                  {quickQuestions.map((question) => {
                    const Icon = question.icon;

                    return (
                      <button
                        key={question.label}
                        type="button"
                        disabled={isPending}
                        onClick={() => sendMessage(question.message)}
                        className="group flex w-full items-center gap-3 rounded-xl border border-border bg-card p-3 text-left transition-colors hover:border-orange-500/40 hover:bg-orange-500/5 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-orange-500/10 text-orange-600">
                          <Icon className="size-[18px]" />
                        </span>

                        <span className="min-w-0 flex-1 text-sm font-medium">
                          {question.label}
                        </span>

                        <ArrowUpRight className="size-4 shrink-0 text-muted-foreground transition-colors group-hover:text-orange-600" />
                      </button>
                    );
                  })}
                </div>
              </div>
            ) : (
              <>
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex items-start gap-2.5 ${
                      message.role === "user"
                        ? "justify-end"
                        : "justify-start"
                    }`}
                  >
                    {message.role === "assistant" && (
                      <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-orange-500/10 text-orange-600">
                        <Bot className="size-[18px]" />
                      </div>
                    )}

                    <div
                      className={`max-w-[82%] whitespace-pre-wrap break-words rounded-2xl px-3.5 py-3 text-sm leading-6 ${
                        message.role === "user"
                          ? "rounded-tr-sm bg-orange-600 text-white"
                          : "rounded-tl-sm bg-muted text-foreground"
                      }`}
                    >
                      {message.content}
                    </div>
                  </div>
                ))}

                {isPending && (
                  <div className="flex items-center gap-2.5">
                    <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-orange-500/10 text-orange-600">
                      <Bot className="size-[18px]" />
                    </div>

                    <div className="flex items-center gap-2 rounded-xl bg-muted px-3 py-2.5 text-sm text-muted-foreground">
                      <LoaderCircle className="size-4 animate-spin" />
                      Thinking...
                    </div>
                  </div>
                )}
              </>
            )}

            {error && (
              <div
                role="alert"
                className="rounded-xl border border-destructive/30 bg-destructive/5 p-3 text-sm text-destructive"
              >
                {error}
                <button
                  type="button"
                  onClick={() => setError("")}
                  className="ml-2 font-semibold underline underline-offset-2"
                >
                  Dismiss
                </button>
              </div>
            )}
          </div>

          {/* Message Input */}
          <div className="shrink-0 border-t bg-background p-3">
            <form
              onSubmit={handleSubmit}
              className="flex items-end gap-2 rounded-xl border border-border bg-muted/30 p-2 focus-within:border-orange-500/50"
            >
              <Textarea
                value={input}
                onChange={(event) => {
                  setInput(event.target.value);

                  if (error) {
                    setError("");
                  }
                }}
                onKeyDown={(event) => {
                  if (
                    event.key === "Enter" &&
                    !event.shiftKey &&
                    !event.nativeEvent.isComposing
                  ) {
                    event.preventDefault();
                    event.currentTarget.form?.requestSubmit();
                  }
                }}
                placeholder="Ask anything about UniSphere..."
                className="max-h-28 min-h-10 resize-none border-0 bg-transparent shadow-none focus-visible:ring-0"
                maxLength={1000}
                disabled={isPending}
                aria-label="Your question"
              />

              <Button
                type="submit"
                size="icon"
                aria-label="Send message"
                disabled={isPending || !input.trim()}
                className="size-10 shrink-0 rounded-lg bg-orange-600 text-white hover:bg-orange-700"
              >
                {isPending ? (
                  <LoaderCircle className="size-4 animate-spin" />
                ) : (
                  <Send className="size-4" />
                )}
              </Button>
            </form>

            <div className="mt-2 flex items-center justify-between gap-2">
              <p className="text-[11px] text-muted-foreground">
                Powered by UniSphere AI
              </p>

              {messages.length > 0 && (
                <button
                  type="button"
                  onClick={clearChat}
                  disabled={isPending}
                  className="inline-flex items-center gap-1 text-[11px] text-muted-foreground transition-colors hover:text-foreground disabled:opacity-50"
                >
                  <Trash2 className="size-3" />
                  Clear chat
                </button>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}