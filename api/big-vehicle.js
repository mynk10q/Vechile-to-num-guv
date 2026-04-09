export default async function handler(req, res) {
  try {
    const { onlymynk } = req.query;

    if (!onlymynk) {
      return res.status(400).json({
        status: false,
        message: "Vehicle number required"
      });
    }

    const API_URL = `http://api.subhxcosmo.in/api?key=VORTEX&type=vehicle_num&term=${onlymynk}`;

    const response = await fetch(API_URL);
    const text = await response.text();

    // 🔥 SUBHXCOSMO → @mynk replace (PURE RAW LEVEL)
    const replacedText = text.replace(/SUBHXCOSMO/gi, "@mynk_mynk_mynk");

    // 🔥 JSON parse (double safe)
    let data = JSON.parse(replacedText);

    if (typeof data.result === "string") {
      data.result = JSON.parse(data.result);
    }

    return res.status(200).json({
      status: true,
      developer: "@mynk_mynk_mynk",
      vehicle_number: onlymynk,
      result: data
    });

  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Server error",
      error: error.message
    });
  }
}
