"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Pencil, Trash, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const DashboardPage = () => {
  const [data, setData] = useState<any[]>([]);
  const [error, setError] = useState("");
  const [mounted, setMounted] = useState(false);
  const [contacts, setContacts] = useState<any[]>([]);
  const [loadingContacts, setLoadingContacts] = useState(true);

  const router = useRouter();

  // Logout Function
  const handleLogout = async () => {
    try {
      await axios.post("/api/auth/logout");
      router.push("/private/auth/login"); // Redirect after logout
    } catch (err) {
      alert("Logout failed");
    }
  };

  // Fetch Forum Data
  const fetchProjects = async () => {
    try {
      const response = await axios.get("/api/auth/forum");
      setData(response.data.data || []);
    } catch (error: any) {
      setError(error.message || "Failed to fetch data");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`/api/auth/forum?id=${id}`);
      await fetchProjects();
    } catch (error: any) {
      alert("Failed to delete project: " + (error.message || "Unknown error"));
    }
  };

  const projectUpdate = async (id: string) => {
    try {
      await axios.put(`/api/auth/forum?id=${id}`);
      await fetchProjects();
    } catch (error: any) {
      alert("Failed to update project: " + (error.message || "Unknown error"));
    }
  };

  const fetchContactDetails = async () => {
    try {
      const res = await axios.get("/api/auth/contact");
      setContacts(res.data.data || []);
    } catch (err) {
      console.error("Failed to fetch contact details");
    } finally {
      setLoadingContacts(false);
    }
  };

  const handleDeleteContact = async (id: string) => {
    try {
      await axios.delete(`/api/auth/contact/${id}`);
      await fetchContactDetails();
    } catch (err) {
      alert("Failed to delete contact.");
    }
  };

  useEffect(() => {
  const checkAuth = async () => {
    try {
      const res = await axios.get("/api/auth/check-session");
      if (res.status !== 200 || !res.data.authenticated) {
        router.push("/private/auth/login");
      } else {
        setMounted(true);
        fetchProjects();
        fetchContactDetails();
      }
    } catch {
      router.push("/private/auth/login"); // Redirect if any error
    }
  };

  checkAuth();
}, []);


  if (!mounted) return null;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="py-24 px-4">
      {/* Logout Button */}
      <div className="flex justify-end mb-6">
        <Button variant="destructive" onClick={handleLogout} className="flex items-center gap-2">
          <LogOut className="h-4 w-4" />
          Logout
        </Button>
      </div>

      <h1 className="text-3xl font-bold mb-6 text-center">All Projects</h1>

      {data.length === 0 ? (
        <p className="text-center text-gray-500">No project data found.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {data.map((item) => (
            <div
              key={item._id}
              className="border relative group p-4 rounded-xl shadow-lg bg-white dark:bg-gray-900"
            >
              <div className="absolute top-2 right-2 flex gap-2">
                <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => projectUpdate(item._id)}>
                  <Pencil className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => handleDelete(item._id)}>
                  <Trash className="w-4 h-4 text-red-500" />
                </Button>
              </div>

              <h2 className="text-xl font-semibold mb-2">{item.title}</h2>
              <p className="text-sm mb-2 text-gray-700 dark:text-gray-300">{item.description}</p>
              <p className="text-sm text-gray-600 mb-2">
                Tech Stack: {item.techStack.join(", ")}
              </p>

              <div className="mt-4 relative w-full">
                <img src={item.image} alt={item.title} className="rounded-md max-w-xs ml-auto hidden group-hover:block" />
              </div>
            </div>
          ))}
        </div>
      )}

      <br />
      <div>
        <h1 className="text-center text-2xl font-bold my-6">Contact Us Submissions</h1>
        {loadingContacts ? (
          <p className="text-center text-gray-400">Loading contact details...</p>
        ) : contacts.length === 0 ? (
          <p className="text-center text-gray-500">No contact submissions found.</p>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {contacts.map((contact) => (
              <div
                key={contact._id}
                className="border p-4 rounded-xl shadow-md bg-white dark:bg-gray-800 relative"
              >
                <Button
                  size="icon"
                  variant="destructive"
                  className="absolute top-2 right-2 h-8 w-8"
                  onClick={() => handleDeleteContact(contact._id)}
                >
                  <Trash className="w-4 h-4" />
                </Button>
                <h2 className="text-lg font-bold">{contact.name}</h2>
                <p className="text-sm text-gray-500">{contact.email}</p>
                <p className="mt-2 text-gray-600 dark:text-gray-300">{contact.message}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;