"use client"; // Mark as a Client Component for consistent rendering

import React from 'react';

const AboutPage = () => {
    return (
        <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 font-inter">
            {/* Container for the entire page content */}
            <div className="max-w-7xl mx-auto">
                {/* ABOUT ME Section */}
                <section className="mb-20">
                    <h1 className="text-2xl sm:text-5xl lg:text-6xl font-extrabold mb-8 flex items-center">
                        ABOUT ME
                        <span className="ml-4 h-1 w-24  rounded-full"></span>
                    </h1>
                    <p className="text-lg sm:text-l leading-relaxed max-w-3xl">
                        Hi, I'm Bhagyashwariya Panda, a passionate and detail-oriented Full Stack Developer with a relentless drive for solving problems and building efficient, modern web applications.

                        Coding isn’t just my job — it’s my core passion. I dedicate my time to improving my skills, understanding systems deeply, and creating powerful applications that serve real-world needs. Whether it's writing scalable backend logic, crafting seamless user interfaces, or debugging complex issues, I thrive in the process of turning ideas into working software.

                        I specialize in technologies like Next.js, React, Node.js, and MongoDB, and I'm always pushing myself to explore better architectures, cleaner code, and smarter solutions. No distractions, no split focus — just one goal: to build and solve through code.
                    </p>
                </section>

                {/* Decorative Swirl Line (Placeholder) */}
                {/* You can replace this with an SVG or a more complex CSS animation later */}
                {/* <div className="flex justify-center my-16">
          <svg className="w-55 h-auto opacity-70" viewBox="0 0 200 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 50 C 40 10, 80 90, 100 50 S 160 10, 190 50" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div> */}

                {/* What I Do Section */}
                <section className="flex flex-col items-start lg:items-end text-left lg:text-right">
                    <h2 className="text-2xl sm:text-5xl lg:text-6xl font-extrabold mb-8 flex items-center lg:flex-row-reverse">
                        What I Do
                        <span className="mr-4 lg:ml-4 h-1 w-24 rounded-full"></span>
                    </h2>
                    <p className="text-lg sm:text-l leading-relaxed max-w-3xl mb-7">
                        I build clean, responsive full-stack web apps and craft modern, user-friendly designs that align with your brand’s vision. From scalable backend systems to intuitive UIs and eye-catching graphics, I turn ideas into powerful digital experiences — fast, functional, and visually compelling.
                    </p>
                </section>
            </div>
        </div>
    );
};

export default AboutPage;