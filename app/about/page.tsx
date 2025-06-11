import React from "react";

export default function About() {
  return (
    <div className="bg-gray-800 mx-auto max-w-3xl space-y-10 rounded-xl p-8 pb-32 text-white shadow-lg">
      <h1 className="text-3xl font-bold">About OrthoScrewSearch</h1>

      <p>
        <strong>OrthoScrewSearch</strong> is a specialized image recognition tool designed to identify and search for orthopedic screws using AI-powered techniques.
        Built for the healthcare domain, especially orthopedic professionals, this system simplifies the process of recognizing and comparing surgical screw images using machine learning.
      </p>
      <p>
        This project addresses the challenges clinicians and researchers face in visually matching orthopedic screw types across a wide variety of radiographic images. 
        Existing tools often require manual reference or deep learning expertise, which can be time-consuming and error-prone.
      </p>
      <p>
        OrthoScrewSearch streamlines this process with an intuitive UI and deep learning backend that allows users to upload X-ray or screw images and instantly retrieve visually similar items from a curated dataset. 
        It enhances diagnostic accuracy and speeds up clinical workflows in orthopedic imaging.
      </p>

      <p>
        The project originated under the <strong>Open-Source Software Centre</strong> at SLU, led by Julian, with developers Ramez, Mustafa, Megh, and Karthik contributing to its success.
        Our goal is to deliver a domain-specific, scalable, and intelligent system tailored for orthopedic image retrieval and analysis.
      </p>

      <h2 className="text-2xl font-semibold">Meet the Team</h2>
      <ul className="list-disc list-inside space-y-2">
        <li>
          <strong>Julian Shniter</strong> – Team Lead & Developer
          <br />
          <a className="text-blue-400 hover:underline" href="https://github.com/smallrussian" target="_blank">GitHub</a> | <a className="text-blue-400 hover:underline" href="https://www.linkedin.com/in/julian-shniter-9576401a1/" target="_blank">LinkedIn</a>
        </li>
        <li>
          <strong>Ramez Mosad</strong> – Developer
          <br />
          <a className="text-blue-400 hover:underline" href="https://github.com/ramezmosad" target="_blank">GitHub</a>
        </li>
        <li>
          <strong>Mustafa Hashmi</strong> – Developer
          <br />
          <a className="text-blue-400 hover:underline" href="https://github.com/mhashm1" target="_blank">GitHub</a> | <a className="text-blue-400 hover:underline" href="https://www.linkedin.com/in/mustafa-hashmi02/" target="_blank">LinkedIn</a>
        </li>
        <li>
          <strong>Megh Patel</strong> – Developer
          <br />
          <a className="text-blue-400 hover:underline" href="https://github.com/MeghPatel6" target="_blank">GitHub</a> | <a className="text-blue-400 hover:underline" href="https://www.linkedin.com/in/megh-patel-741068233/" target="_blank">LinkedIn</a>
        </li>
        <li>
          <strong>Karthik Mangineni</strong> – UI/UX Developer
          <br />
          <a className="text-blue-400 hover:underline" href="https://github.com/rcAsironman" target="_blank">GitHub</a> | <a className="text-blue-400 hover:underline" href="https://www.linkedin.com/in/karthikfullstackdeveloper/" target="_blank">LinkedIn</a>
        </li>
      </ul>

      <h2 className="text-2xl font-semibold">Tech Stack</h2>
      <ul className="list-disc list-inside space-y-2">
        <li><strong>Next.js</strong> – Frontend framework for server-rendered React apps.</li>
        <li><strong>React</strong> – Component-based UI library.</li>
        <li><strong>TailwindCSS</strong> – Utility-first CSS framework for styling.</li>
        <li><strong>Python</strong> – Backend development and scripting.</li>
        <li><strong>TensorFlow / PyTorch</strong> – Machine learning frameworks for model integration.</li>
        <li><strong>Docker</strong> – Containerization for consistent deployment.</li>
      </ul>

      <h2 className="text-2xl font-semibold">Features</h2>
      <ul className="list-disc list-inside space-y-2">
        <li>AI-based recognition of orthopedic screw types from images.</li>
        <li>Search engine for retrieving visually similar screws.</li>
        <li>Scalable and modular architecture.</li>
        <li>Clean UI/UX focused on medical usability.</li>
        <li>Support for multiple image formats and mobile access.</li>
      </ul>

      <h2 className="text-2xl font-semibold">License</h2>
      <p>
        This software is licensed under the <strong>XYZ License</strong>. All rights reserved.
      </p>
    </div>
  );
}