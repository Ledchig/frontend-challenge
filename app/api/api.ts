export interface Cat {
  id: string;
  url: string;
  isLiked: boolean;
}

export const getCats = async (): Promise<Cat[]> => {
  try {
    const key = 'live_pMoWlDXjIEMf1KnS2GHVfHRKMKWVTNKWHkmUcr0AbesRqkEaB2D4RuKFx8e1emrQ';
    const url = 'https://api.thecatapi.com/v1/images/search?limit=15';
    
    const response = await fetch(url, {
      headers: {
        "x-api-key": key,
      },
    });
    if (!response.ok) {
      throw new Error(`Failed to fetch cats. Status: ${response.status}`);
    }

    return response.json();
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error fetching cats:", error.message);
    } else {
      console.error("An unknown error occurred while fetching cats.");
    }
    throw error;
  }
};
