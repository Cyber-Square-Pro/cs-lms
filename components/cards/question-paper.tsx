// ExamQuestionPage.tsx
"use client";
import React, { useEffect, useState } from "react";
import { ExamService } from "@/services/exam.service";
import { IExamLite } from "@/types/exam";
import Spinner from "../spinner";

interface Props {
  userType: string;
  examId: string | string[];
}

interface IQuestionPaper {
  grade: string;
  subject: string;
  file: string;
}

const ExamQuestionPage: React.FC<Props> = ({ userType, examId }) => {
  const examService = new ExamService();
  const [exam, setExam] = useState<IExamLite | null>(null);
  const [loading, setLoading] = useState(true);

  const [selectedGrade, setSelectedGrade] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [questionFile, setQuestionFile] = useState<File | null>(null);

  const [questionPapers, setQuestionPapers] = useState<IQuestionPaper[]>([]);

  const gradeSubjectMap: { [key: string]: string[] } = {
    "5": ["Math", "English"],
    "6": ["Math", "English", "Science"],
    "7": ["Math", "English", "Science", "History"],
  };

  useEffect(() => {
    const fetchExamDetails = async () => {
      try {
        const response = await examService.getExamDetails(examId);
        if (response?.statusCode === 200) {
          setExam(response.data);
        } else {
          console.error("Error loading exam details:", response.message);
        }
      } catch (error) {
        console.error("Error fetching exam details:", error);
      }
      setLoading(false);
    };

    fetchExamDetails();
  }, [examId]);

  useEffect(() => {
    if (userType === "HM") {
      loadQuestionPapers();
    }
  }, [userType, examId]);

  const loadQuestionPapers = async () => {
    try {
      const response = await examService.loadExamQuestionPapers(examId);
      if (response?.statusCode === 200) {
        setQuestionPapers(response.data);
      } else {
        console.error("Error fetching question papers:", response.message);
      }
    } catch (error) {
      console.error("Error loading question papers:", error);
    }
  };

  const handleUpload = async () => {
    if (!selectedGrade || !selectedSubject || !questionFile) {
      alert("Please select grade, subject, and upload a file.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("exam_id", String(examId));
      formData.append("grade", selectedGrade);
      formData.append("subject", selectedSubject);
      formData.append("question_paper", questionFile);

      const response = await examService.uploadQuestionPaper(formData);

      if (response?.statusCode === 200) {
        alert("Question paper uploaded successfully!");
        // Optionally refresh HM view after upload if needed:
        // if (userType === "HM") loadQuestionPapers();
      } else {
        alert("Upload failed. Please try again.");
      }
    } catch (error: any) {
      console.error("Error uploading question paper:", error);
      alert("Upload failed due to server error.");
    }
  };

  if (loading) return <Spinner />;
  if (!exam) return <p>Exam not found.</p>;

  return (
    <div className="max-w-2xl mx-auto p-6 mt-8">
      <h2 className="text-2xl font-bold mb-4">{exam.exam_name} - Question Paper</h2>

      {userType === "teacher" && (
        <div className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Select Grade</label>
            <select
              value={selectedGrade}
              onChange={(e) => {
                setSelectedGrade(e.target.value);
                setSelectedSubject("");
              }}
              className="w-full border rounded p-2"
            >
              <option value="">-- Select Grade --</option>
              <option value="5">Grade 5</option>
              <option value="6">Grade 6</option>
              <option value="7">Grade 7</option>
            </select>
          </div>

          {selectedGrade && (
            <div>
              <label className="block mb-1 font-medium">Select Subject</label>
              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="w-full border rounded p-2"
              >
                <option value="">-- Select Subject --</option>
                {gradeSubjectMap[selectedGrade]?.map((subject) => (
                  <option key={subject} value={subject}>
                    {subject}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div>
            <label className="block mb-1 font-medium">Upload Question Paper (PDF)</label>
            <input
              type="file"
              accept="application/pdf"
              onChange={(e) => setQuestionFile(e.target.files?.[0] || null)}
              className="w-full"
            />
          </div>

          <button
            onClick={handleUpload}
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
          >
            Upload
          </button>
        </div>
      )}

      {userType === "HM" && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-4">Uploaded Question Papers</h3>
          {questionPapers.length > 0 ? (
            <ul className="space-y-2">
              {questionPapers.map((paper, index) => (
                <li key={index} className="border p-2 rounded">
                  <p>
                    <strong>Grade:</strong> {paper.grade}
                  </p>
                  <p>
                    <strong>Subject:</strong> {paper.subject}
                  </p>
                  <a
                    href={paper.file}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    View Question Paper
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No question papers uploaded yet.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default ExamQuestionPage;
