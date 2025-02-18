import { create } from "zustand";

export const useProductStore = create((set) => ({
    products: [],
    setProducts: (products) => set({ products }),

    fetchProducts: async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            console.error("No token found. Redirecting to login.");
            window.location.href = "/login"; // Redirect to login
            return;
        }

        const res = await fetch("/api/products", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });

        const data = await res.json();
        set({ products: data.data });
    },

    fetchSeries1: async () => {
        const token = localStorage.getItem('token');
        if (!token) return;

        const res = await fetch("/api/products/series1", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });

        const data = await res.json();
        if (data.success) set({ products: data.data });
    },

    fetchSeries2: async () => {
        const token = localStorage.getItem('token');
        if (!token) return;

        const res = await fetch("/api/products/series2", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });

        const data = await res.json();
        if (data.success) set({ products: data.data });
    },

    fetchSeries3: async () => {
        const token = localStorage.getItem('token');
        if (!token) return;

        const res = await fetch("/api/products/series3", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });

        const data = await res.json();
        if (data.success) set({ products: data.data });
    },

    createProduct: async (newProduct) => {
        const token = localStorage.getItem('token');
        if (!token) return;

        if (!newProduct.name || !newProduct.image || !newProduct.price || !newProduct.series || !newProduct.description) {
            return { success: false, message: "Please fill in all fields." };
        }

        const res = await fetch("/api/products", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(newProduct),
        });

        const data = await res.json();
        if (!data.success) return { success: false, message: data.message };

        set((state) => ({ products: [...state.products, data.data] }));
        return { success: true, message: "Product created successfully" };
    },

    updateProduct: async (pid, updatedProduct) => {
        const token = localStorage.getItem('token');
        if (!token) return;

        const res = await fetch(`/api/products/${pid}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(updatedProduct),
        });

        const data = await res.json();
        if (!data.success) return { success: false, message: data.message };

        set((state) => ({
            products: state.products.map((product) => (product._id === pid ? data.data : product)),
        }));
        return { success: true, message: data.message };
    },

    deleteProduct: async (pid) => {
        const token = localStorage.getItem('token');
        if (!token) return;

        const res = await fetch(`/api/products/${pid}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        const data = await res.json();
        if (!data.success) return { success: false, message: data.message };

        set((state) => ({ products: state.products.filter((product) => product.id !== pid) }));
        return { success: true, message: data.message };
    },
}));