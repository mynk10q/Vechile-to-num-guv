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
    const BACKEND_API = `https://zephrex-num.gauravyt566.workers.dev/?key=${API_KEY}&type=BIG_VEHICLE_INFO&term=${onlymynk}`;

    const response = await fetch(BACKEND_API);
    const data = await response.json();

    // ❌ Remove Zephrex branding
    delete data["BUY API"];
    delete data["SUPPORT"];
    delete data["buy_api"];
    delete data["support"];

    return res.status(200).json({
      status: true,
      developer: "@mynk_mynk_mynk",
      type: "BIG_VEHICLE_INFO",
      result: data
    });

  } catch (err) {
    return res.status(500).json({
      status: false,
      message: "Server error",
      error: err.message
    });
  }
}
