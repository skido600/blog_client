import React, { useState } from "react";
import { toast } from "sonner";
import MDEditor from "@uiw/react-md-editor";

const successToastStyle = {
  backgroundColor: "#48BB78",
  color: "white",
  border: "none",
};

const errorToastStyle = {
  backgroundColor: "#F56565",
  color: "white",
  border: "none",
};

export default function Admin() {
  const [formData, setFormData] = useState<{
    title: string;
    description: string;
    headerImage: File | null;
    articleImages: File[];
    imageCaption: string;
    featured: boolean;
  }>({
    title: "",
    description: "",
    headerImage: null,
    articleImages: [],
    imageCaption: "",
    featured: false,
  });

  const [fileInputKey, setFileInputKey] = useState<number>(Date.now());
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleHeaderImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData((prev) => ({ ...prev, headerImage: file }));
  };

  const handleArticleImagesChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newFiles: File[] = e.target.files ? Array.from(e.target.files) : [];
    if (newFiles.length === 0) return;

    setFormData((prev) => {
      const updatedImages = [...prev.articleImages, ...newFiles];
      const imageMarkdown = newFiles
        .map((file) => `![${file.name}](${URL.createObjectURL(file)})`)
        .join("\n\n");

      return {
        ...prev,
        articleImages: updatedImages,
        description: prev.description + "\n\n" + imageMarkdown,
      };
    });

    setFileInputKey(Date.now());
  };

  const removeArticleImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      articleImages: prev.articleImages.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const form = new FormData();
    form.append("title", formData.title);
    form.append("description", formData.description);
    form.append("Imagecaption", formData.imageCaption);
    form.append("featured", String(formData.featured));
    if (formData.headerImage) {
      form.append("HeaderImage", formData.headerImage);
    }

    formData.articleImages.forEach((file) => {
      form.append("articleImages", file);
    });
    const token = localStorage.getItem("token");
    console.log(token);
    try {
      const res = await fetch(
        "https://my-blog-z9ga.onrender.com/admin/create",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: form,
        }
      );

      const result = await res.json();

      if (!res.ok) throw new Error(result.message || "Failed to create post");

      toast.success("Post created successfully!", { style: successToastStyle });
      setFormData({
        title: "",
        description: "",
        headerImage: null,
        articleImages: [],
        imageCaption: "",
        featured: false,
      });
    } catch (err) {
      console.log(err);
      toast.error((err as Error).message || "Something went wrong", {
        style: errorToastStyle,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen   ">
      <div className="bg-white dark:bg-[#1b1b1b] rounded-lg border  dark:border-neutral-800 border-neutral-400 p-6">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
          Create Post
        </h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium dark:text-white text-gray-700 mb-1">
              Title*
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border  dark:border-neutral-800 outline-none focus:border-none border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 dark:text-white">
              Description*
            </label>
            <div className="bg-white rounded-md border border-gray-300 p-2">
              <MDEditor
                style={{ height: "300px", whiteSpace: "pre-wrap" }}
                value={formData.description}
                onChange={(value = "") =>
                  setFormData((prev) => ({ ...prev, description: value }))
                }
              />
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="featured"
              checked={formData.featured}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, featured: e.target.checked }))
              }
              className="w-4 h-4"
            />
            <label
              htmlFor="featured"
              className="text-sm dark:text-white text-gray-700">
              Feature this post
            </label>
          </div>

          <div>
            <label className="block text-sm dark:text-white font-medium text-gray-700 mb-1">
              Header Image*
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleHeaderImageChange}
              required
              className="block w-full dark:text-white text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:border file:rounded-md file:border-gray-300 file:text-sm file:font-semibold file:bg-gray-50 file:text-gray-700 hover:file:bg-gray-100"
            />
          </div>

          <div>
            <label className="block dark:text-white text-sm font-medium text-gray-700 mb-1">
              Article Images (Optional)
            </label>
            <input
              key={fileInputKey}
              type="file"
              accept="image/*"
              multiple
              onChange={handleArticleImagesChange}
              className="block w-full text-sm text-gray-500  dark:text-white dark:border-neutral-800 outline-none file:mr-4 file:py-2 file:px-4 file:border file:rounded-md file:border-gray-300 file:text-sm file:font-semibold file:bg-gray-50 file:text-gray-700 hover:file:bg-gray-100"
            />
            <ul className="mt-2 space-y-1">
              {formData.articleImages.map((file, index) => (
                <li
                  key={index}
                  className="flex items-center dark:text-white justify-between text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-md">
                  {file.name}
                  <button
                    type="button"
                    onClick={() => removeArticleImage(index)}
                    className="ml-2 text-red-500 hover:text-red-700 text-xs">
                    ✕
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <label className="block text-sm dark:text-white font-medium text-gray-700 mb-1">
              Image Caption
            </label>
            <input
              type="text"
              name="imageCaption"
              value={formData.imageCaption}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border dark:border-neutral-800 outline-none focus:border-none border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2 px-4 bg-[#213555] hover:bg-[#1a2f45] text-white font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
            {isLoading ? "Creating Post..." : "Create Post"}
          </button>
        </form>
      </div>
    </div>
  );
}
