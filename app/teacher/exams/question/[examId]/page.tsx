"use client";
import React from "react";
import { useParams } from "next/navigation";
import ExamQuestionPage from "@/components/cards/question-paper";

const PublishQuestionPaper = () => {
  const params = useParams<{ examId: string }>(); 
  const examId = params.examId;

  return <ExamQuestionPage userType="teacher" examId={examId} />;
};

export default PublishQuestionPaper;
