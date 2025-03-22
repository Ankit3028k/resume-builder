import React from "react";
import { jsPDF } from "jspdf";

const Resume = ({ resumeData }) => {
  if (!resumeData) {
    return <div>Loading...</div>;
  }

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.setFont("helvetica", "normal");

    let y = 10;

    // Header
    doc.setFontSize(20);
    doc.setFont("helvetica", "bold");
    doc.text(resumeData.name || "N/A", 10, y);
    y += 10;
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text(`Email: ${resumeData.email || "N/A"} | Mobile: ${resumeData.mobile || "N/A"}`, 10, y);
    y += 5;
    doc.text(`LinkedIn: ${resumeData.linkedin || "N/A"} | Portfolio: ${resumeData.portfolio || "N/A"}`, 10, y);
    y += 10;

    // Section Divider
    doc.setLineWidth(0.5);
    doc.line(10, y, 200, y);
    y += 10;

    // Summary
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("Summary", 10, y);
    y += 6;
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text(resumeData.summary || "N/A", 10, y, { maxWidth: 190 });
    y += 20;

    // Technical Skills
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("Technical Skills", 10, y);
    y += 6;
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text(`Frontend: ${resumeData.technicalskill?.frontend || "N/A"}`, 10, y);
    y += 5;
    doc.text(`Backend: ${resumeData.technicalskill?.backend || "N/A"}`, 10, y);
    y += 5;
    doc.text(`Tools: ${resumeData.technicalskill?.tools || "N/A"}`, 10, y);
    y += 15;

    // Work Experience
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("Work Experience", 10, y);
    y += 6;
    resumeData.WorkExperience?.forEach((exp) => {
      doc.setFontSize(10);
      doc.setFont("helvetica", "bold");
      doc.text(`${exp.title} - ${exp.company} (${exp.dates})`, 10, y);
      y += 5;
      doc.setFont("helvetica", "normal");
      exp.responsibilities.forEach((resp) => {
        doc.text(`• ${resp}`, 15, y);
        y += 5;
      });
      y += 5;
    });

    // Projects
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("Projects", 10, y);
    y += 6;
    resumeData.Projects?.forEach((proj) => {
      doc.setFontSize(10);
      doc.setFont("helvetica", "bold");
      doc.text(`${proj.name} (${proj.type})`, 10, y);
      y += 5;
      doc.setFont("helvetica", "normal");
      proj.details.forEach((detail) => {
        doc.text(`• ${detail}`, 15, y);
        y += 5;
      });
      y += 5;
    });

    // Education
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("Education", 10, y);
    y += 6;
    resumeData.Education?.forEach((edu) => {
      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      doc.text(`${edu.degree} - ${edu.institution} (${edu.graduationYear})`, 10, y);
      y += 10;
    });

    // Certifications
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("Certifications", 10, y);
    y += 6;
    resumeData.Certifications?.forEach((cert) => {
      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      doc.text(`• ${cert.Certification}`, 10, y);
      y += 5;
    });
    y += 10;

    // Extracurricular Involvement
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("Extracurricular Involvement", 10, y);
    y += 6;
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text(`${resumeData.ExtracurricularInvolvement?.role || "N/A"} - ${resumeData.ExtracurricularInvolvement?.organization || "N/A"} (${resumeData.ExtracurricularInvolvement?.dates || "N/A"})`, 10, y);
    y += 15;

    // Declaration
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("Declaration", 10, y);
    y += 6;
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text(resumeData.Declaretion || "N/A", 10, y, { maxWidth: 190 });

    doc.save(`Resume-${resumeData.name || "Unknown"}.pdf`);
  };

  return (
    <div className="resume-container">
      <h1>{resumeData.name || "Name Not Available"}</h1>
      <p>Email: {resumeData.email || "N/A"}</p>
      <p>Mobile: {resumeData.mobile || "N/A"}</p>
      <p>LinkedIn: <a href={resumeData.linkedin || "#"}>{resumeData.linkedin || "N/A"}</a></p>
      <p>Portfolio: <a href={resumeData.portfolio || "#"}>{resumeData.portfolio || "N/A"}</a></p>
      
      <h2>Summary</h2>
      <p>{resumeData.summary || "Summary not available"}</p>

      <h3>Technical Skills</h3>
      <p>Frontend: {resumeData.technicalskill?.frontend || "N/A"}</p>
      <p>Backend: {resumeData.technicalskill?.backend || "N/A"}</p>
      <p>Tools: {resumeData.technicalskill?.tools || "N/A"}</p>

      <h3>Work Experience</h3>
      {resumeData.WorkExperience?.map((experience, index) => (
        <div key={index}>
          <h4>{experience.title} at {experience.company} ({experience.dates})</h4>
          <ul>
            {experience.responsibilities.map((resp, i) => (
              <li key={i}>{resp}</li>
            ))}
          </ul>
        </div>
      ))}

      <h3>Projects</h3>
      {resumeData.Projects?.map((project, index) => (
        <div key={index}>
          <h4>{project.name} ({project.type})</h4>
          <ul>
            {project.details.map((detail, i) => (
              <li key={i}>{detail}</li>
            ))}
          </ul>
        </div>
      ))}

      <h3>Education</h3>
      {resumeData.Education?.map((edu, index) => (
        <p key={index}>{edu.degree} at {edu.institution} ({edu.graduationYear})</p>
      ))}

      <h3>Certifications</h3>
      {resumeData.Certifications && resumeData.Certifications.length > 0 ? (
        <ul>
          {resumeData.Certifications.map((cert, index) => (
            <li key={index}>{cert.Certification}</li>
          ))}
        </ul>
      ) : (
        <p>No certifications available.</p>
      )}

      <h3>Extracurricular Involvement</h3>
      <p>{resumeData.ExtracurricularInvolvement?.role || "N/A"} at {resumeData.ExtracurricularInvolvement?.organization || "N/A"} ({resumeData.ExtracurricularInvolvement?.dates || "N/A"})</p>

      <h3>Declaration</h3>
      <p>{resumeData.Declaretion || "N/A"}</p>

      <button onClick={downloadPDF} className="download-button">Download PDF</button>
    </div>
  );
};

export default Resume;