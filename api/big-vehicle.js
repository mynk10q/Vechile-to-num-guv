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

    // 👇 RAW TEXT dekh
    const text = await response.text();

    return res.status(200).json({
      status: true,
      raw: text
    });

  } catch (error) {
    return res.status(500).json({
      status: false,
      error: error.message
    });
  }
}
