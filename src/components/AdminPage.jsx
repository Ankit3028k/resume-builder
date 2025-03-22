import React, { useState } from "react";
import Resume from "./Resume";

const AdminPage = () => {
  const [resumeData, setResumeData] = useState({
    name: "Ankit Gangrade",
    email: "ankit@example.com",
    mobile: "+91 1234567890",
    linkedin: "https://www.linkedin.com/in/ankit-gangrade",
    portfolio: "https://ankit-portfolio.com",
    summary: "Motivated and skilled Frontend Developer with a passion for building responsive and user-friendly websites.",
    technicalskill: {
      frontend: "HTML5, CSS3, JavaScript, React",
      backend: "Node.js, Express",
      tools: "Git, Docker, Webpack"
    },
    WorkExperience: [
      {
        title: "Frontend Developer Intern",
        company: "Integration IT Services",
        location: "Bhopal, India",
        dates: "June 2023 - August 2023",
        responsibilities: [
          "Developed responsive web pages using React.js",
          "Collaborated with designers to implement UI/UX improvements",
          "Worked with backend team to integrate RESTful APIs"
        ]
      }
    ],
    Projects: [
      {
        name: "ICJ24 Website Development",
        type: "Freelance",
        details: [
          "Developed a full-stack web application with React and Node.js",
          "Implemented authentication and authorization using JWT",
          "Deployed the app on AWS"
        ]
      }
    ],
    Education: [{
      degree: "Bachelor of Computer Science Engineering",
      institution: "Prestige Institute of Management and Research",
      graduationYear: "2024"
    }],
    Certifications: [{ Certification: "MERN Stack Development Training - CRISP, 2024" }],
    ExtracurricularInvolvement: {
      role: "Website Development Team Member",
      organization: "Prestige Institute",
      dates: "2019 - 2023"
    },
    Declaretion: "I hereby declare that the above information is true and correct to the best of my knowledge and belief."
  });

  const handleChange = (e, section, index, subKey) => {
    const { name, value } = e.target;
    setResumeData(prevData => {
      if (section && index !== undefined) {
        const updatedSection = [...prevData[section]];
        updatedSection[index] = { ...updatedSection[index], [subKey]: value };
        return { ...prevData, [section]: updatedSection };
      } else if (section) {
        return { ...prevData, [section]: { ...prevData[section], [subKey]: value } };
      }
      return { ...prevData, [name]: value };
    });
  };

  const handleSave = (e) => {
    e.preventDefault();
    alert("Resume saved successfully!");
  };

  const addNewItem = (section) => {
    let newItem = {};
    if (section === "WorkExperience") {
      newItem = { title: "", company: "", location: "", dates: "", responsibilities: [""] };
    } else if (section === "Projects") {
      newItem = { name: "", type: "", details: [""] };
    } else if (section === "Education") {
      newItem = { degree: "", institution: "", graduationYear: "" };
    } else if (section === "Certifications") {
      newItem = { Certification: "" };
    }
    setResumeData(prevData => ({
      ...prevData,
      [section]: [...prevData[section], newItem]
    }));
  };

  const removeItem = (section, index) => {
    setResumeData(prevData => ({
      ...prevData,
      [section]: prevData[section].filter((_, i) => i !== index)
    }));
  };

  return (
    <div className="admin-page">
      <h1>Admin Page</h1>
      <form onSubmit={handleSave} className="resume-form">
        {Object.entries(resumeData).map(([key, value]) => {
          if (typeof value === "object" && !Array.isArray(value) && key !== "technicalskill" && key !== "ExtracurricularInvolvement") {
            return null; // Handled separately
          }
          if (key === "technicalskill" || key === "ExtracurricularInvolvement") {
            return (
              <div key={key}>
                <h3>{key.charAt(0).toUpperCase() + key.slice(1)}</h3>
                {Object.entries(value).map(([subKey, subValue]) => (
                  <div key={subKey}>
                    <label>{subKey}: </label>
                    <input
                      type="text"
                      name={`${key}.${subKey}`}
                      value={subValue}
                      onChange={(e) => handleChange(e, key, undefined, subKey)}
                      required
                    />
                  </div>
                ))}
              </div>
            );
          }
          if (Array.isArray(value)) {
            return (
              <div key={key}>
                <h3>{key.charAt(0).toUpperCase() + key.slice(0, -1)}</h3>
                {value.map((item, index) => (
                  <div key={index}>
                    {Object.entries(item).map(([subKey, subValue]) => (
                      <div key={subKey}>
                        <label>{subKey}: </label>
                        <input
                          type="text"
                          name={`${key}[${index}].${subKey}`}
                          value={subValue}
                          onChange={(e) => handleChange(e, key, index, subKey)}
                          required
                        />
                      </div>
                    ))}
                    <button type="button" onClick={() => removeItem(key, index)}>
                      Remove {key.slice(0, -1)} {index + 1}
                    </button>
                  </div>
                ))}
                <button type="button" onClick={() => addNewItem(key)}>
                  Add New {key.slice(0, -1)}
                </button>
              </div>
            );
          }
          return (
            <div key={key}>
              <label>{key.charAt(0).toUpperCase() + key.slice(1)}: </label>
              <input
                type="text"
                name={key}
                value={value}
                onChange={handleChange}
                required
              />
            </div>
          );
        })}
        <button type="submit" className="save-button">Save Changes</button>
      </form>
      <h2>Resume Preview</h2>
      <Resume resumeData={resumeData} />
    </div>
  );
};

export default AdminPage;