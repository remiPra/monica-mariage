import boheme from "./style-boheme-chic.json";
import princesse from "./forme-princesse.json";
import minimaliste from "./minimaliste.json";
import sirene from "./forme-princesse.json";

// Sélectionner uniquement les 4 premières robes du style "princesse"
const princessRobes = princesse.slice(0, 4);

// Fusionner toutes les robes et enlever les doublons
const allRobes = [...princessRobes, ...sirene, ...minimaliste, ...boheme];
const robes = allRobes.reduce((acc, robe) => {
  if (!acc.some((r) => r.dressName === robe.dressName)) {
    acc.push(robe);
  }
  return acc;
}, []);

export default robes;
