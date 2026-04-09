export default async function handler(req, res) {
  try {
    const { onlymynk } = req.query;

    if (!onlymynk) {
      return res.status(400).json({
        status: false,
        message: "Vehicle number required"
      });
    }

    const API_URL = `https://vechile-to-num-guv-la5d.vercel.app/api?key=VORTEX&type=vehicle_num&term=${onlymynk}`;

    const response = await fetch(API_URL);
    const data = await response.json();

    return res.status(200).json({
      status: true,
      developer: "@mynk_mynk_mynk",
      result: data
    });

  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Server error"
    });
  }
}
