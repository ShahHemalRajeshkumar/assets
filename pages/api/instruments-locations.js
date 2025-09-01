import instrumentLocationsDE from "../../data/instruments-locations-piano-de.json";
import instrumentLocationsEN from "../../data/instruments-locations-piano-en.json";

export default function handler(req, res) {
  try {
    const { language } = req.query;

    let data;
    if (language === "ch-de") {
      data = instrumentLocationsDE;
    } else if (language === "ch-en") {
      data = instrumentLocationsEN;
    } else {
      throw new Error("Unsupported language");
    }

    if (data.length === 0) {
      throw new Error("No data available");
    }

    res.status(200).json(data);
  } catch (error) {
    console.error("Error loading instrument locations:", error);
    res.status(500).json({ error: "Failed to load data" });
  }
}
