import { useState } from "react";
import { useRouter } from "next/router";
import Header from "../components/Header";
import BuilderPreview from "../components/builder/BuilderPreview";
import { themes } from "../utils/theme";

export default function Generator() {
  const router = useRouter();

  // Form state
  const [form, setForm] = useState({
    title: "",
    description: "",
    features: [
      { icon: "check", title: "", description: "" },
      { icon: "check", title: "", description: "" },
      { icon: "check", title: "", description: "" }
    ],
    twitter: "",
    linkedin: "",
    github: "",
    theme: "light",
    ctaText: "Get Started",
    ctaLink: "#",
  });

  // Handle form changes
  const handleFormChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  // Handle close
  const handleClose = () => {
    router.push("/");
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-gray-100 text-gray-900">
      <Header />
      <BuilderPreview
        form={form}
        onFormChange={handleFormChange}
        onClose={handleClose}
      />
    </main>
  );
}