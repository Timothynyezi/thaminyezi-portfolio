import { useState } from "react";

interface Message {
  id: number;
  name: string;
  email: string;
  message: string;
  createdAt: string;
}

export default function Admin() {
  const [password, setPassword] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [authed, setAuthed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selected, setSelected] = useState<Message | null>(null);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/messages", {
        headers: { "X-Admin-Password": password },
      });
      if (!res.ok) {
        setError("Incorrect password. Please try again.");
        return;
      }
      const data = await res.json();
      setMessages(data);
      setAuthed(true);
    } catch {
      setError("Could not connect to the server.");
    } finally {
      setLoading(false);
    }
  }

  async function refresh() {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/messages", {
        headers: { "X-Admin-Password": password },
      });
      if (res.ok) setMessages(await res.json());
    } finally {
      setLoading(false);
    }
  }

  if (!authed) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-4">
        <div className="w-full max-w-sm">
          <div className="mb-8 text-center">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 mb-4">
              <svg className="w-7 h-7 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-foreground">Admin Inbox</h1>
            <p className="text-muted-foreground text-sm mt-1">Enter your password to view messages</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Password</label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Enter admin password"
                required
                className="w-full px-4 py-2.5 rounded-lg bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
              />
            </div>
            {error && (
              <p className="text-sm text-red-400 bg-red-400/10 border border-red-400/20 rounded-lg px-3 py-2">
                {error}
              </p>
            )}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 px-4 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90 disabled:opacity-50 transition-opacity"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <p className="mt-6 text-center text-xs text-muted-foreground">
            <a href="/" className="hover:text-primary transition-colors">← Back to portfolio</a>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 sticky top-0 z-10 backdrop-blur-sm">
        <div className="max-w-5xl mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-lg font-bold text-foreground">Admin Inbox</h1>
            <p className="text-xs text-muted-foreground">{messages.length} message{messages.length !== 1 ? "s" : ""}</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={refresh}
              disabled={loading}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm bg-secondary text-secondary-foreground hover:bg-secondary/80 disabled:opacity-50 transition-colors"
            >
              <svg className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Refresh
            </button>
            <a
              href="/"
              className="px-3 py-1.5 rounded-lg text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              ← Portfolio
            </a>
          </div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 md:px-6 py-8">
        {messages.length === 0 ? (
          <div className="text-center py-24">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-card border border-border mb-4">
              <svg className="w-8 h-8 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h2 className="text-lg font-semibold text-foreground mb-1">No messages yet</h2>
            <p className="text-muted-foreground text-sm">Contact form submissions will appear here.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-[340px_1fr] gap-6">
            {/* Message list */}
            <div className="space-y-2">
              {messages.map(msg => (
                <button
                  key={msg.id}
                  onClick={() => setSelected(msg)}
                  className={`w-full text-left p-4 rounded-xl border transition-all ${
                    selected?.id === msg.id
                      ? "bg-primary/10 border-primary/40"
                      : "bg-card border-border hover:border-primary/20 hover:bg-card/80"
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <span className="font-medium text-foreground text-sm truncate">{msg.name}</span>
                    <span className="text-xs text-muted-foreground whitespace-nowrap flex-shrink-0">{msg.createdAt}</span>
                  </div>
                  <p className="text-xs text-primary truncate mb-1">{msg.email}</p>
                  <p className="text-xs text-muted-foreground line-clamp-2">{msg.message}</p>
                </button>
              ))}
            </div>

            {/* Message detail */}
            <div className="bg-card border border-border rounded-xl p-6 h-fit sticky top-24">
              {selected ? (
                <>
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <h2 className="text-xl font-semibold text-foreground">{selected.name}</h2>
                      <a href={`mailto:${selected.email}`} className="text-sm text-primary hover:underline">{selected.email}</a>
                    </div>
                    <span className="text-xs text-muted-foreground bg-secondary px-2 py-1 rounded-md">{selected.createdAt}</span>
                  </div>
                  <div className="border-t border-border pt-5">
                    <p className="text-foreground leading-relaxed whitespace-pre-wrap">{selected.message}</p>
                  </div>
                  <div className="mt-6 pt-5 border-t border-border">
                    <a
                      href={`mailto:${selected.email}`}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2H5a2 2 0 00-2-2V7a2 2 0 012-2h14a2 2 0 012 2v10a2 2 0 01-2 2z" />
                      </svg>
                      Reply via Email
                    </a>
                  </div>
                </>
              ) : (
                <div className="text-center py-12">
                  <svg className="w-10 h-10 text-muted-foreground mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                  </svg>
                  <p className="text-muted-foreground text-sm">Select a message to read it</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
