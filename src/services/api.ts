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

export interface AuthResponse {
  success: boolean;
  token?: string;
  message?: string;
}

class ApiService {
  private getAuthToken(): string | null {
    return localStorage.getItem('admin_token');
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
    const token = this.getAuthToken();
    const response = await fetch(`${API_BASE_URL}/coffees`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Failed to create coffee');
    }
    const data = await response.json();
    return data.data || data;
  }

  async updateCoffee(id: number, coffeeData: Partial<Coffee>): Promise<Coffee> {
    const response = await fetch(`${API_BASE_URL}/coffees/${id}`, {
      method: 'PUT',
      headers: this.getHeaders(true),
      body: JSON.stringify(coffeeData),
    });

    if (!response.ok) {
      throw new Error('Failed to update coffee');
    }
    const data = await response.json();
    return data.data || data;
  }

  async deleteCoffee(id: number): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/coffees/${id}`, {
      method: 'DELETE',
      headers: this.getHeaders(true),
    });

    if (!response.ok) {
      throw new Error('Failed to delete coffee');
    }
  }

  // Auth operations
  async login(username: string, password: string): Promise<AuthResponse> {
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();
    
    if (response.ok && data.token) {
      localStorage.setItem('admin_token', data.token);
      return { success: true, token: data.token };
    }

    return { success: false, message: data.message || 'Login failed' };
  }

  async register(username: string, password: string): Promise<AuthResponse> {
    const response = await fetch(`${API_BASE_URL}/register`, {
      method: 'POST',
      headers: this.getHeaders(),
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