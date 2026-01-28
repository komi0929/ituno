import https from "https";
import { searchAppIcon } from "../lib/utils/itunes-api";

async function testFetch() {
  console.log("Searching for 'Apple Calendar'...");
  const url = await searchAppIcon("Apple Calendar");
  console.log("URL returned:", url);

  if (url) {
    console.log("Attempting to download...");
    https.get(url, (res) => {
      console.log("Status Code:", res.statusCode);
      if (res.statusCode === 200) {
        console.log("✅ Success! Image exists.");
      } else {
        console.log("❌ Failed! Image is 404/403.");
      }
    });
  }
}

testFetch();
