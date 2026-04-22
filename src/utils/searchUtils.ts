export interface SearchResult {
  id: string;
  type: 'tour' | 'product' | 'destination';
  title: string;
  location?: string;
  supplier?: string;
  price?: number | string;
  image?: string;
  rating?: number;
  score: number;
}

// Fuzzy search function with case-insensitive matching
export function fuzzySearch(query: string, items: any[], itemType: 'tour' | 'product' | 'destination'): SearchResult[] {
  if (!query || query.trim() === '') {
    return [];
  }

  const normalizedQuery = query.toLowerCase().trim();
  const results: SearchResult[] = [];

  items.forEach((item) => {
    let score = 0;
    const searchableFields: string[] = [];

    if (itemType === 'tour') {
      searchableFields.push(
        item.title?.toLowerCase() || '',
        item.location?.toLowerCase() || '',
        item.category?.toLowerCase() || '',
        item.region?.toLowerCase() || ''
      );
    } else if (itemType === 'product') {
      searchableFields.push(
        item.name?.toLowerCase() || '',
        item.supplier?.toLowerCase() || '',
        item.category?.toLowerCase() || '',
        item.description?.toLowerCase() || ''
      );
    } else if (itemType === 'destination') {
      searchableFields.push(
        item.name?.toLowerCase() || '',
        item.country?.toLowerCase() || '',
        item.region?.toLowerCase() || ''
      );
    }

    // Calculate score based on how well the query matches the fields
    searchableFields.forEach((field) => {
      if (field.includes(normalizedQuery)) {
        // Exact matches get higher score
        if (field === normalizedQuery) {
          score += 10;
        }
        // Partial matches get score based on position and length
        else {
          const index = field.indexOf(normalizedQuery);
          if (index === 0) {
            score += 8; // Starts with query
          } else if (index > 0) {
            score += 5; // Contains query
          }
          // Longer matches get slightly higher score
          score += (normalizedQuery.length / field.length) * 2;
        }
      }
    });

    if (score > 0) {
      results.push({
        id: item.id,
        type: itemType,
        title: item.title || item.name,
        location: item.location,
        supplier: item.supplier,
        price: item.price || item.priceRange,
        image: item.image,
        rating: item.rating || item.supplierRating,
        score
      });
    }
  });

  // Sort results by score (highest first)
  return results.sort((a, b) => b.score - a.score);
}

// Debounce function for search input
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;

  return (...args: Parameters<T>) => {
    if (timeout) {
      clearTimeout(timeout);
    }

    timeout = setTimeout(() => {
      func(...args);
    }, wait);
  };
}

// Highlight matching text in search results
export function highlightText(text: string, query: string): string {
  if (!query || query.trim() === '') {
    return text;
  }

  const normalizedQuery = query.toLowerCase();
  const parts = text.split(new RegExp(`(${query})`, 'gi'));

  return parts
    .map((part) => {
      if (part.toLowerCase() === normalizedQuery) {
        return `<mark class="bg-yellow-200">${part}</mark>`;
      }
      return part;
    })
    .join('');
}

// Search across multiple item types
export function searchAll(query: string, tours: any[], products: any[]): SearchResult[] {
  if (!query || query.trim() === '') {
    return [];
  }

  const tourResults = fuzzySearch(query, tours, 'tour');
  const productResults = fuzzySearch(query, products, 'product');

  // Combine and sort all results by score
  return [...tourResults, ...productResults].sort((a, b) => b.score - a.score);
}
