import { useCallback } from "react";

const WEDDING = {
  title: "Наша свадьба 💍",
  location: "Zahid Zarafshon Wedding Hall, Uzbekistan",
  description: "Будем рады видеть вас на нашей свадьбе!",
  timeZone: "Asia/Tashkent",
  start: "20270814T193000",
  end: "20270815T013000",
};

const escapeICS = (value = "") =>
  value
    .replace(/\\/g, "\\\\")
    .replace(/\r?\n/g, "\\n")
    .replace(/,/g, "\\,")
    .replace(/;/g, "\\;");

const createICS = () => {
  const dtstamp = new Date()
    .toISOString()
    .replace(/[-:]/g, "")
    .replace(/\.\d{3}/, "");

  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Wedding Invitation//RU",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    "UID:wedding-zahid-zarafshon-20270814@example.com",
    `DTSTAMP:${dtstamp}`,
    `DTSTART;TZID=${WEDDING.timeZone}:${WEDDING.start}`,
    `DTEND;TZID=${WEDDING.timeZone}:${WEDDING.end}`,
    `SUMMARY:${escapeICS(WEDDING.title)}`,
    `LOCATION:${escapeICS(WEDDING.location)}`,
    `DESCRIPTION:${escapeICS(WEDDING.description)}`,
    "STATUS:CONFIRMED",
    "END:VEVENT",
    "END:VCALENDAR",
  ];

  return lines.join("\r\n") + "\r\n";
};

export default function useWeddingCalendar() {
  // Apple Calendar и Outlook: скачивание ICS
  const downloadICS = useCallback(() => {
    const blob = new Blob([createICS()], {
      type: "text/calendar;charset=utf-8",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "wedding.ics";
    document.body.appendChild(link);
    link.click();
    link.remove();

    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }, []);

  // Google Calendar: открыть форму создания события
  const openGoogleCalendar = useCallback(() => {
    const params = new URLSearchParams({
      action: "TEMPLATE",
      text: WEDDING.title,
      dates: `${WEDDING.start}/${WEDDING.end}`,
      ctz: WEDDING.timeZone,
      details: WEDDING.description,
      location: WEDDING.location,
    });

    window.open(
      `https://calendar.google.com/calendar/render?${params}`,
      "_blank",
      "noopener,noreferrer",
    );
  }, []);

  return {
    downloadICS,
    openGoogleCalendar,
  };
}

// use to:
// import useWeddingCalendar from "@/hooks/useWeddingCalendar";

// const { downloadICS, openGoogleCalendar } = useWeddingCalendar();

// const handleDownloadICS = () => {
//   downloadICS();
//   closeAddCalendar();
// };

// const handleGoogleCalendar = () => {
//   openGoogleCalendar();
//   closeAddCalendar();
// };
