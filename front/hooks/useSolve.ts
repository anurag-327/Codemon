import { API_URL } from "@/credentials";
import { useState } from "react";

export default function useSolverHook()
{
    const [error, setError] = useState<boolean>(false);
    const [question, setQuestion] = useState<any>(null);
    async function getData(questionName:string) {
        const response = await fetch(
          API_URL + `/api/questions/question/${questionName}`
        );
        const data = await response.json();
        if (data.status === 200) {
          console.log(data);
          setQuestion(data.question);
        } else if (data.status == 404 || data.status == 400) {
          setError(true);
        }
      }
}