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

    // 🔥 STEP 1: parse outer JSON
    let data = JSON.parse(text);

    // 🔥 STEP 2: parse inner JSON if needed
    if (typeof data.result === "string") {
      data.result = JSON.parse(data.result);
    }

    // 🔥 CLEAN OWNER TEXT
    let ownerRaw = data.result?.owner_name || data.owner || "";

    const ownerClean = ownerRaw
      .replace(/SUBHXCOSMO/gi, "@mynk_mynk_mynk")
      .replace(/https?:\/\/\S+/g, "")
      .replace(/\n/g, " ")
      .trim();

    // 🔥 FINAL RESPONSE
    return res.status(200).json({
      status: true,
      developer: "@mynk_mynk_mynk",
      vehicle_number: onlymynk,
      owner: ownerClean,
      vehicle: data.result?.vehicle_name || null,
      model: data.result?.model || null,
      fuel: data.result?.fuel_type || null,
      rto: data.result?.rto || null,
      mobile: data.result?.mobile_no || null
    });

  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Server error",
      error: error.message
    });
  }
}
