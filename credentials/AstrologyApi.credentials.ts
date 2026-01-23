import { ICredentialType, INodeProperties } from "n8n-workflow";

export class AstrologyApi implements ICredentialType {
  name = "astrologyApi";

  displayName = "Astrology API";

  documentationUrl = "https://api.astrology-api.io/rapidoc";

  properties: INodeProperties[] = [
    {
      displayName: "API Key",
      name: "apiKey",
      type: "string",
      typeOptions: { password: true },
      default: "",
      required: true,
      description: "Your Astrology API Key",
    },
    {
      displayName: "API Base URL",
      name: "baseUrl",
      type: "string",
      default: "https://api.astrology-api.io",
      description:
        "Astrology API server URL (change only if using custom server)",
    },
  ];
}
