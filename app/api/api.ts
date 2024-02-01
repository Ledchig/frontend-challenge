export interface Cat {
  id: string;
  url: string;
  isLiked: boolean;
}

export const getCats = async (): Promise<Cat[]> => {
  try {
    const key = process.env.API_KEY;
    const url = process.env.API_URL;
    if (!key || !url) {
      throw new Error("API key or URL is missing.");
    }

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
