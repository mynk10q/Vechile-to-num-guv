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

    // 🔥 CHECK RESPONSE
    if (!response.ok) {
      return res.status(500).json({
        status: false,
        message: "External API failed"
      });
    }

    let data;

    try {
      data = await response.json();
    } catch (e) {
      return res.status(500).json({
        status: false,
        message: "Invalid JSON from API"
      });
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
      message:
