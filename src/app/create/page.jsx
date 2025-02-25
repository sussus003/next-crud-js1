"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

function CreatePostPage() {
  const [title, setTitle] = useState("");
  const [img, setImg] = useState("");
  const [content, setContent] = useState("");

  const router = useRouter();

  const handleSubmit = async(e) => {
    e.preventDefault();
    if (!title || !img || !content) {
      alert("Please complete all inputs");
      return;
    }
    try {
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        //
        body: JSON.stringify({ title, img, content }),
      });

      if (res.ok) {
        router.push("/");
      } else {
        throw new Error("Failed to create a post");
      }
    } catch (err) {
      console.log(err);
    }
    
  };

  return (
    <div className="container mx-auto p-4 my-4">
      <h3 className="text-3xl font-bold">Create Post</h3>
      <hr className="ny-3" />
      <Link
        href="/"
        className="bg-gray-500 inline-block text-white border p-3 rounded my-2"
      >
        Go Back
      </Link>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="w-[300px] block bg-gray-200 border py-2 px-3 rounded text-lg my-2"
          placeholder="Post Title"
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          className="w-[300px] block bg-gray-200 border py-2 px-3 rounded text-lg my-2"
          placeholder="Post Img Url"
          onChange={(e) => setImg(e.target.value)}
        />
        <textarea
          name=""
          id=""
          className="w-[300px] block bg-gray-200 border py-2 px-3 rounded text-lg my-2"
          placeholder="Enter Your Content"
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        <button
          type="submit"
          className="bg-green-400 text-white border py-2 px-3 rounded-lg text-lg"
        >
          Create Post
        </button>
      </form>
    </div>
  );
}

export default CreatePostPage;
