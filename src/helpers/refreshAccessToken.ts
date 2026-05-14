import axios from "axios";
import env from "../lib/env";

async function refreshAccessToken(token: any) {
  try {
    const url = env.API_BASE_URL + "/api/auth/refresh-token";
    const res = await axios.get(url, {
      headers: {
        Cookie: `refreshToken=${token.refreshToken}`,
      },
    });

    const { accessToken, refreshToken, expiresIn } = res.data?.data;

    return {
      ...token,
      accessToken,
      expiresAt: Date.now() + expiresIn,
      refreshToken,
    };
  } catch (error: any) {
    console.log("Refresh token failed: ", error?.response?.data);
    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}

export default refreshAccessToken;
