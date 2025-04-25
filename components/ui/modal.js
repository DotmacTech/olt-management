"use client";

import React from 'react';
import { X } from 'lucide-react';
import { Button } from "@/components/ui/button";

export function Modal({ isOpen, onClose, title, children, maxWidth = "max-w-3xl" }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className={`bg-white rounded-lg shadow-lg ${maxWidth} w-full max-h-[90vh] flex flex-col`}>
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-semibold text-black">{title}</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5 text-black" />
          </Button>
        </div>
        <div className="flex-1 overflow-auto p-4">
          {children}
        </div>
      </div>
    </div>
  );
}