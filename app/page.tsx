"use client";

import { useState, useEffect } from "react";
import AppHeader, { UserRole } from "./components/AppHeader";
import PostCard, { Post } from "./components/PostCard";
import { Skeleton } from "@heroui/react";

export default function Home() {
  const [role, setRole] = useState<UserRole>("student");
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedRole = localStorage.getItem("user-role") as UserRole;
      if (savedRole) {
        setRole(savedRole);
      }
    }
  }, []);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await fetch("http://localhost:3030/posts");
        if (!response.ok) throw new Error("Falha ao buscar posts");
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error("Erro ao buscar posts:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchPosts();
  }, []);

  const handleCreatePost = () => {
    setIsCreating(true);
  };

  const handlePostCreated = (newPost: Post) => {
    setPosts(prev => [newPost, ...prev]);
    setIsCreating(false);
  };

  const handleCancelCreate = () => {
    setIsCreating(false);
  };

  return (
    <div className="flex flex-col flex-1 bg-zinc-50 font-sans dark:bg-black min-h-screen">
      <AppHeader role={role} onRoleChange={setRole} />

      <main className="flex flex-1 w-full max-w-2xl mx-auto flex-col gap-12 py-20 px-6">
        <div className="flex border-b border-slate-200 pb-8 justify-between items-end">
          <div className="flex flex-col gap-2">
            <h2 className="text-3xl font-black text-slate-800 tracking-tight">Posts Recentes</h2>
            <p className="text-slate-400 text-sm italic font-medium">
              Visualizando como <span className="font-bold text-indigo-600">{role === "student" ? "Aluno" : "Professor"}</span>
            </p>
          </div>
          
          {role === "teacher" && !isCreating && (
            <button
              onClick={handleCreatePost}
              style={{
                padding: "12px 24px",
                marginLeft: "24px",
                marginBottom: "24px",
                background: "linear-gradient(90deg, #4338ca 0%, #6d28d9 100%)",
                color: "white",
                border: "none",
                borderRadius: "16px",
                fontSize: "1rem",
                fontWeight: 800,
                cursor: "pointer",
                boxShadow: "0 10px 15px -3px rgba(79, 70, 229, 0.3)",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-2px)"}
              onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}
            >
              + Criar post
            </button>
          )}
        </div>

        <div className="flex flex-col gap-12 w-full mb-24">
          {isCreating && (
            <PostCard 
              post={{ id: -1, title: "", content: "", author: "" }} 
              role={role}
              isNew={true}
              initialIsEditing={true}
              onUpdate={handlePostCreated}
              onDelete={handleCancelCreate}
            />
          )}

          {isLoading ? (
            // Skeleton Loading State
            Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="w-full space-y-4 p-4 border border-slate-100 rounded-xl bg-white">
                <Skeleton className="w-2/3 h-6 rounded-lg" />
                <div className="space-y-3">
                  <Skeleton className="w-full h-4 rounded-lg" />
                  <Skeleton className="w-4/5 h-4 rounded-lg" />
                  <Skeleton className="w-3/5 h-4 rounded-lg" />
                </div>
              </div>
            ))
          ) : posts.length > 0 ? (
            posts.map((post) => (
              <PostCard 
                key={post.id} 
                post={post} 
                role={role}
                onUpdate={(updatedPost) => {
                  setPosts(prev => prev.map(p => p.id === updatedPost.id ? updatedPost : p));
                }}
                onDelete={(postId) => {
                  setPosts(prev => prev.filter(p => p.id !== postId));
                }}
              />
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-slate-400">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 mb-4 opacity-20">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
              </svg>
              <p>Nenhum post encontrado.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
