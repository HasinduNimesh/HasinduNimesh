import { getGithubUserContribution } from "@snk/github-user-contribution";
import { VercelRequest, VercelResponse } from "@vercel/node";

export default async (req: VercelRequest, res: VercelResponse) => {
  const { userName } = req.query;

  try {
    // handle CORS
    {
      const allowedOrigins = [
        "https://platane.github.io",
        "https://platane.me",
      ];

      const allowedOrigin = allowedOrigins.find(
        (o) => o === req.headers.origin
      );
      if (allowedOrigin)
        res.setHeader("Access-Control-Allow-Origin", allowedOrigin);
    }
    res.setHeader("Cache-Control", "max-age=21600, s-maxage=21600");
    res.statusCode = 200;
    res.json(
      await getGithubUserContribution(userName as string, {
        githubToken: process.env.GITHUB_TOKEN!,
      })
    );
  } catch (err) {
    console.error(err);
    res.statusCode = 500;
    res.end();
  }
};
