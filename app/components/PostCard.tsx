"use client";

import { useState, useEffect } from "react";
import { Card, CardHeader, CardContent, Separator } from "@heroui/react";
import { UserRole } from "./AppHeader";

export interface Post {
  id: number;
  title: string;
  content: string;
  author: string;
}

interface PostCardProps {
  post: Post;
  role: UserRole;
  isNew?: boolean;
  initialIsEditing?: boolean;
  onUpdate?: (updatedPost: Post) => void;
  onDelete?: (postId: number) => void;
}

export default function PostCard({ 
  post, 
  role, 
  isNew = false, 
  initialIsEditing = false,
  onUpdate, 
  onDelete 
}: PostCardProps) {
  const [isEditing, setIsEditing] = useState(initialIsEditing);
  const [editedTitle, setEditedTitle] = useState(post.title);
  const [editedContent, setEditedContent] = useState(post.content);
  const [editedAuthor, setEditedAuthor] = useState(post.author);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (initialIsEditing) {
      setIsEditing(true);
    }
  }, [initialIsEditing]);

  const handleSave = async () => {
    if (!editedTitle || !editedContent || !editedAuthor) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    setIsSaving(true);
    try {
      const url = isNew ? "http://localhost:3030/posts" : `http://localhost:3030/posts/${post.id}`;
      const method = isNew ? "POST" : "PUT";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: editedTitle,
          content: editedContent,
          author: editedAuthor,
        }),
      });

      if (!response.ok) throw new Error(`Erro ao ${isNew ? 'criar' : 'atualizar'} post`);

      const savedPost = await response.json();
      if (onUpdate) onUpdate(savedPost);
      setIsEditing(false);
    } catch (error) {
      console.error("Erro ao salvar post:", error);
      alert(`Falha ao ${isNew ? 'criar' : 'salvar'} as alterações.`);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (isNew) {
      if (onDelete) onDelete(post.id);
      return;
    }

    if (!confirm("Tem certeza que deseja excluir este post?")) return;
    
    setIsDeleting(true);
    try {
      const response = await fetch(`http://localhost:3030/posts/${post.id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Erro ao excluir post");

      if (onDelete) onDelete(post.id);
    } catch (error) {
      console.error("Erro ao excluir post:", error);
      alert("Falha ao excluir o post.");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleCancel = () => {
    if (isNew) {
      if (onDelete) onDelete(post.id);
      return;
    }
    setEditedTitle(post.title);
    setEditedContent(post.content);
    setEditedAuthor(post.author);
    setIsEditing(false);
  };

  return (
    <div style={{ padding: "0 24px 32px 24px" }}>
      <Card 
        style={{
          width: "100%",
          maxWidth: "100%",
          border: isEditing ? "2px solid #6366f1" : "1px solid #e2e8f0",
          borderRadius: "24px",
          overflow: "hidden",
          position: "relative",
          background: isEditing ? "#ffffff" : "linear-gradient(135deg, #ffffff 0%, #f5f3ff 100%)",
          boxShadow: isEditing ? "0 25px 50px -12px rgba(0, 0, 0, 0.25)" : "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          opacity: isDeleting ? 0.5 : 1,
          transform: isEditing ? "scale(1.02)" : "scale(1)",
          zIndex: isEditing ? 50 : 1,
        }}
        className="group"
      >
        <div 
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "6px",
            height: "100%",
            background: isNew 
              ? "linear-gradient(180deg, #10b981 0%, #059669 100%)" 
              : "linear-gradient(180deg, #4338ca 0%, #6d28d9 50%, #7c3aed 100%)",
            zIndex: 10,
          }}
        />
        
        <CardHeader 
          style={{
            padding: "24px 32px",
            background: "rgba(255, 255, 255, 0.4)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ flex: 1 }}>
            {isEditing ? (
              <input
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
                style={{
                  fontSize: "1.5rem",
                  fontWeight: 900,
                  color: "#1e293b",
                  width: "100%",
                  padding: "8px 12px",
                  borderRadius: "8px",
                  border: "1px solid #cbd5e1",
                  outline: "none",
                  background: "#f8fafc",
                }}
                placeholder="Título do post"
              />
            ) : (
              <h3 style={{ fontSize: "1.5rem", fontWeight: 900, color: "#1e293b", margin: 0 }}>
                {post.title}
              </h3>
            )}
          </div>

          {!isEditing && role === "teacher" && (
            <div style={{ display: "flex", gap: "8px", marginLeft: "16px" }}>
              <button
                onClick={() => setIsEditing(true)}
                style={{
                  padding: "8px 16px",
                  background: "rgba(79, 70, 229, 0.1)",
                  color: "#4f46e5",
                  border: "none",
                  borderRadius: "12px",
                  fontSize: "0.875rem",
                  fontWeight: 700,
                  cursor: "pointer",
                }}
              >
                Editar
              </button>
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                style={{
                  padding: "8px 16px",
                  background: "rgba(225, 29, 72, 0.1)",
                  color: "#e11d48",
                  border: "none",
                  borderRadius: "12px",
                  fontSize: "0.875rem",
                  fontWeight: 700,
                  cursor: "pointer",
                }}
              >
                Excluir
              </button>
            </div>
          )}
        </CardHeader>
        
        <Separator style={{ background: "rgba(226, 232, 240, 0.6)", width: "100%" }} />
        
        <CardContent style={{ padding: "24px 32px 32px 32px", display: "flex", flexDirection: "column", gap: "20px" }}>
          {isEditing ? (
            <textarea
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
              rows={4}
              style={{
                fontSize: "1.125rem",
                lineHeight: 1.6,
                color: "#475569",
                width: "100%",
                padding: "12px",
                borderRadius: "12px",
                border: "1px solid #cbd5e1",
                outline: "none",
                background: "#f8fafc",
                resize: "vertical",
                minHeight: "120px",
              }}
              placeholder="Conteúdo do post..."
            />
          ) : (
            <p style={{ fontSize: "1.125rem", lineHeight: 1.6, color: "#475569", margin: 0, fontStyle: "italic", fontWeight: 500 }}>
              "{post.content}"
            </p>
          )}

          <div style={{ marginTop: "auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            {isEditing ? (
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "#94a3b8" }}>@</span>
                <input
                  value={editedAuthor}
                  onChange={(e) => setEditedAuthor(e.target.value)}
                  style={{
                    fontSize: "0.875rem",
                    fontWeight: 800,
                    color: "#4f46e5",
                    padding: "4px 8px",
                    borderRadius: "6px",
                    border: "1px solid #cbd5e1",
                    outline: "none",
                    background: "#f8fafc",
                    width: "120px",
                  }}
                  placeholder="autor"
                />
              </div>
            ) : (
              <p style={{ fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "#94a3b8", margin: 0 }}>
                Publicado por <span style={{ color: "#4f46e5", fontWeight: 800 }}>@{post.author.toLowerCase()}</span>
              </p>
            )}

            {isEditing && (
              <div style={{ display: "flex", gap: "12px" }}>
                <button
                  onClick={handleCancel}
                  disabled={isSaving}
                  style={{
                    padding: "10px 20px",
                    background: "#f1f5f9",
                    color: "#64748b",
                    border: "none",
                    borderRadius: "12px",
                    fontSize: "0.875rem",
                    fontWeight: 700,
                    cursor: "pointer",
                  }}
                >
                  Cancelar
                </button>
                <button
                  onClick={handleSave}
                  disabled={isSaving}
                  style={{
                    padding: "10px 24px",
                    background: isNew 
                      ? "linear-gradient(90deg, #10b981 0%, #059669 100%)" 
                      : "linear-gradient(90deg, #4338ca 0%, #6d28d9 100%)",
                    color: "white",
                    border: "none",
                    borderRadius: "12px",
                    fontSize: "0.875rem",
                    fontWeight: 700,
                    cursor: "pointer",
                    boxShadow: isNew 
                      ? "0 4px 6px -1px rgba(16, 185, 129, 0.4)" 
                      : "0 4px 6px -1px rgba(79, 70, 229, 0.4)",
                  }}
                >
                  {isSaving ? "Salvando..." : isNew ? "Criar Post" : "Confirmar"}
                </button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
