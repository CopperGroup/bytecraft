import { Store } from "@/constants/store";

  
  // Generate an optimized meta description (50-160 characters)
export function generateMetaDescription(
    productName: string,
    description: string,
    params: Array<{ name: string; value: string }>,
    storeName: string,
  ): string {
    // Extract key features (up to 2)
    const keyFeatures = params
      .filter((param) => ["Особливості", "Тип", "Бренд"].includes(param.name))
      .slice(0, 2)
      .map((param) => param.value)
      .join(", ")
  
    // Create a concise description
    const baseDesc = `Купуйте ${simplifyProductName(productName)} з доставкою від ${storeName}.`
    const featuresDesc = keyFeatures ? ` ${keyFeatures}.` : ""
  
    // Combine and ensure within 160 characters
    let finalDesc = `${baseDesc}${featuresDesc}`
    if (finalDesc.length > 160) {
      finalDesc = finalDesc.substring(0, 157) + "..."
    }
  
    return finalDesc
  }
  
  // Generate relevant keywords
  export function generateKeywords(
    productName: string,
    categoryName: string,
    params: Array<{ name: string; value: string }>,
  ): string {
    // Extract brand
    const brand = params.find((param) => param.name === "Бренд")?.value || ""
  
    // Extract key product attributes
    const type = params.find((param) => param.name === "Тип")?.value || ""
    const color = params.find((param) => param.name === "Колір")?.value || ""
  
    // Create base keywords
    const baseKeywords = [simplifyProductName(productName), brand, type, color, categoryName, "купити", "ціна", "Україна"]
  
    // Filter out empty values and join
    return baseKeywords.filter(Boolean).join(", ")
  }
  
  // Helper to simplify product names by removing excessive details
  export function simplifyProductName(productName: string): string {
    // Remove excessive specifications and details
    let simplified = productName
      .replace(/\d+(\.\d+)?(G|GB|TB|MHz|GHz)/gi, "") // Remove memory/frequency specs
      .replace(/\d+x\d+/g, "") // Remove dimensions
      .replace(/\d+ ?DPI/gi, "") // Remove DPI values
      .replace(/\s{2,}/g, " ") // Remove extra spaces
      .trim()
  
    // If still too long, truncate
    if (simplified.length > 50) {
      simplified = simplified.substring(0, 47) + "..."
    }
  
    return simplified
  }
  
  // Strip HTML tags from text
  export function stripHtml(html: string): string {
    return html?.replace(/<[^>]*>?/gm, "") || ""
  }
  /**
   * Generates structured data for product FAQs
   */
  export function generateProductFaqs(
    productName: string,
    params: Array<{ name: string; value: string }>,
    currencySign: string,
  ) {
    return [
      {
        question: `Які характеристики має ${productName}?`,
        answer: `${productName} має наступні характеристики: ${params
          .slice(0, 3)
          .map((p) => `${p.name}: ${p.value}`)
          .join(", ")}${params.length > 3 ? " та інші." : "."}`,
      },
      {
        question: `Яка гарантія на ${productName}?`,
        answer: `${params.find((param) => param.name === "Гарантія")?.value || "Стандартна гарантія"} від виробника.`,
      },
      {
        question: `Чи доступна безкоштовна доставка для ${productName}?`,
        answer: `Так, безкоштовна доставка доступна при замовленні від ${currencySign}${Store.freeDelivery}.`,
      },
    ]
  }
  