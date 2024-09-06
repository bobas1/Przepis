import axios from 'axios';

export class RecepieSearchClient {
    constructor() {
        this.baseUrl = "https://api.edamam.com/api/recipes/v2";
        this.apiId = "109ff6bb"
        // this.apiId = `${process.env.NEXT_PUBLIC_API_ID}`;
        this.apiKey = "b5f751458ae6e9fee62c2aec731f36aa";
        // this.apiKey = `${process.env.NEXT_PUBLIC_API_KEY}`;

        this.nextPageUrl = null;
    }

    #buildUrl(query) {
        const queryParams = {
            type: 'public',
            q: query || '',
            app_id: this.apiId,
            app_key: this.apiKey,
            cuisineType: 'French'
        };

        const url = new URL(this.baseUrl);
        url.search = new URLSearchParams(queryParams).toString();
        return url.toString();
    }

    async getRecipes(query) {
        try {
            const url = this.#buildUrl(query);
            const response = await axios.get(url);
            const data = response.data;

            this.finalPage = data.to;
            this.nextPageUrl = data._links.next ? data._links.next.href : null;

            return data.hits.map((hit) => hit.recipe);
        } catch (error) {
            console.error("Error fetching recipes:", error);
            throw error;
        }
    }

    async getNextPage() {
        if (!this.nextPageUrl) {
            return [];
        }

        try {
            const response = await axios.get(this.nextPageUrl);
            const data = response.data;

            this.nextPageUrl = data._links.next ? data._links.next.href : null;

            return data.hits.map((hit) => hit.recipe);
        } catch (error) {
            console.error("Error fetching next page of recipes:", error);
            throw error;
        }
    }
}