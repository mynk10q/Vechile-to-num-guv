export default async function handler(req, res) {
  try {
    const { onlymynk } = req.query;

    if (!onlymynk) {
      return res.status(400).json({
        status: false,
        message: "Vehicle number required",
        example: "/api/big-vehicle?onlymynk=UK01A1234"
      });
    }

    // ✅ NEW API
    const API_KEY = "VORTEX";
    const API_URL = `http://api.subhxcosmo.in/api?key=${API_KEY}&type=vehicle_num&term=${onlymynk}`;

    const response = await fetch(API_URL);
    const data = await response.json();

    /* 🔥 CLEAN + BRANDING FIX */

    // Agar kisi bhi jagah BUY_API ho
    if (data.BUY_API) {
      data.BUY_API = "@mynk_mynk_mynk";
    }

    if (data.result && data.result.BUY_API) {
      data.result.BUY_API = "@mynk_mynk_mynk";
    }

    // Extra fields remove
    delete data.SUPPORT;
    delete data.support;
    delete data.buy_api;

    /* 🔥 FINAL RESPONSE */

    return res.status(200).json({
      status: true,
      developer: "@mynk_mynk_mynk",
      type: "VEHICLE_INFO",
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
