import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export function exportResumeReport(data) {

  const pdf = new jsPDF("p", "mm", "a4");

  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(24);

  pdf.text("CareerPilot AI", 15, 18);

  pdf.setFontSize(12);
  pdf.setTextColor(120);

  pdf.text("Professional Resume Analysis Report", 15, 26);

  pdf.setDrawColor(0, 200, 255);
  pdf.line(15, 31, 195, 31);

  pdf.setTextColor(0);

  pdf.setFontSize(16);

  pdf.text("Resume Overview", 15, 42);

  autoTable(pdf, {

    startY: 48,

    head: [["Field", "Value"]],

    body: [

      ["Filename", data.filename],

      ["ATS Score", `${data.ats_score}%`],

      ["Resume Level", data.resume_level],

      ["Confidence", `${data.confidence_score}%`],

      ["Interview", data.interview_readiness],

      ["Skills", data.skills_detected?.length],

    ],

    theme: "grid",

    headStyles: {

      fillColor: [6, 182, 212],

    },

  });

  let y = pdf.lastAutoTable.finalY + 12;

  pdf.setFontSize(16);

  pdf.text("Professional Summary", 15, y);

  y += 8;

  pdf.setFontSize(11);

  pdf.setFont("helvetica", "normal");

  pdf.text(

    pdf.splitTextToSize(

      data.summary || "",

      180

    ),

    15,

    y

  );

  y += 35;

  pdf.setFontSize(16);

  pdf.setFont("helvetica", "bold");

  pdf.text("Detected Skills", 15, y);

  y += 10;

  autoTable(pdf, {

    startY: y,

    head: [["Skills"]],

    body: data.skills_detected?.map(

      s => [s]

    ),

    headStyles: {

      fillColor: [34, 197, 94],

    },

  });

  y = pdf.lastAutoTable.finalY + 12;

  pdf.setFontSize(16);

  pdf.text("Missing Skills", 15, y);

  y += 10;

  autoTable(pdf, {

    startY: y,

    head: [["Missing Skills"]],

    body: data.missing_skills?.map(

      s => [s]

    ),

    headStyles: {

      fillColor: [239, 68, 68],

    },

  });

  y = pdf.lastAutoTable.finalY + 12;

  pdf.setFontSize(16);

  pdf.text("Strengths", 15, y);

  y += 10;

  autoTable(pdf, {

    startY: y,

    head: [["Strength"]],

    body: data.strengths?.map(

      s => [s]

    ),

    headStyles: {

      fillColor: [34, 197, 94],

    },

  });

  if (y > 230) {

    pdf.addPage();

    y = 20;

  }

  pdf.setFontSize(16);

  pdf.text("AI Review", 15, y);

  y += 10;

  pdf.setFontSize(11);

  pdf.setFont("helvetica", "normal");

  pdf.text(

    pdf.splitTextToSize(

      data.ai_review || "",

      180

    ),

    15,

    y

  );

  pdf.save("CareerPilot_Report.pdf");

}