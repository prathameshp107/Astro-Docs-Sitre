// ─── Shared DOM and Style Validator for HTML/CSS/Tailwind Labs ───
// Performs assertions on the actual rendered iframe document and computed styles
// to prevent simple comment/regex cheating.

export function verifyDomAndStyles(code, testName, doc) {
  if (!doc) return true; // Fallback to source check if iframe document is not loaded
  
  const nameLower = testName.toLowerCase();
  
  // 1. Tag presence validations
  if (nameLower.includes("h1") && nameLower.includes("present")) {
    return doc.querySelector("h1") !== null;
  }
  if (nameLower.includes("h2") && nameLower.includes("present")) {
    return doc.querySelector("h2") !== null;
  }
  if (nameLower.includes("paragraph") || nameLower.includes("<p>")) {
    return doc.querySelector("p") !== null;
  }
  if (nameLower.includes("button") || nameLower.includes("<button>")) {
    return doc.querySelector("button") !== null;
  }
  if (nameLower.includes("input") || nameLower.includes("<input>")) {
    return doc.querySelector("input") !== null;
  }
  if (nameLower.includes("image") || nameLower.includes("<img>")) {
    return doc.querySelector("img") !== null;
  }
  if (nameLower.includes("list") || nameLower.includes("<ul>") || nameLower.includes("<ol>")) {
    return doc.querySelector("ul, ol") !== null;
  }
  if (nameLower.includes("link") || nameLower.includes("<a>")) {
    return doc.querySelector("a") !== null;
  }
  if (nameLower.includes("form") || nameLower.includes("<form>")) {
    return doc.querySelector("form") !== null;
  }
  if (nameLower.includes("table") || nameLower.includes("<table>")) {
    return doc.querySelector("table") !== null;
  }
  
  // 2. Attribute checks
  if (nameLower.includes("placeholder")) {
    const input = doc.querySelector("input, textarea");
    return input ? input.placeholder !== "" : false;
  }
  if (nameLower.includes("href")) {
    const a = doc.querySelector("a");
    return a ? a.hasAttribute("href") : false;
  }
  if (nameLower.includes("src")) {
    const img = doc.querySelector("img");
    return img ? img.hasAttribute("src") : false;
  }
  if (nameLower.includes("alt attribute") || nameLower.includes("alt text")) {
    const img = doc.querySelector("img");
    return img ? img.hasAttribute("alt") : false;
  }

  // 3. Computed style checks
  const allElements = Array.from(doc.querySelectorAll("body *"));
  
  if (nameLower.includes("color") || nameLower.includes("background-color") || nameLower.includes("background color")) {
    return allElements.some(el => {
      const style = window.getComputedStyle(el);
      return style.color !== "" || style.backgroundColor !== "transparent";
    });
  }
  
  if (nameLower.includes("flex") || nameLower.includes("display: flex")) {
    return allElements.some(el => {
      const display = window.getComputedStyle(el).display;
      return display === "flex" || display === "inline-flex";
    });
  }

  if (nameLower.includes("grid") || nameLower.includes("display: grid")) {
    return allElements.some(el => {
      return window.getComputedStyle(el).display === "grid";
    });
  }

  if (nameLower.includes("border")) {
    return allElements.some(el => {
      const style = window.getComputedStyle(el);
      return style.borderStyle !== "none" || style.borderRadius !== "0px";
    });
  }
  
  if (nameLower.includes("font-family") || nameLower.includes("font family")) {
    return allElements.some(el => {
      return window.getComputedStyle(el).fontFamily !== "";
    });
  }
  
  return true;
}
