import { useState, useRef } from "react";
import { Download, DownloadCloud, Twitter, Linkedin, Github } from "lucide-react";
import LandingPage from "../landing/LandingPage";
import { themeVariants } from "../../utils/theme";

export default function BuilderPreview({ form, onFormChange }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingFeature, setEditingFeature] = useState(null);
  const fileInputRef = useRef(null);

  // Available icons for features
  const availableIcons = [
    { id: "rocket", label: "Rocket", path: "M13.13 22.19L11.5 18.36C13.07 17.78 14.54 17 15.9 16.09L13.13 22.19M5.64 12.5L1.81 10.87L7.91 8.1C7 9.46 6.22 10.93 5.64 12.5M21.61 2.39C21.61 2.39 16.66 .269 11 5.93C8.81 8.12 7.5 10.53 6.65 12.64C6.37 13.39 6.56 14.21 7.11 14.77L9.24 16.89C9.79 17.45 10.61 17.63 11.36 17.35C13.5 16.53 15.88 15.19 18.07 13C23.73 7.34 21.61 2.39 21.61 2.39M14.54 9.46C13.76 8.68 13.76 7.41 14.54 6.63C15.32 5.85 16.59 5.85 17.37 6.63C18.14 7.41 18.15 8.68 17.37 9.46C16.59 10.24 15.32 10.24 14.54 9.46M8.88 16.53L7.47 15.12L8.88 16.53Z" },
    { id: "shield", label: "Shield", path: "M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z" },
    { id: "zap", label: "Lightning", path: "M13 2L3 14h9l-1 8 10-12h-9l1-8z" },
    { id: "star", label: "Star", path: "M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" },
    { id: "check", label: "Check", path: "M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" },
    { id: "code", label: "Code", path: "M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z" },
    { id: "globe", label: "Globe", path: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" },
    { id: "users", label: "Users", path: "M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5z" },
    { id: "lock", label: "Lock", path: "M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" },
    { id: "clock", label: "Clock", path: "M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z" }
  ];

  // Handle feature changes
  const handleFeatureChange = (index, field, value) => {
    const updatedFeatures = [...(form.features || [])].map((feature, i) => 
      i === index ? { ...feature, [field]: value } : feature
    );
    onFormChange("features", updatedFeatures);
  };

  // Toggle feature edit mode
  const toggleFeatureEdit = (index) => {
    setEditingFeature(editingFeature === index ? null : index);
  };

  // Add new feature
  const handleAddFeature = () => {
    const newFeatures = [...(form.features || []), { icon: "check", title: "", description: "" }];
    onFormChange("features", newFeatures);
  };

  // Remove feature
  const handleRemoveFeature = (index) => {
    const currentFeatures = form.features || [];
    const updatedFeatures = currentFeatures.filter((_, i) => i !== index);
    onFormChange("features", updatedFeatures);
  };

  // Handle HTML download
  const handleDownload = () => {
    const htmlContent = generateHTML(form);
    const blob = new Blob([htmlContent], { type: "text/html" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `${form.title.toLowerCase().replace(/\s/g, "-")}-landing.html`;
    a.click();

    URL.revokeObjectURL(url);
  };

  // Handle ZIP download
  const handleDownloadZip = async () => {
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/download", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${form.title.toLowerCase().replace(/\s/g, "-")}-landing.zip`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download error:", error);
      alert("Download failed 😢");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle deployment to Vercel
  const handleDeploy = async () => {
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/deploy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        throw new Error("Deployment failed");
      }

      const data = await res.json();
      window.open(data.url, "_blank");
    } catch (error) {
      console.error("Deployment error:", error);
      alert("Deployment failed 😢");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle logo upload
  const handleLogoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onFormChange("logo", reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Remove logo
  const handleRemoveLogo = () => {
    onFormChange("logo", null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="bg-white">
      {/* Header */}
      <div className="h-14 border-b flex items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-medium">Builder</h2>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleDownload}
            className="border border-gray-300 text-gray-700 px-3 py-1.5 rounded hover:bg-gray-50 transition text-sm flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            Download HTML
          </button>
          <button
            onClick={handleDownloadZip}
            className="border border-gray-300 text-gray-700 px-3 py-1.5 rounded hover:bg-gray-50 transition text-sm flex items-center gap-2"
            disabled={isSubmitting}
          >
            <DownloadCloud className="w-4 h-4" />
            Download ZIP
          </button>
          <button
            onClick={handleDeploy}
            className="bg-green-600 text-white px-3 py-1.5 rounded hover:bg-green-700 transition text-sm"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Deploying..." : "Deploy"}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex h-[calc(100vh-7rem)]">
        {/* Builder Panel */}
        <div className="w-96 border-r overflow-y-auto">
          <div className="p-4 space-y-4 pb-16">
            {/* Theme Selector */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Theme
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => onFormChange("theme", "light")}
                  className={`p-2 border rounded-lg flex items-center justify-center gap-2 ${
                    form.theme === "light" ? "border-indigo-500 bg-indigo-50" : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="w-4 h-4 rounded-full bg-white border border-gray-300" />
                  <span className="text-sm">Light</span>
                </button>
                <button
                  onClick={() => onFormChange("theme", "dark")}
                  className={`p-2 border rounded-lg flex items-center justify-center gap-2 ${
                    form.theme === "dark" ? "border-indigo-500 bg-indigo-50" : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="w-4 h-4 rounded-full bg-slate-900 border border-slate-700" />
                  <span className="text-sm">Dark</span>
                </button>
                <button
                  onClick={() => onFormChange("theme", "bold")}
                  className={`p-2 border rounded-lg flex items-center justify-center gap-2 ${
                    form.theme === "bold" ? "border-indigo-500 bg-indigo-50" : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="w-4 h-4 rounded-full bg-yellow-500 border border-yellow-600" />
                  <span className="text-sm">Bold</span>
                </button>
              </div>
            </div>

            {/* Logo Upload */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Logo
              </label>
              <div className="space-y-2">
                {form.logo ? (
                  <div className="relative group">
                    <img
                      src={form.logo}
                      alt="Logo preview"
                      className="w-auto max-h-[50px] object-contain border rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={handleRemoveLogo}
                      className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      aria-label="Remove logo"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                ) : (
                  <div
                    className="w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center cursor-pointer hover:border-indigo-500 transition"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <div className="text-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <p className="mt-1 text-sm text-gray-500">Click to upload</p>
                    </div>
                  </div>
                )}
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleLogoUpload}
                  accept="image/*"
                  className="hidden"
                />
                <p className="text-xs text-gray-500">
                  Recommended: Square image, max 512x512px
                </p>
              </div>
            </div>

            {/* Title */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Title <span className="text-red-500">*</span>
              </label>
              <input
                value={form.title}
                onChange={(e) => onFormChange("title", e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="Your Product Name"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                value={form.description}
                onChange={(e) => onFormChange("description", e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                rows="3"
                placeholder="A brief description of your product"
              />
            </div>

            {/* CTA Button */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Call to Action Button
              </label>
              <div className="grid grid-cols-2 gap-2">
                <input
                  value={form.ctaText}
                  onChange={(e) => onFormChange("ctaText", e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Button Text"
                />
                <input
                  value={form.ctaLink}
                  onChange={(e) => onFormChange("ctaLink", e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Button Link"
                />
              </div>
            </div>

            {/* Features */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Features
              </label>
              <div className="space-y-2">
                {form.features?.map((feature, index) => (
                  <div 
                    key={index} 
                    className={`border rounded-lg p-4 space-y-2 relative ${
                      !feature.title || !feature.description ? 'bg-yellow-50 border-yellow-200' : ''
                    }`}
                  >
                    <div 
                      className="flex items-center gap-2 cursor-pointer"
                      onClick={() => toggleFeatureEdit(index)}
                    >
                      <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center p-1">
                        <svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          className="h-6 w-6 text-gray-600"
                          viewBox="0 0 24 24" 
                          fill="currentColor"
                        >
                          <path d={availableIcons.find(icon => icon.id === feature.icon)?.path || ""} />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <div className="font-medium">{feature.title || "Untitled Feature"}</div>
                        {feature.description && (
                          <div className="text-sm text-gray-500 line-clamp-1">{feature.description}</div>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleRemoveFeature(index)}
                          className="p-1.5 rounded-full bg-red-100 text-red-600 hover:bg-red-200 transition"
                          aria-label="Remove feature"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                        <button
                          onClick={() => toggleFeatureEdit(index)}
                          className={`p-1.5 rounded-full ${
                            editingFeature === index ? "bg-yellow-100 text-yellow-600" : "bg-gray-100 text-gray-600"
                          } hover:bg-yellow-200 transition`}
                          aria-label="Edit feature"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>
                      </div>
                    </div>
                    {editingFeature === index && (
                      <div className="space-y-2 pt-2">
                        <select
                          value={feature.icon}
                          onChange={(e) => handleFeatureChange(index, "icon", e.target.value)}
                          className="w-full px-2 py-1 border rounded"
                        >
                          {availableIcons.map((icon) => (
                            <option key={icon.id} value={icon.id}>
                              {icon.label}
                            </option>
                          ))}
                        </select>
                        <input
                          type="text"
                          value={feature.title}
                          onChange={(e) => handleFeatureChange(index, "title", e.target.value)}
                          placeholder="Feature title"
                          className="w-full px-2 py-1 border rounded"
                        />
                        <textarea
                          value={feature.description}
                          onChange={(e) => handleFeatureChange(index, "description", e.target.value)}
                          placeholder="Feature description"
                          className="w-full px-2 py-1 border rounded"
                          rows="2"
                        />
                      </div>
                    )}
                  </div>
                ))}
                <button
                  onClick={handleAddFeature}
                  className="w-full border-2 border-dashed border-gray-300 rounded-lg p-4 text-gray-500 hover:border-gray-400 hover:text-gray-600 transition"
                >
                  + Add Feature
                </button>
              </div>
            </div>

            {/* Social Links */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Social Links
              </label>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Twitter className="w-5 h-5 text-[#1DA1F2]" />
                  <div className="flex-1 flex items-center gap-1 bg-gray-50 border rounded-lg px-3 py-2">
                    <span className="text-gray-400 text-sm">@</span>
                    <input
                      type="text"
                      value={form.twitter?.replace('https://twitter.com/', '') || ''}
                      onChange={(e) => onFormChange("twitter", e.target.value ? `https://twitter.com/${e.target.value}` : '')}
                      placeholder="username"
                      className="flex-1 bg-transparent text-sm focus:outline-none"
                    />
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Linkedin className="w-5 h-5 text-[#0A66C2]" />
                  <div className="flex-1 flex items-center gap-1 bg-gray-50 border rounded-lg px-3 py-2">
                    <span className="text-gray-400 text-sm">in/</span>
                    <input
                      type="text"
                      value={form.linkedin?.replace('https://linkedin.com/in/', '') || ''}
                      onChange={(e) => onFormChange("linkedin", e.target.value ? `https://linkedin.com/in/${e.target.value}` : '')}
                      placeholder="username"
                      className="flex-1 bg-transparent text-sm focus:outline-none"
                    />
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Github className="w-5 h-5 text-gray-900" />
                  <div className="flex-1 flex items-center gap-1 bg-gray-50 border rounded-lg px-3 py-2">
                    <span className="text-gray-400 text-sm">github.com/</span>
                    <input
                      type="text"
                      value={form.github?.replace('https://github.com/', '') || ''}
                      onChange={(e) => onFormChange("github", e.target.value ? `https://github.com/${e.target.value}` : '')}
                      placeholder="username"
                      className="flex-1 bg-transparent text-sm focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Preview */}
        <div className="flex-1 overflow-auto p-4">
          <div className="rounded-lg border shadow-lg overflow-hidden flex flex-col relative">
            {/* Browser Chrome */}
            <div className="h-10 border-b flex items-center px-4 gap-2 bg-gradient-to-r from-gray-50 to-gray-100 flex-shrink-0">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500 shadow-sm" />
                <div className="w-3 h-3 rounded-full bg-yellow-500 shadow-sm" />
                <div className="w-3 h-3 rounded-full bg-green-500 shadow-sm" />
              </div>
              <div className="flex-1 flex items-center justify-center">
                <div className="flex items-center gap-2 bg-white/50 backdrop-blur-sm px-4 py-1.5 rounded-full shadow-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a5 5 0 1110 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
                  </svg>
                  <span className="text-sm text-gray-600 font-medium">
                    {form.title || "Preview"}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="p-1 rounded-full hover:bg-white/50 transition">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-5h-4m4 0v4m0-4l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5h-4m4 0v-4m0 4l-5-5" />
                  </svg>
                </button>
                <button className="p-1 rounded-full hover:bg-white/50 transition">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </button>
              </div>
            </div>
            {/* Preview Content */}
            <div className="flex-1 overflow-auto relative">
              <div className="w-full">
                <LandingPage form={form} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}