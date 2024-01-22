// AuthService.ts
import { google } from "googleapis";

export class AuthService {
  private oauthClient: any;

  constructor(
    private clientId: string,
    private clientSecret: string,
    private refreshToken: string
  ) {
    this.oauthClient = new google.auth.OAuth2({
      clientId,
      clientSecret,
    });

    this.oauthClient.setCredentials({
      refresh_token: refreshToken,
    });

    // Set a refresh token callback function
    this.oauthClient.on("tokens", (tokens: any) => {
      if (tokens.refresh_token) {
        // Store the refresh token for future use
        this.oauthClient.setCredentials({
          refresh_token: tokens.refresh_token,
        });

        // Store the refresh token
        console.log("refresh token", tokens.refresh_token);
      }
    });
  }

  async getAccessToken(): Promise<string> {
    const { tokens } = await this.oauthClient.getAccessToken();
    return tokens.access_token;
  }

  getOAuthClient(): any {
    return this.oauthClient;
  }
}
