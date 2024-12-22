import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== "POST") {
        res.status(405).json({ message: "Method Not Allowed" });
        return;
    }

    const { idToken } = req.body;
    if (!idToken) {
        res.status(400).json({ message: "Token is required" });
        return;
    }

    try {
        res.setHeader(
            "Set-Cookie",
            `token=${idToken}; Path=/; HttpOnly; Secure; Max-Age=3600`
        );
        res.status(200).json({ message: "Token set successfully" });
    } catch (err) {
        console.error("Error setting token cookie:", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
}
