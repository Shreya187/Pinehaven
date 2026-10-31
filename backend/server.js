import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const PORT = 5001;

// ==========================================
// GEMINI API KEY
// ==========================================

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  throw new Error("GEMINI_API_KEY is missing from .env");
}

// ==========================================
// TEST ROUTE
// ==========================================

app.get("/", (req, res) => {
  res.json({
    message: "Pinehaven AI Retreat Concierge API is running 🌲",
  });
});

// ==========================================
// AI RETREAT CONCIERGE
// ==========================================

app.post("/api/concierge", async (req, res) => {
  try {
    // Get user preferences from frontend
    const {
      mood,
      budget,
      duration,
      guests,
      interests,
      preferences,
    } = req.body;

    console.log("\n=================================");
    console.log("🌲 NEW RETREAT REQUEST");
    console.log("=================================");

    console.log({
      mood,
      budget,
      duration,
      guests,
      interests,
      preferences,
    });

    // ==========================================
    // AI PROMPT
    // ==========================================

    const prompt = `
You are the AI Retreat Concierge for Pinehaven Eco Retreats.

Pinehaven is a premium sustainable nature retreat.

Your job is to understand the guest's preferences and recommend
the most suitable Pinehaven retreat and experiences.

GUEST INFORMATION:

- Mood: ${mood || "Not specified"}
- Budget: ${budget || "Not specified"}
- Duration: ${duration || "Not specified"}
- Number of guests: ${guests || "Not specified"}
- Interests: ${interests || "Not specified"}
- Additional preferences: ${preferences || "None"}


AVAILABLE PINEHAVEN RETREATS:

1. The Glass A-Frame

Price: $450/night

Description:
Floor-to-ceiling panoramic views of the whispering pines.

Best for:
Couples, romantic trips, peaceful escapes, photography.


2. Creekside Sanctuary

Price: $380/night

Description:
Sustainable luxury beside a mountain stream.

Best for:
Relaxation, nature lovers, wellness and quiet trips.


3. The Treehouse Loft

Price: $520/night

Description:
Elevated living among the forest canopy with a private sky deck.

Best for:
Adventure, unique experiences, couples and photography.


AVAILABLE EXPERIENCES:

- Mountain Air Therapy
- Forest Bathing
- Solar Wellness Spa
- Hidden Trail Hiking
- Farm-to-Table Dining
- Stargazing
- Lakeside Experiences


TASK:

1. Recommend the most suitable Pinehaven retreat.
2. Recommend 3 to 5 experiences.
3. Explain why the retreat matches the guest.
4. Describe the overall trip style.

Consider:
- Mood
- Budget
- Duration
- Number of guests
- Interests
- Additional preferences

IMPORTANT:

Only recommend retreats and experiences from the lists above.

Return ONLY valid JSON.

Do not use Markdown.
Do not use code fences.
Do not write anything before or after the JSON.
`;


    // ==========================================
    // CALL GEMINI INTERACTIONS API
    // ==========================================

    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/interactions",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": apiKey,
        },

        body: JSON.stringify({
          model: "gemini-3.8-flash",

          input: prompt,

          response_format: {
            type: "text",
            mime_type: "application/json",

            schema: {
              type: "object",

              properties: {
                greeting: {
                  type: "string",
                  description:
                    "A short personalized welcome message.",
                },

                recommendedRetreat: {
                  type: "object",

                  properties: {
                    name: {
                      type: "string",
                      description:
                        "Name of the recommended Pinehaven retreat.",
                    },

                    reason: {
                      type: "string",
                      description:
                        "Explain why this retreat matches the guest.",
                    },

                    pricePerNight: {
                      type: "string",
                      description:
                        "Price per night of the retreat.",
                    },
                  },

                  required: [
                    "name",
                    "reason",
                    "pricePerNight",
                  ],
                },

                experiences: {
                  type: "array",

                  items: {
                    type: "object",

                    properties: {
                      name: {
                        type: "string",
                        description:
                          "Name of the Pinehaven experience.",
                      },

                      reason: {
                        type: "string",
                        description:
                          "Explain why the guest may enjoy this experience.",
                      },
                    },

                    required: [
                      "name",
                      "reason",
                    ],
                  },
                },

                tripStyle: {
                  type: "string",
                  description:
                    "A short description of the overall recommended trip style.",
                },
              },

              required: [
                "greeting",
                "recommendedRetreat",
                "experiences",
                "tripStyle",
              ],
            },
          },
        }),
      }
    );


    // ==========================================
    // READ GEMINI RESPONSE
    // ==========================================

    const data = await response.json();

    console.log("\n=================================");
    console.log("🤖 GEMINI API RESPONSE");
    console.log("=================================");

    console.log(
      JSON.stringify(data, null, 2)
    );


    // ==========================================
    // CHECK FOR API ERROR
    // ==========================================

    if (!response.ok) {
      console.error("\n🔥 GEMINI API ERROR");
      console.error(data);

      return res.status(500).json({
        error:
          data.error?.message ||
          "Gemini API request failed.",
      });
    }


    // ==========================================
    // EXTRACT MODEL OUTPUT
    // ==========================================

    const modelOutput = data.steps
      ?.find(
        (step) => step.type === "model_output"
      )
      ?.content
      ?.find(
        (item) => item.type === "text"
      )
      ?.text;


    if (!modelOutput) {
      console.error(
        "❌ Gemini returned no model output."
      );

      return res.status(500).json({
        error: "Gemini returned no text output.",
      });
    }


    console.log("\n=================================");
    console.log("🧠 GEMINI GENERATED JSON");
    console.log("=================================");

    console.log(modelOutput);


    // ==========================================
    // PARSE JSON
    // ==========================================

    let recommendation;

    try {
      recommendation = JSON.parse(modelOutput);
    } catch (error) {
      console.error(
        "\n❌ JSON PARSE ERROR"
      );

      console.error(error);

      console.error(
        "\nGemini output:"
      );

      console.error(modelOutput);

      return res.status(500).json({
        error:
          "Gemini returned invalid JSON.",
      });
    }


    // ==========================================
    // SEND RESULT TO FRONTEND
    // ==========================================

    console.log("\n=================================");
    console.log("✅ RETREAT RECOMMENDATION READY");
    console.log("=================================\n");

    res.json(recommendation);

  } catch (error) {

    console.error("\n=================================");
    console.error("🔥 SERVER ERROR");
    console.error("=================================");

    console.error(error);

    res.status(500).json({
      error:
        "Unable to generate your retreat recommendation.",

      details: error.message,
    });
  }
});


// ==========================================
// START SERVER
// ==========================================

app.listen(PORT, () => {
  console.log(
    `🌲 Pinehaven backend running on http://localhost:${PORT}`
  );
});