import React from "react";
import { jsPDF } from "jspdf";

const Resume = ({ resumeData }) => {
  if (!resumeData) {
    return <div>Loading...</div>;
  }

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.setFont("helvetica", "normal");

    let y = 10; // Start y position for the first content

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
    y += 8;
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    y = addTextWithLineBreak(doc, resumeData.summary || "N/A", y);
    y += 6;
    // Technical Skills
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("Technical Skills", 10, y);
    y += 8;
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    y = addTextWithLineBreak(doc, `Frontend: ${resumeData.technicalskill?.frontend || "N/A"}`, y);
    y = addTextWithLineBreak(doc, `Backend: ${resumeData.technicalskill?.backend || "N/A"}`, y);
    y = addTextWithLineBreak(doc, `Tools: ${resumeData.technicalskill?.tools || "N/A"}`, y);
    y += 6;
    // Work Experience
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("Work Experience", 10, y);
    y += 8;
    resumeData.WorkExperience?.forEach((exp) => {
      doc.setFontSize(10);
      doc.setFont("helvetica", "bold");
      y = addTextWithLineBreak(doc, `${exp.title} - ${exp.company} (${exp.dates})`, y);
      exp.responsibilities.forEach((resp) => {
        y = addTextWithLineBreak(doc, `• ${resp}`, y, 15);
      });
      y += 6;
    });

    // Projects
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("Projects", 10, y);
    y += 8;
    resumeData.Projects?.forEach((proj) => {
      doc.setFontSize(10);
      doc.setFont("helvetica", "bold");
      y = addTextWithLineBreak(doc, `${proj.name} (${proj.type})`, y);
      proj.details.forEach((detail) => {
        doc.setFont("helvetica", "");
        y = addTextWithLineBreak(doc, `• ${detail}`, y, 15);
      });
      y += 6;
    });

    // Education
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("Education", 10, y);
    y += 8;
    resumeData.Education?.forEach((edu) => {
      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      y = addTextWithLineBreak(doc, `${edu.degree} - ${edu.institution} (${edu.graduationYear})`, y);
    });
    y += 6;
    // Certifications
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("Certifications", 10, y);
    y += 8;
    resumeData.Certifications?.forEach((cert) => {
      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      y = addTextWithLineBreak(doc, `• ${cert.Certification}`, y);
    });
    y += 6;

    // Extracurricular Involvement
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("Extracurricular Involvement", 10, y);
    y += 8;
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    y = addTextWithLineBreak(doc, `${resumeData.ExtracurricularInvolvement?.role || "N/A"} at ${resumeData.ExtracurricularInvolvement?.organization || "N/A"} (${resumeData.ExtracurricularInvolvement?.dates || "N/A"})`, y);
    y += 6;
    // Declaration
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("Declaration", 10, y);
    y += 8;
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    y = addTextWithLineBreak(doc, resumeData.Declaretion || "N/A", y);
    y += 6;
    // Save the PDF
    doc.save(`Resume-${resumeData.name || "Unknown"}.pdf`);
  };

  // Helper function to add text and handle line breaks
  const addTextWithLineBreak = (doc, text, yPosition, indent = 10) => {
    const maxWidth = 190;
    const lineHeight = 5;

    const lines = doc.splitTextToSize(text, maxWidth);
    lines.forEach((line, index) => {
      doc.text(line, indent, yPosition);
      yPosition += lineHeight;
    });

    return yPosition;
  };

  return (
    <div className="resume-container">
      <button onClick={downloadPDF}>Download Resume as PDF</button>
      <div className="resume-content">
        <h1>{resumeData.name}</h1>
        <p>{resumeData.email}</p>
        <p>{resumeData.mobile}</p>
        <p><a href={resumeData.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a></p>
        <p><a href={resumeData.portfolio} target="_blank" rel="noopener noreferrer">Portfolio</a></p>

        <h2>Summary</h2>
        <p>{resumeData.summary}</p>

        <h3>Technical Skills</h3>
        <ul>
          <li>Frontend: {resumeData.technicalskill.frontend}</li>
          <li>Backend: {resumeData.technicalskill.backend}</li>
          <li>Tools: {resumeData.technicalskill.tools}</li>
        </ul>

        <h3>Work Experience</h3>
        {resumeData.WorkExperience?.map((exp, index) => (
          <div key={index}>
            <h4>{exp.title} - {exp.company} ({exp.dates})</h4>
            <ul>
              {exp.responsibilities.map((resp, i) => (
                <li key={i}>{resp}</li>
              ))}
            </ul>
          </div>
        ))}

        <h3>Projects</h3>
        {resumeData.Projects?.map((proj, index) => (
          <div key={index}>
            <h4>{proj.name} ({proj.type})</h4>
            <ul>
              {proj.details.map((detail, i) => (
                <li key={i}>{detail}</li>
              ))}
            </ul>
          </div>
        ))}

        <h3>Education</h3>
        {resumeData.Education?.map((edu, index) => (
          <div key={index}>
            <h4>{edu.degree} - {edu.institution} ({edu.graduationYear})</h4>
          </div>
        ))}

        <h3>Certifications</h3>
        <ul>
          {resumeData.Certifications?.map((cert, index) => (
            <li key={index}>{cert.Certification}</li>
          ))}
        </ul>

        <h3>Extracurricular Involvement</h3>
        <p>{resumeData.ExtracurricularInvolvement?.role} at {resumeData.ExtracurricularInvolvement?.organization} ({resumeData.ExtracurricularInvolvement?.dates})</p>

        <h3>Declaration</h3>
        <p>{resumeData.Declaretion}</p>
      </div>
    </div>
  );
};

export default Resume;
