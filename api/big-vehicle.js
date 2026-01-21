export default async function handler(req, res) {
  try {
    const { onlymynk } = req.query;

    if (!onlymynk) {
      return res.status(400).json({
        status: false,
        message: "Vehicle number required",
        example: "/api/big-vehicle?onlymynk=MH28AL7284"
      });
    }

    const API_KEY = "ZEPH-0CBD7";
    const API_URL = `https://api-sell-eight.vercel.app/api?key=${API_KEY}&type=BIG_VEHICLE_INFO&term=${onlymynk}`;

    const response = await fetch(API_URL);
    const data = await response.json();

    /* 🔥 FIX START */

    // Agar BUY_API exist karta ho (kahin bhi)
    if (data.BUY_API) {
      data.BUY_API = "@mynk_mynk_mynk";
    }

    // Agar nested object me ho
    if (data.result && data.result.BUY_API) {
      data.result.BUY_API = "@mynk_mynk_mynk";
    }

    // Extra branding clean
    delete data.SUPPORT;
    delete data.support;
    delete data.buy_api;

    /* 🔥 FIX END */

    return res.status(200).json({
      status: true,
      developer: "@mynk_mynk_mynk",
      type: "BIG_VEHICLE_INFO",
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
