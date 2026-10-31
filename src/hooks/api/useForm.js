import { useState } from "react";
import axios from "axios";

const useForm = ({ texts, API_URL, refetch }) => {
  const [name, setName] = useState("");
  const [attendance, setAttendance] = useState("");
  const [wish, setWish] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSubmitting) return;

    setIsSubmitting(true);
    setError("");

    const formData = {
      nameAuthor: name.trim(),
      textsWish: wish.trim(),
      attend: attendance,
      createdAt: new Date().toISOString(),
    };

    try {
      const response = await axios.post(API_URL, formData);

      if (refetch) {
        refetch();
      }

      alert(texts.wish_thanks);

      setName("");
      setAttendance("");
      setWish("");
    } catch (err) {
      console.error("Ошибка отправки пожелания:", err);

      setError(
        "Не удалось отправить пожелание. Проверь подключение к интернету и попробуй ещё раз.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    name,
    setName,
    attendance,
    setAttendance,
    wish,
    setWish,
    isSubmitting,
    error,
    handleSubmit,
  };
};

export default useForm;
