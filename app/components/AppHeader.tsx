"use client";

import {
  ListBox,
  ListBoxItem,
  Select,
  SelectPopover,
  SelectTrigger,
  SelectValue,
} from "@heroui/react";

export type UserRole = "student" | "teacher";

interface AppHeaderProps {
  role: UserRole;
  onRoleChange: (role: UserRole) => void;
}

export default function AppHeader({ role, onRoleChange }: AppHeaderProps) {
  return (
    <header
      style={{
        background: "linear-gradient(90deg, #4338ca 0%, #6d28d9 50%, #7c3aed 100%)",
        boxShadow: "0 4px 20px rgba(109, 40, 217, 0.35)",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 1.5rem",
        height: "4rem",
        flexShrink: 0,
      }}
      className="w-full shrink-0"
    >
      {/* Brand */}
      <div className="flex items-center gap-3">
        <span
          style={{
            background: "rgba(255,255,255,0.18)",
            backdropFilter: "blur(8px)",
          }}
          className="flex items-center justify-center w-10 h-10 rounded-xl shrink-0"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="white"
            width="22"
            height="22"
          >
            <path d="M11.7 2.805a.75.75 0 0 1 .6 0A60.65 60.65 0 0 1 22.83 8.72a.75.75 0 0 1-.231 1.337 49.948 49.948 0 0 0-9.902 3.912l-.003.002c-.114.06-.227.119-.34.18a.75.75 0 0 1-.707 0A50.88 50.88 0 0 0 7.5 12.173v-.224c0-.131.067-.248.172-.311a54.615 54.615 0 0 1 4.653-2.52.75.75 0 0 0-.65-1.352 56.123 56.123 0 0 0-4.78 2.589 1.858 1.858 0 0 0-.859 1.228 49.803 49.803 0 0 0-4.634-1.527.75.75 0 0 1-.231-1.337A60.653 60.653 0 0 1 11.7 2.805Z" />
            <path d="M13.06 15.473a48.45 48.45 0 0 1 7.666-3.282c.134 1.414.22 2.843.255 4.284a.75.75 0 0 1-.46.71 47.87 47.87 0 0 1-8.105 2.921.75.75 0 0 1-.832-.324 48.4 48.4 0 0 1-1.176-2.303.75.75 0 0 1 .652-1.011Z" />
            <path d="M10.94 15.473a48.45 48.45 0 0 0-7.666-3.282.75.75 0 0 0-.652 1.011 48.4 48.4 0 0 0 1.176 2.304.75.75 0 0 0 .832.323 47.87 47.87 0 0 0 8.105-2.92.75.75 0 0 0 .46-.71 47.97 47.97 0 0 0-.255-4.285Z" />
          </svg>
        </span>

        <div style={{ lineHeight: 1 }}>
          <p
            style={{
              color: "white",
              fontWeight: 700,
              fontSize: "1.125rem",
              letterSpacing: "-0.025em",
              margin: 0,
            }}
          >
            Blog Escolar
          </p>
          <p
            style={{
              color: "rgba(255,255,255,0.6)",
              fontSize: "0.72rem",
              fontWeight: 500,
              letterSpacing: "0.04em",
              marginTop: "2px",
              margin: 0,
            }}
          >
            Compartilhe conhecimento
          </p>
        </div>
      </div>

      {/* Role Selector using HeroUI Select */}
      <Select
        selectedKey={role}
        onSelectionChange={(key) => onRoleChange(key as UserRole)}
        aria-label="Tipo de usuário"
      >
        <SelectTrigger
          style={{
            background: "rgba(255,255,255,0.15)",
            border: "1px solid rgba(255,255,255,0.3)",
            color: "white",
            borderRadius: "0.5rem",
            padding: "0.4rem 0.75rem",
            fontSize: "0.875rem",
            fontWeight: 500,
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            minWidth: "9rem",
            cursor: "pointer",
            transition: "background 0.2s",
          }}
        >
          <SelectValue>
            {role === "student" ? "Aluno" : "Professor"}
          </SelectValue>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            width="16"
            height="16"
            style={{ marginLeft: "auto", opacity: 0.8, flexShrink: 0 }}
          >
            <path
              fillRule="evenodd"
              d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
              clipRule="evenodd"
            />
          </svg>
        </SelectTrigger>
        <SelectPopover
          style={{
            background: "white",
            borderRadius: "0.75rem",
            boxShadow: "0 10px 30px rgba(0,0,0,0.12)",
            border: "1px solid #f1f5f9",
            padding: "0.25rem",
            minWidth: "9rem",
          }}
        >
          <ListBox style={{ outline: "none" }}>
            <ListBoxItem
              id="student"
              style={{
                padding: "0.5rem 0.75rem",
                fontSize: "0.875rem",
                borderRadius: "0.5rem",
                cursor: "pointer",
                outline: "none",
                color: "#374151",
                transition: "background 0.15s, color 0.15s",
              }}
            >
              Aluno
            </ListBoxItem>
            <ListBoxItem
              id="teacher"
              style={{
                padding: "0.5rem 0.75rem",
                fontSize: "0.875rem",
                borderRadius: "0.5rem",
                cursor: "pointer",
                outline: "none",
                color: "#374151",
                transition: "background 0.15s, color 0.15s",
              }}
            >
              Professor
            </ListBoxItem>
          </ListBox>
        </SelectPopover>
      </Select>
    </header>
  );
}
