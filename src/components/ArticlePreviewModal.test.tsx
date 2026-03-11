import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import ArticlePreviewModal from "./ArticlePreviewModal";
import React from "react";

describe("ArticlePreviewModal", () => {
  const mockArticle = {
    title: "Test Article Title",
    description: "This is a test description",
    content: "This is test content.",
    image_url: "https://example.com/image.jpg",
    author_first_name: "John",
    author_last_name: "Doe",
    category: "TEST CATEGORY"
  };

  it("does not render when isOpen is false", () => {
    const { container } = render(
      <ArticlePreviewModal isOpen={false} onClose={vi.fn()} article={mockArticle} />
    );
    expect(container.firstChild).toBeNull();
  });

  it("renders correctly when isOpen is true", () => {
    render(<ArticlePreviewModal isOpen={true} onClose={vi.fn()} article={mockArticle} />);
    
    expect(screen.getByText("Test Article Title")).toBeInTheDocument();
    expect(screen.getByText("This is a test description")).toBeInTheDocument();
    expect(screen.getByText("This is test content.")).toBeInTheDocument();
    expect(screen.getByText("TEST CATEGORY")).toBeInTheDocument();
    expect(screen.getByText("John Doe")).toBeInTheDocument();
  });

  it("calls onClose when the close button is clicked", () => {
    const handleClose = vi.fn();
    render(<ArticlePreviewModal isOpen={true} onClose={handleClose} article={mockArticle} />);
    
    const closeButtons = screen.getAllByRole("button");
    // Find either "Back to Editor" or the X button
    fireEvent.click(closeButtons[0]);
    
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it("renders with fallback title when title is empty", () => {
    render(<ArticlePreviewModal isOpen={true} onClose={vi.fn()} article={{ ...mockArticle, title: "" }} />);
    expect(screen.getByText("Untitled Article")).toBeInTheDocument();
  });
});
