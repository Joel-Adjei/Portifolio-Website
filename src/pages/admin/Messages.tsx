import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  HiTrash,
  HiMailOpen,
  HiMail,
  HiSearch,
  HiX,
  HiChevronDown,
  HiChevronUp,
} from "react-icons/hi";
import { Input } from "@/components/ui/input";
import { useMessagesStore, Message } from "@/stores/messagesStore";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

function formatDate(iso: string) {
  const d = new Date(iso);
  const now = new Date();
  const diff = now.getTime() - d.getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  if (days === 0) return "Today";
  if (days === 1) return "Yesterday";
  if (days < 7) return `${days} days ago`;
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function MessageRow({
  msg,
  onRead,
  onDelete,
}: {
  msg: Message;
  onRead: (id: string) => void;
  onDelete: (id: string) => void;
}) {
  const [expanded, setExpanded] = useState(false);

  const handleExpand = () => {
    setExpanded((v) => !v);
    if (!msg.read) onRead(msg._id);
  };

  return (
    <div
      className={cn(
        "border border-border rounded-lg transition-colors",
        !msg.read && "border-primary/40 bg-primary/5",
      )}
    >
      {/* Row header */}
      <button
        className="w-full flex items-center gap-3 px-4 py-3 text-left"
        onClick={handleExpand}
      >
        {/* Avatar */}
        <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary shrink-0">
          {msg.firstName[0]}
          {msg.lastName[0]}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0 grid sm:grid-cols-[1fr_1fr_auto] gap-x-4 items-center">
          <div className="truncate">
            <span className={cn("text-sm", !msg.read && "font-semibold")}>
              {msg.firstName} {msg.lastName}
            </span>
            <span className="text-xs text-muted-foreground ml-2 hidden sm:inline">
              {msg.email}
            </span>
          </div>
          <p
            className={cn(
              "text-sm truncate text-muted-foreground",
              !msg.read && "text-foreground font-medium",
            )}
          >
            {msg.subject}
          </p>
          <span className="text-xs text-muted-foreground whitespace-nowrap hidden sm:block">
            {formatDate(msg.date)}
          </span>
        </div>

        {/* Status + expand */}
        <div className="flex items-center gap-2 shrink-0">
          {!msg.read ? (
            <Badge variant="default" className="text-xs h-5 px-1.5">
              New
            </Badge>
          ) : (
            <Badge variant="secondary" className="text-xs h-5 px-1.5">
              Read
            </Badge>
          )}
          {expanded ? (
            <HiChevronUp className="h-4 w-4 text-muted-foreground" />
          ) : (
            <HiChevronDown className="h-4 w-4 text-muted-foreground" />
          )}
        </div>
      </button>

      {/* Expanded body */}
      {expanded && (
        <div className="px-4 pb-4 space-y-4 border-t border-border pt-3">
          <div className="grid sm:grid-cols-2 gap-2 text-sm text-muted-foreground">
            <span>
              <strong className="text-foreground">From:</strong> {msg.firstName}{" "}
              {msg.lastName} &lt;{msg.email}&gt;
            </span>
            <span>
              <strong className="text-foreground">Received:</strong>{" "}
              {new Date(msg.date).toLocaleString()}
            </span>
          </div>
          <div className="bg-muted/40 rounded-md p-4 text-sm leading-relaxed whitespace-pre-wrap">
            {msg.message}
          </div>
          <div className="flex gap-2 justify-end">
            {!msg.read && (
              <Button
                variant="outline"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  onRead(msg._id);
                }}
              >
                <HiMailOpen className="h-4 w-4 mr-2" />
                Mark as read
              </Button>
            )}
            <Button
              variant="destructive"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onDelete(msg._id);
              }}
            >
              <HiTrash className="h-4 w-4 mr-2" />
              Delete
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function MessagesPage() {
  const { messages, loading, error, fetchMessages, markAsRead, deleteMessage } =
    useMessagesStore();
  const { toast } = useToast();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "unread" | "read">("all");

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  const handleDelete = async (id: string) => {
    await deleteMessage(id);
    toast({ title: "Message deleted" });
  };

  const filtered = messages.filter((m) => {
    const matchesFilter =
      filter === "all" ||
      (filter === "unread" && !m.read) ||
      (filter === "read" && m.read);

    const q = search.toLowerCase();
    const matchesSearch =
      !q ||
      `${m.firstName} ${m.lastName}`.toLowerCase().includes(q) ||
      m.email.toLowerCase().includes(q) ||
      m.subject.toLowerCase().includes(q) ||
      m.message.toLowerCase().includes(q);

    return matchesFilter && matchesSearch;
  });

  const unreadCount = messages.filter((m) => !m.read).length;

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-3xl font-bold">Messages</h1>
        <p className="text-muted-foreground mt-1">
          {unreadCount > 0 ? (
            <>
              You have{" "}
              <span className="font-semibold text-primary">{unreadCount}</span>{" "}
              unread message{unreadCount !== 1 && "s"}.
            </>
          ) : (
            "All messages have been read."
          )}
        </p>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Search */}
            <div className="relative flex-1">
              <HiSearch className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
              <Input
                placeholder="Search messages..."
                className="pl-9 pr-8"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <HiX className="h-4 w-4" />
                </button>
              )}
            </div>

            {/* Filter tabs */}
            <div className="flex rounded-md border border-border overflow-hidden shrink-0">
              {(["all", "unread", "read"] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={cn(
                    "px-4 py-2 text-sm font-medium transition-colors capitalize flex items-center gap-1.5",
                    filter === f
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-accent text-muted-foreground",
                  )}
                >
                  {f === "unread" ? (
                    <HiMail className="h-3.5 w-3.5" />
                  ) : f === "read" ? (
                    <HiMailOpen className="h-3.5 w-3.5" />
                  ) : null}
                  {f}
                  {f === "unread" && unreadCount > 0 && (
                    <span className="bg-destructive text-destructive-foreground text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                      {unreadCount}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-3">
          {filtered.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <MessageSquareIcon className="h-10 w-10 mx-auto mb-3 opacity-30" />
              <p>No messages found.</p>
            </div>
          ) : (
            filtered.map((msg) => (
              <MessageRow
                key={msg._id}
                msg={msg}
                onRead={markAsRead}
                onDelete={handleDelete}
              />
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function MessageSquareIcon({ className }: { className?: string }) {
  return <HiChatAlt2 className={className} />;
}
