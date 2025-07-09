const API_BASE_URL = 'http://localhost:8080/api';

export interface Coffee {
  id: number;
  name: string;
  description: string;
  price: number;
  image_url?: string;
  category?: string;
  created_at?: string;
  ingredients?: string[];
  caffeine?: string;
}

export interface Food {
  id: number;
  name: string;
  description: string;
  price: number;
  image_url?: string;
  category?: string;
  created_at?: string;
}

export interface AuthResponse {
  success: boolean;
  token?: string;
  message?: string;
}

class ApiService {
  private getAuthToken(): string | null {
    return localStorage.getItem('admin_token');
  }

  private getAuthHeaders(): HeadersInit {
    const headers: HeadersInit = {};
    const token = this.getAuthToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    return headers;
  }

  private getHeaders(includeAuth = false): HeadersInit {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    if (includeAuth) {
      const token = this.getAuthToken();
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
    }

    return headers;
  }

  // Coffee CRUD operations
  async getCoffees(): Promise<Coffee[]> {
    const response = await fetch(`${API_BASE_URL}/coffees`);
    if (!response.ok) {
      throw new Error('Failed to fetch coffees');
    }
    const data = await response.json();
    return data.data || data; // Handle different response structures
  }

  async getCoffeeById(id: number): Promise<Coffee> {
    const response = await fetch(`${API_BASE_URL}/coffees/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch coffee');
    }
    const data = await response.json();
    return data.data || data;
  }

  async createCoffee(formData: FormData): Promise<Coffee> {
    const response = await fetch(`${API_BASE_URL}/coffees`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: formData,
    });
    if (!response.ok) throw new Error('Failed to create coffee');
    const data = await response.json();
    return data.data || data;
  }

  async updateCoffee(id: number, formData: FormData): Promise<Coffee> {
    // Add _method: 'PUT' for method spoofing
    formData.append('_method', 'PUT'); 
    
    const response = await fetch(`${API_BASE_URL}/coffees/${id}`, {
      method: 'POST', // Method must be POST to send form-data
      headers: this.getAuthHeaders(),
      body: formData,
    });
    if (!response.ok) throw new Error('Failed to update coffee');
    const data = await response.json();
    return data.data || data;
  }

  async deleteCoffee(id: number): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/coffees/${id}`, {
      method: 'DELETE',
      headers: this.getAuthHeaders(),
    });
    if (!response.ok) throw new Error('Failed to delete coffee');
  }

  // --- Food CRUD operations ---

  async getFoods(): Promise<Food[]> {
    const response = await fetch(`${API_BASE_URL}/foods`);
    if (!response.ok) throw new Error('Failed to fetch foods');
    const data = await response.json();
    return data.data || data;
  }

  async getFoodById(id: number): Promise<Food> {
    const response = await fetch(`${API_BASE_URL}/foods/${id}`);
    if (!response.ok) throw new Error('Failed to fetch food');
    const data = await response.json();
    return data.data || data;
  }

  async createFood(formData: FormData): Promise<Food> {
    const response = await fetch(`${API_BASE_URL}/foods`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: formData,
    });
    if (!response.ok) throw new Error('Failed to create food');
    const data = await response.json();
    return data.data || data;
  }

  async updateFood(id: number, formData: FormData): Promise<Food> {
    formData.append('_method', 'PUT');
    const response = await fetch(`${API_BASE_URL}/foods/${id}`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: formData,
    });
    if (!response.ok) throw new Error('Failed to update food');
    const data = await response.json();
    return data.data || data;
  }

  async deleteFood(id: number): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/foods/${id}`, {
      method: 'DELETE',
      headers: this.getAuthHeaders(),
    });
    if (!response.ok) throw new Error('Failed to delete food');
  }

  // Auth operations
  async login(username: string, password: string): Promise<AuthResponse> {
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
    const data = await response.json();
    if (response.ok && data.access_token) {
      localStorage.setItem('admin_token', data.access_token);
      return { success: true, token: data.access_token };
    }
    return { success: false, message: data.message || 'Login failed' };
  }

  async register(username: string, password: string): Promise<AuthResponse> {
    const response = await fetch(`${API_BASE_URL}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
    const data = await response.json();
    return { success: response.ok, message: data.message };
  }

  logout(): void {
    localStorage.removeItem('admin_token');
  }

  isAuthenticated(): boolean {
    return !!this.getAuthToken();
  }
}

export const apiService = new ApiService();