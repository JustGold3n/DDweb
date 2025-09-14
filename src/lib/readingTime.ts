const readingTime = (content: string, complexity: number): string => {
  if (!content || content.trim().length === 0) return "0 min";

  const WPS = 200 / 60;
  const imageRegex = /\.(png|jpg|jpeg|svg|webp|gif)/i;

  let images = 0;
  const words = content
    .split(/\s+/) // Split by any whitespace
    .filter((word) => {
      const cleanWord = word.replace(/[^\w]/g, ""); // Remove punctuation
      if (imageRegex.test(word)) {
        images++;
        return false; // Don't count image filenames as words
      }
      return cleanWord.length > 0; // Only count actual words
    }).length;

  // Image time calculation (unchanged)
  let imageSecs = 0;
  let imageFactor = 12;

  for (let i = 0; i < images; i++) {
    imageSecs += imageFactor;
    if (imageFactor > 3) imageFactor--;
  }

  // Calculate total time
  const totalSeconds = words / WPS + imageSecs;
  let ttr = Math.ceil((totalSeconds * complexity) / 60);

  return `${ttr} min${ttr !== 1 ? "s" : ""}`;
};

export default readingTime;
