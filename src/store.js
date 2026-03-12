/**
 * ASilva Innovations Blog — Global State Store (Zustand)
 *
 * Manages articles, UI state, and user session.
 * Persists drafts to localStorage.
 */

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

// ── Articles Store ────────────────────────────────────────────
export const useArticleStore = create(
  persist(
    (set, get) => ({
      articles: [],

      // Actions
      setArticles: (articles) => set({ articles }),

      upsertArticle: (article) =>
        set((state) => {
          const exists = state.articles.find((a) => a.id === article.id);
          if (exists) {
            return {
              articles: state.articles.map((a) =>
                a.id === article.id ? { ...a, ...article } : a
              ),
            };
          }
          return { articles: [...state.articles, article] };
        }),

      deleteArticle: (id) =>
        set((state) => ({
          articles: state.articles.filter((a) => a.id !== id),
        })),

      publishArticle: (id) =>
        set((state) => ({
          articles: state.articles.map((a) =>
            a.id === id
              ? { ...a, status: "published", publishedAt: new Date().toISOString() }
              : a
          ),
        })),

      scheduleArticle: (id, scheduledDate) =>
        set((state) => ({
          articles: state.articles.map((a) =>
            a.id === id ? { ...a, status: "scheduled", scheduledDate } : a
          ),
        })),

      addVersion: (articleId, version) =>
        set((state) => ({
          articles: state.articles.map((a) =>
            a.id === articleId
              ? { ...a, versions: [...(a.versions || []), version] }
              : a
          ),
        })),

      // Selectors
      getPublished: () =>
        get().articles.filter((a) => a.status === "published"),

      getDrafts: () =>
        get().articles.filter((a) => a.status !== "published"),

      getByCategory: (category) =>
        get().articles.filter(
          (a) => a.status === "published" && a.category === category
        ),

      getById: (id) => get().articles.find((a) => a.id === id),

      getFeatured: () =>
        get().articles.find((a) => a.status === "published" && a.featured),

      search: (query) => {
        const q = query.toLowerCase();
        return get().articles.filter(
          (a) =>
            a.status === "published" &&
            (a.title?.toLowerCase().includes(q) ||
              a.excerpt?.toLowerCase().includes(q) ||
              a.tags?.some((t) => t.includes(q)))
        );
      },
    }),
    {
      name: "asilva-articles",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ articles: state.articles }),
    }
  )
);

// ── UI Store ──────────────────────────────────────────────────
export const useUIStore = create((set) => ({
  view: "blog",               // blog | admin | editor | drafts
  adminTab: "overview",       // overview | articles | comments | users | subscribers | analytics
  editingArticleId: null,
  selectedArticle: null,
  activeCategory: "all",
  searchQuery: "",
  showNewsletter: false,
  showMobileMenu: false,
  readingProgress: 0,

  // Navigation
  setView: (view) => set({ view }),
  setAdminTab: (adminTab) => set({ adminTab }),

  // Editor
  openEditor: (id = null) =>
    set({ editingArticleId: id, view: "editor" }),

  // Article modal
  setSelectedArticle: (article) => set({ selectedArticle: article }),
  closeArticle: () => set({ selectedArticle: null }),

  // Filtering
  setActiveCategory: (cat) => set({ activeCategory: cat }),
  setSearchQuery: (q) => set({ searchQuery: q }),

  // UI toggles
  setShowNewsletter: (show) => set({ showNewsletter: show }),
  toggleMobileMenu: () =>
    set((state) => ({ showMobileMenu: !state.showMobileMenu })),
  setReadingProgress: (pct) => set({ readingProgress: pct }),
}));

// ── Comments Store ────────────────────────────────────────────
export const useCommentStore = create(
  persist(
    (set, get) => ({
      comments: [],

      setComments: (comments) => set({ comments }),

      updateCommentStatus: (id, status) =>
        set((state) => ({
          comments: state.comments.map((c) =>
            c.id === id ? { ...c, status } : c
          ),
        })),

      deleteComment: (id) =>
        set((state) => ({
          comments: state.comments.filter((c) => c.id !== id),
        })),

      addComment: (comment) =>
        set((state) => ({
          comments: [
            ...state.comments,
            { ...comment, id: Date.now(), status: "pending" },
          ],
        })),

      getPending: () => get().comments.filter((c) => c.status === "pending"),
    }),
    {
      name: "asilva-comments",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

// ── Subscribers Store ─────────────────────────────────────────
export const useSubscriberStore = create(
  persist(
    (set, get) => ({
      subscribers: [],

      setSubscribers: (subscribers) => set({ subscribers }),

      addSubscriber: (email, name = "", source = "Website") => {
        const exists = get().subscribers.find((s) => s.email === email);
        if (exists) return false;
        set((state) => ({
          subscribers: [
            ...state.subscribers,
            {
              id: Date.now(),
              email,
              name,
              source,
              status: "active",
              subscribed: new Date().toISOString(),
            },
          ],
        }));
        return true;
      },

      unsubscribe: (email) =>
        set((state) => ({
          subscribers: state.subscribers.map((s) =>
            s.email === email ? { ...s, status: "unsubscribed" } : s
          ),
        })),

      getActive: () =>
        get().subscribers.filter((s) => s.status === "active"),
    }),
    {
      name: "asilva-subscribers",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

// ── Users Store ───────────────────────────────────────────────
export const useUserStore = create(
  persist(
    (set) => ({
      currentUser: {
        id: 1,
        name: "Alexandra Silva",
        email: "alex@asilvainnovations.com",
        role: "admin",
        avatar: "AS",
      },
      users: [],

      setUsers: (users) => set({ users }),

      updateUserRole: (id, role) =>
        set((state) => ({
          users: state.users.map((u) =>
            u.id === id ? { ...u, role } : u
          ),
        })),
    }),
    {
      name: "asilva-users",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ users: state.users }),
    }
  )
);
