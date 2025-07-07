"use client"
import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import ProjectDetailModal from "@/components/ui/ProjectDetailModal"; 

const WorkPage = () => {
  const [data, setData] = useState<any[]>([]);
  const [error, setError] = useState("");
  const [mounted, setMounted] = useState(false);
  const [selectedProject, setSelectedProject] = useState<any>(null); 
  
  useEffect(() => {
    setMounted(true);
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/auth/forum");
        setData(response.data.data);
      } catch (error: any) {
        setError(error.message || "Failed to fetch data");
      }
    };
    fetchData();
  }, []);

  if (!mounted) return null;
  if (error) return <div>Error: {error}</div>;
  if (!data || data.length === 0) return <div>No Projects Found</div>;

  return (
    <>
      {/* Modal Render */}
      <ProjectDetailModal
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
        project={selectedProject}
      />

      {/* Project Cards */}
      <div className="py-24 px-4 max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-center">My Work</h1>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {data.map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.02 }}
              className="p-4 flex flex-col justify-between rounded-xl dark:bg-neutral-900 shadow-md hover:shadow-lg cursor-pointer"
            >
              <img
                src={item.image}
                alt={item.title}
                className="h-60 w-full object-cover rounded-lg mb-4"
              />
              <div className="flex-1">
                <h2 className="text-xl font-semibold">{item.title}</h2>
                <p className="text-sm mb-2">
                  {item.description.length > 100
                    ? item.description.slice(0, 100) + "..."
                    : item.description}
                </p>
                <p className="text-xs text-muted-foreground mb-4">
                  Tech Stack: {item.techStack?.join(", ")}
                </p>
              </div>
              <Button
                className="w-full mt-auto"
                onClick={() => setSelectedProject(item)}
              >
                Know More
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </>
  );
};

export default WorkPage;
