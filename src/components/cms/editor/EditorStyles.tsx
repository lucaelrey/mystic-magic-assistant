import React from 'react';

export const EditorStyles = () => {
  return (
    <style>
      {`
        .ProseMirror {
          padding: 1rem;
          min-height: 400px;
        }
        .ProseMirror h1 {
          font-size: 2.25rem;
          line-height: 2.5rem;
          margin: 2rem 0 1rem;
          font-weight: 700;
        }
        .ProseMirror h2 {
          font-size: 1.875rem;
          line-height: 2.25rem;
          margin: 1.75rem 0 0.875rem;
          font-weight: 600;
        }
        .ProseMirror h3 {
          font-size: 1.5rem;
          line-height: 2rem;
          margin: 1.5rem 0 0.75rem;
          font-weight: 600;
        }
        .ProseMirror p {
          margin: 1.25rem 0;
          line-height: 1.75;
        }
        .ProseMirror ul {
          list-style-type: disc !important;
          padding-left: 1.5rem;
          margin: 1.25rem 0;
        }
        .ProseMirror ol {
          list-style-type: decimal !important;
          padding-left: 1.5rem;
          margin: 1.25rem 0;
        }
        .ProseMirror li {
          margin: 0.5rem 0;
          padding-left: 0.5rem;
          display: list-item !important;
        }
        .ProseMirror li > p {
          margin: 0;
        }
        .ProseMirror blockquote {
          border-left: 4px solid #e5e7eb;
          padding-left: 1rem;
          margin: 1.5rem 0;
          font-style: italic;
        }
        .ProseMirror a {
          color: #e2c361;
          text-decoration: none;
        }
        .ProseMirror a:hover {
          color: rgba(226, 195, 97, 0.8);
        }
      `}
    </style>
  );
};