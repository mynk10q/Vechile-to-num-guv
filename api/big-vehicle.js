export default async function handler(req, res) {
  try {
    const { onlymynk } = req.query;

    // ❌ Vehicle number missing
    if (!onlymynk) {
      return res.status(400).json({
        status: false,
        message: "Vehicle number required",
        example: "/api/big-vehicle?onlymynk=MH28AL7284"
      });
    }

    // 🔑 API config
    const API_KEY = "ZEPH-0CBD7";
    const API_URL = `https://api-sell-eight.vercel.app/api?key=${API_KEY}&type=BIG_VEHICLE_INFO&term=${onlymynk}`;

    // 🌐 Fetch data
    const response = await fetch(API_URL);
    const data = await response.json();

    // ❌ Remove unwanted branding keys (safe delete)
    delete data["BUY API"];
    delete data["SUPPORT"];
    delete data["buy_api"];
    delete data["support"];
    delete data["developer"];

    // ✅ Final response
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
