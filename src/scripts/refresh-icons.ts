import { IOS_OFFICIAL_ICONS, searchAppIcon } from "../lib/utils/itunes-api";

async function refreshIcons() {
  console.log("Refreshing iOS Official Icons...");

  const mapping: Record<string, string> = {
    カレンダー: "Calendar",
    写真: "Photos",
    カメラ: "Camera",
    時計: "Clock",
    天気: "Weather",
    リマインダー: "Reminders",
    "App Store": "App Store",
    ヘルスケア: "Health",
    ホーム: "Home",
    Wallet: "Wallet",
    設定: "Settings",
    電話: "Phone",
    Safari: "Safari",
    メッセージ: "Messages",
    ミュージック: "Music",
  };

  const newIcons: Record<string, string> = {};

  for (const [jpName, searchName] of Object.entries(mapping)) {
    console.log(`Searching for ${jpName} (${searchName})...`);
    // Search using the English name which is more reliable for system apps in US store sometimes
    // But system apps don't show up in search easily.
    // We will try searching for "Apple " + name
    let url = await searchAppIcon("Apple " + searchName);

    if (!url) {
      // Fallback: Try searching just the name
      url = await searchAppIcon(searchName);
    }

    if (url) {
      console.log(`✅ Found: ${url}`);
      newIcons[jpName] = url;
      newIcons[searchName] = url;
    } else {
      console.error(`❌ Failed to find icon for ${searchName}`);
      // Keep old one if found, or warn
      if (IOS_OFFICIAL_ICONS[jpName]) {
        console.log(`⚠️ Keeping existing (potentially broken) URL for now.`);
        newIcons[jpName] = IOS_OFFICIAL_ICONS[jpName];
        newIcons[searchName] = IOS_OFFICIAL_ICONS[searchName];
      }
    }
  }

  // Print the new valid dictionary to console for manual verification/copying
  console.log("\n\n=== NEW ICON DICTIONARY ===");
  console.log(JSON.stringify(newIcons, null, 2));
}

refreshIcons().catch(console.error);
