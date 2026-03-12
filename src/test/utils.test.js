/**
 * Tests for utility functions
 */

import { describe, it, expect } from "vitest";
import {
  formatNumber,
  slugify,
  truncate,
  isValidEmail,
  estimateReadTime,
  extractHeadings,
} from "../utils/index.js";

describe("formatNumber", () => {
  it("formats numbers under 1000 as-is", () => {
    expect(formatNumber(0)).toBe("0");
    expect(formatNumber(999)).toBe("999");
  });

  it("formats thousands with k suffix", () => {
    expect(formatNumber(1000)).toBe("1.0k");
    expect(formatNumber(14200)).toBe("14.2k");
    expect(formatNumber(999900)).toBe("999.9k");
  });

  it("formats millions with M suffix", () => {
    expect(formatNumber(1_000_000)).toBe("1.0M");
    expect(formatNumber(2_500_000)).toBe("2.5M");
  });
});

describe("slugify", () => {
  it("converts spaces to hyphens", () => {
    expect(slugify("Hello World")).toBe("hello-world");
  });

  it("removes special characters", () => {
    expect(slugify("Systems Thinking: A Framework")).toBe(
      "systems-thinking-a-framework"
    );
  });

  it("collapses multiple hyphens", () => {
    expect(slugify("AI  &  Analytics")).toBe("ai-analytics");
  });

  it("handles empty string", () => {
    expect(slugify("")).toBe("");
  });
});

describe("truncate", () => {
  it("returns full text when under limit", () => {
    expect(truncate("Short text", 100)).toBe("Short text");
  });

  it("truncates and adds ellipsis", () => {
    const long = "a".repeat(200);
    const result = truncate(long, 100);
    expect(result.length).toBeLessThanOrEqual(101);
    expect(result.endsWith("…")).toBe(true);
  });
});

describe("isValidEmail", () => {
  it("validates correct emails", () => {
    expect(isValidEmail("alex@asilvainnovations.com")).toBe(true);
    expect(isValidEmail("user+tag@domain.co.uk")).toBe(true);
  });

  it("rejects invalid emails", () => {
    expect(isValidEmail("notanemail")).toBe(false);
    expect(isValidEmail("@domain.com")).toBe(false);
    expect(isValidEmail("user@")).toBe(false);
    expect(isValidEmail("")).toBe(false);
  });
});

describe("estimateReadTime", () => {
  it("returns minimum 1 minute for empty content", () => {
    expect(estimateReadTime("")).toBe(1);
    expect(estimateReadTime()).toBe(1);
  });

  it("estimates based on 200 wpm", () => {
    const words = "word ".repeat(200);
    expect(estimateReadTime(words)).toBe(1);

    const words400 = "word ".repeat(400);
    expect(estimateReadTime(words400)).toBe(2);
  });
});

describe("extractHeadings", () => {
  it("extracts markdown headings", () => {
    const md = `
# Title
Some text
## Section One
More text
### Subsection
Even more
## Section Two
    `;
    const headings = extractHeadings(md);
    expect(headings).toHaveLength(4);
    expect(headings[0]).toMatchObject({ level: 1, text: "Title" });
    expect(headings[1]).toMatchObject({ level: 2, text: "Section One" });
  });

  it("returns empty array for content without headings", () => {
    expect(extractHeadings("Just plain text")).toHaveLength(0);
  });
});
